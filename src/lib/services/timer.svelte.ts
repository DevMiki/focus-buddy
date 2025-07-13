import { toasts } from "./toasts.svelte";

const SECONDS_IN_MINUTE = 60;
const MINUTES_TO_STUDY = 25;
const INITIAL_DURATION_SECONDS = MINUTES_TO_STUDY * SECONDS_IN_MINUTE;

export function createTimer() {

    let mode = $state<'studying' | 'paused' | 'idle'>('idle');
    let remainingStudySeconds = $state<number>(INITIAL_DURATION_SECONDS);
    let pauseSeconds = $state<number>(0);

    $effect(() => {
        let intervalId: NodeJS.Timeout;
        if (mode === 'studying') {
            intervalId = setInterval(() => {
                if (remainingStudySeconds > 0) {
                    remainingStudySeconds--;
                } else {
                    reset();
                }
            }, 1000);
        } else if (mode === 'paused') {
            intervalId = setInterval(() => {
                pauseSeconds++;
            }, 1000);
        }

        return () => clearInterval(intervalId);
    })

    function play() {
        toasts.addToast({
            type: 'success',
            message: 'Study session started!',
            duration: 2500
        });
        mode = 'studying';
    }

    function pause() {
        mode = 'paused';
        toasts.addToast({
            type: 'success',
            message: 'Study session paused!',
            duration: 2500
        })
    }

    function reset() {
        remainingStudySeconds = INITIAL_DURATION_SECONDS;
        pauseSeconds = 0;
        if (mode === 'paused' || mode === 'studying') {
            toasts.addToast({
                type: 'warning',
                message: 'Study session reset!',
                duration: 2500
            })
        }
        mode = 'idle';
    }

    return {
        get mode() { return mode; },
        get remainingStudySeconds() { return remainingStudySeconds; },
        get pauseSeconds() { return pauseSeconds; },
        play,
        pause,
        reset
    }
}
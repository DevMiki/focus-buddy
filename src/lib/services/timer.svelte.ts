import type { SessionEvent } from "$lib/types/session";
import { processSession } from "./session-processor";
import { toasts } from "./toasts.svelte";

const SECONDS_IN_MINUTE = 60;
const MINUTES_TO_STUDY = 25;
const INITIAL_DURATION_SECONDS = MINUTES_TO_STUDY * SECONDS_IN_MINUTE;

export function createTimer() {

    let mode = $state<'studying' | 'paused' | 'idle'>('idle');
    let remainingStudySeconds = $state<number>(INITIAL_DURATION_SECONDS);
    let pauseSeconds = $state<number>(0);
    let events = $state<SessionEvent[]>([]);
    let isSessionActive = $state<boolean>(false);

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

    async function saveSessionToServer(eventsToSave: SessionEvent[]) {
        console.log('Sending session data to the server:', eventsToSave);
        try {
            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    events: eventsToSave,
                    plannedDuration: INITIAL_DURATION_SECONDS
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving session:', errorData);
                toasts.addToast({ type: 'error', message: 'Error saving study session!', duration: 2500 });
            } else {
                console.log('Session successfully saved');
                toasts.addToast({ type: 'success', message: 'Study session saved successfully!', duration: 2500 });
            }
        } catch (error) {
            console.error("Network error while trying to save session:", error);
            toasts.addToast({ type: 'error', message: 'Error saving study session!', duration: 2500 });
        }

    }

    function play() {
        toasts.addToast({
            type: 'success',
            message: 'Study session started!',
            duration: 2500
        });
        mode = 'studying';

        if (!isSessionActive) {
            events.push({ timestamp: Date.now(), type: 'start' } as SessionEvent)
            isSessionActive = true;
        }
        isSessionActive = true;
        events.push({ timestamp: Date.now(), type: 'resume' } as SessionEvent)
    }

    function pause() {
        mode = 'paused';
        toasts.addToast({
            type: 'success',
            message: 'Study session paused!',
            duration: 2500
        })

        if (isSessionActive) {
            events.push({ timestamp: Date.now(), type: 'pause' } as SessionEvent);
        }
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

        if (isSessionActive) {
            events.push({ timestamp: Date.now(), type: 'end' } as SessionEvent);
            isSessionActive = false;
        }
        saveSessionToServer(events);
        isSessionActive = false;
        events = [];
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
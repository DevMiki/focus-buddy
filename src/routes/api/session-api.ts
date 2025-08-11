import { toasts } from "$lib/services/toasts.svelte";
import type { SessionEvent } from "$lib/types/session";

export const sessionApi = {
    tryToSaveSession: async function tryToSaveSession(eventsToSave: SessionEvent[], plannedDuration: number) {
        console.log('Sending session data to the server:', eventsToSave);
        try {
            const response = await fetch('/api/sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    events: eventsToSave,
                    plannedDuration: plannedDuration
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error saving session:', errorData);
                toasts.addToast({ type: 'error', message: 'Error saving study session!', duration: 2500 });
            } else {
                console.log('Session successfully saved');
                toasts.addToast({
                    type: 'success',
                    message: 'Study session saved successfully!',
                    duration: 2500
                });
            }
        } catch (error) {
            console.error('Network error while trying to save session:', error);
            toasts.addToast({ type: 'error', message: 'Error saving study session!', duration: 2500 });
        }
    }
}
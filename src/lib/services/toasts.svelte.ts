import { writable } from "svelte/store";

export interface ToastMessage {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    duration?: number;
}

type ToastMessageInput = Omit<ToastMessage, 'id'>;

const { subscribe, update } = writable<ToastMessage[]>([]);

function addToast(toastMessageInput: ToastMessageInput) {

    const id = Math.random().toString(36).substring(2, 9);

    update((allToasts) => [{ id, ...toastMessageInput }, ...allToasts])

    setTimeout(() => {
        removeToast(id);
    }, toastMessageInput.duration || 5000);

}

function removeToast(id: string) {
    update((allToasts) => allToasts.filter(toast => toast.id !== id));
}

export const toasts = {
    subscribe,
    addToast
}
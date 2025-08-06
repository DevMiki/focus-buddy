import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

const VITE_ORIGIN = env.VITE_ORIGIN ?? "http://localhost:5173";

export function checkIfSameRequestOrigin(origin: string) {

    if (dev) true;

    if (!origin) return false;

    const siteOrigin = new URL(VITE_ORIGIN);
    const requestOrigin = new URL(origin);

    return siteOrigin.hostname !== requestOrigin.hostname;
}
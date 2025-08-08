import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

const VITE_ORIGIN = env.VITE_ORIGIN ?? "http://localhost:5173";

export function checkIfSameRequestOrigin(origin: string | null): boolean {
	if (dev) return true;

	if (!origin) return false;

	let siteOrigin: URL;
	let requestOrigin: URL;

	try {
		siteOrigin = new URL(VITE_ORIGIN);
		requestOrigin = new URL(origin);
	} catch {
		return false;
	}

	return siteOrigin.origin === requestOrigin.origin;
}

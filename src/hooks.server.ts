import { getUserIfSessionValid } from '$lib/server/auth/auth-service';
import { isProtectedRoute } from '$lib/server/auth/route-protection';
import { checkIfSameRequestOrigin } from '$lib/server/auth/security';
import type { AuthUser } from '$lib/types/database';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    checkAndThrowIfCSRFNotValid(event);

    const sessionToken = event.cookies.get('auth_session');
    const user: AuthUser | null = await getUserIfSessionValid(sessionToken);
    event.locals.user = user;

    if (isProtectedRoute(event.route.id)) {
        throw redirect(302, '/');
    }

    return await resolve(event);
};


function checkAndThrowIfCSRFNotValid(event: RequestEvent) {
    const csrfProtectedMethods = ["POST", "PUT", "PATCH", "DELETE"];
    const method = event.request.method;
    if (!csrfProtectedMethods.includes(method)) {
        return;
    }

    const origin = event.request.headers.get("Origin");
    if (origin) {
        if (!checkIfSameRequestOrigin(origin)) {
            throw error(403, "CSRF Error: Invalid origin");
        }
    }
}
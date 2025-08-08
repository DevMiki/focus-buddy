import { getUserIfSessionValid } from '$lib/server/auth/auth-service';
import { isProtectedRoute } from '$lib/server/auth/route-protection';
import { checkIfSameRequestOrigin } from '$lib/server/auth/security';
import { error, redirect, type Handle, type RequestEvent } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	checkAndThrowIfCSRFNotValid(event);

	if (!isProtectedRoute(event.route.id)) {
		return await resolve(event);
	}

	const sessionToken = event.cookies.get('auth_session');
	const user = await getUserIfSessionValid(sessionToken);
	if (user) {
		event.locals.user = user;
		return await resolve(event);
	} else {
		throw redirect(303, '/login');
	}
};


function checkAndThrowIfCSRFNotValid(event: RequestEvent) {
    const csrfProtectedMethods = ["POST", "PUT", "PATCH", "DELETE"];
    const method = event.request.method;
    if (!csrfProtectedMethods.includes(method)) {
        return;
    }

    const origin = event.request.headers.get("Origin");
    if(origin){
        if (!checkIfSameRequestOrigin(origin)) {
            throw error(403, "CSRF Error: Invalid origin");
        }
    }
}
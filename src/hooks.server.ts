import { getUserIfSessionValid } from "$lib/server/auth/auth-service";
import { checkIfSameRequestOrigin } from "$lib/server/auth/security";
import { error, type Handle, type RequestEvent } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    checkAndThrowIfCSRFNotValid(event);

    const sessionToken = event.cookies.get("auth_session");
    const user = await getUserIfSessionValid(sessionToken);
    if(user){
        event.locals.user = user;
        return await resolve(event);
    } else {
        throw new Error("user not found");                                                                                                                                                                                                                            
    }
}


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
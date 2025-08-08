import { deleteSession } from "$lib/server/auth/auth-service";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ cookies }) => {
        const sessionToken = cookies.get('auth_session');
        if(sessionToken){
            await deleteSession(sessionToken);
            cookies.delete('auth_session', { path: '.' });
        }
        throw redirect(303, '/');
    }
};
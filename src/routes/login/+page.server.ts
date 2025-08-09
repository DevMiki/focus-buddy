import { findAuthUserByUsername } from "$lib/server/repositories/auth-user-repository";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { AuthUser } from "$lib/types/database";
import { findAuthKeyByUserId } from "$lib/server/repositories/auth-key-repository";
import { createSession, verifyPassword } from "$lib/server/auth/auth-service";
import { toasts } from "$lib/services/toasts.svelte";

export const actions: Actions = {
    login: async ({ request, cookies }) => {

        const userData = await request.formData()
        const loginUserUsername = userData.get('username') as string;
        const loginUserPassword = userData.get('password') as string;
        const user = await findAuthUserByUsername(loginUserUsername)

        if (!user) {
            return fail(401, { error: 'Invalid credentials' })
        }

        const hashedUserPassword = await findAuthKeyByUserId(user.id).then(authKey => authKey?.hashed_password);

        if (!hashedUserPassword) {
            return fail(401, { error: 'Invalid Credentials' })
        }

        const isSamePassword = verifyPassword(hashedUserPassword, loginUserPassword)
        if (!isSamePassword) {
            return fail(401, { error: 'Invalid credentials' })
        }

        const sessionToken = await createSession(user.id);
        cookies.set('auth_session', sessionToken, {
            path: '.',
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7
        })
        throw redirect(302, `/`);
    }
}
import { createSession, verifyPassword } from "$lib/server/auth/auth-service";
import { findAuthKeyByUserId } from "$lib/server/repositories/auth-key-repository";
import { findAuthUserByUsername } from "$lib/server/repositories/auth-user-repository";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    login: async (event) => {
        const { request, cookies } = event;
        const userData = await request.formData()
        const redirectToUrl = userData.get("redirectTo") as string;
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
        
        // Redirect to original destination or home page
        throw redirect(302, redirectToUrl);
    }
}
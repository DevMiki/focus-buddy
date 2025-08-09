import { createSession, hashPassword } from "$lib/server/auth/auth-service"
import { db } from "$lib/server/db/db"
import { createAuthKey } from "$lib/server/repositories/auth-key-repository"
import { createAuthUser, findAuthUserByUsername } from "$lib/server/repositories/auth-user-repository"
import type { NewAuthKey, NewAuthUser } from "$lib/types/database"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { toasts } from "$lib/services/toasts.svelte"

export type SingUpActionData = {
    error?: string;
    username?: string;
}

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/')
    }
}

export const actions: Actions = {
    signup: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        
        if (typeof username !== 'string' || username.length < 3 || username.length > 32) {
            return fail(400,  { error: 'Username must be between 3 and 32 characters', username },
            )
        }
        if (typeof password !== 'string' || password.length < 6 || password.length > 32) {
            return fail(400,  { error: 'Password must be between 6 and 32 characters' })
        }

        const userToCheck = await findAuthUserByUsername(username)
        if (userToCheck) {
            return fail(409, { username: 'Username already exists.' })
        }

        const hashedPassword = await hashPassword(password);

        try {
            const user = await db.transaction().execute(async trx => {

                const newAuthUser: NewAuthUser = {
                    username: username
                }
                const newUser = await createAuthUser(newAuthUser, trx);

                const newAuthKey: NewAuthKey = {
                    user_id: newUser.id,
                    hashed_password: hashedPassword
                }
                await createAuthKey(newAuthKey, trx);

                return newUser;

            })

            const sessionToken = await createSession(user.id);

            cookies.set('auth_session', sessionToken, {
                path: '.',
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7
            })
        } catch (error: any) {
            // If anything inside the transaction fails, it automatically rolls back.
            // We check for a unique constraint violation on the username.
            if (error.code === '23505' && error.constraint === 'users_username_key') {
                return fail(400, { error: 'Username is already taken.' } );
            }
            // For other unexpected errors
            return fail(500, { error: 'An internal error occurred.' });
        }

        // Redirect on success
        throw redirect(302, '/');
    }
}
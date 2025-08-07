import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { createAuthUser, findAuthUserById, findAuthUserByUsername } from "$lib/server/repositories/auth-user-repository"
import { createSession, hashPassword } from "$lib/server/auth/auth-service"
import { db } from "$lib/server/db/db"
import type { NewAuthKey, NewAuthUser } from "$lib/types/database"
import { createAuthKey } from "$lib/server/repositories/auth-key-repository"

export type SingUpActionData = {
    errors?: {
        username?: string;
        password?: string;
    },
    username: string;
    message: string;
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
        
        if (typeof username !== 'string' || username.length < 3 || username.length > 31) {
            return fail(400, {
                errors: { username: 'Username must be between 3 and 31 characters' },
                username
            })
        }
        if (typeof password !== 'string' || password.length < 6 || password.length > 32) {
            return fail(400, {
                errors: { password: 'Password must be between 6 and 32 characters' },
                password
            })
        }

        const userToCheck = await findAuthUserByUsername(username)
        if (userToCheck) {
            return fail(409, {
                errors: { username: 'Username already exists.' },
                username
            })
        }

        const hashedPassword = await hashPassword(password);

        try {
            const user = await db.transaction().execute(async trx => {

                const newAuthUser: NewAuthUser = {
                    username: username
                }
                console.log('son vivo')
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
                return fail(400, { errors: { username: 'Username is already taken.' }, username });
            }
            // For other unexpected errors
            console.error(error);
            return fail(500, { message: 'An internal error occurred.' });
        }

        // Redirect on success
        throw redirect(302, '/');
    }
}
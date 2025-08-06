import type { AuthUserUpdate, NewAuthUser } from '$lib/types/database';
import { db } from '../db/db';

export async function createAuthUser(user: NewAuthUser) {
    return await db.insertInto('auth_user')
        .values(user)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function findAuthUserById(id: number) {
    return await db.selectFrom('auth_user')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
}
export async function findAllAuthUsers() {
    return await db.selectFrom('auth_user')
        .selectAll()
        .execute();
}

export async function updateAuthUser(id: number, updates: AuthUserUpdate) {
    return await db.updateTable('auth_user')
        .set(updates)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
}

export async function deleteAuthUserById(id: number) {
    return await db.deleteFrom('auth_user')
        .where('id', '=', id)
        .executeTakeFirst();
}
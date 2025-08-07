import type { AuthUserUpdate, Database, NewAuthUser } from '$lib/types/database';
import type { Kysely } from 'kysely';
import { db } from '../db/db';

export async function createAuthUser(user: NewAuthUser, dbInstance: Kysely<Database> = db) {
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

export async function findAuthUserByUsername(username: string) {
    return await db.selectFrom('auth_user')
    .where('username', '=', username)
    .selectAll()
    .execute();
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


import { db } from "../db/db";

export async function findAllSessions() {
    return await db
        .selectFrom('study_sessions')
        .selectAll()
        .orderBy('created_at', 'desc')
        .execute();
}

export async function findAllSessionsByUserId(userId: number) {
    return await db
        .selectFrom('study_sessions')
        .selectAll()
        .where('user_id', '=', userId)
        .orderBy('created_at', 'desc')
        .execute();
}

export async function findSessionByUserId(id: number) {
    return await db
        .selectFrom('study_sessions')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
}
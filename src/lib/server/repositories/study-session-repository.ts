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

// SESSION PAGINATION SECTION
export async function getPaginatedStudySessionsByUserId(userId: number, pageOptions: {
    size: number,
    offset: number
}) {
    const paginatedSessions = await db
    .selectFrom('study_sessions')
    .where('user_id', '=', userId)
    .selectAll()
    .orderBy('created_at', 'desc')
    .limit(pageOptions.size)
    .offset(pageOptions.offset)
    .execute();

    const { count } = await db
    .selectFrom('study_sessions')
    .where('user_id', '=', userId)
    .select(db.fn.count('id').as('count'))
    .executeTakeFirstOrThrow();

    return {
        paginatedSessions,
        totalCount: Number(count),
    };
}


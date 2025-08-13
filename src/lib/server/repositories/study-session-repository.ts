import type { StudySessionsTable } from "$lib/types/database";
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
type SortableSessionsColumns = keyof StudySessionsTable;
export async function getPaginatedStudySessionsByUserId(userId: number, pageOptions: {
    pageSize: number,
    offset: number,
    sortBy: SortableSessionsColumns,
    sortOrder: 'asc' | 'desc'
}) {

    const { pageSize: size, offset, sortBy, sortOrder } = pageOptions;
    

    const paginatedSessions = await db
    .selectFrom('study_sessions')
    .where('user_id', '=', userId)
    .selectAll()
    .orderBy(sortBy, sortOrder)
    .limit(size)
    .offset(offset)
    .execute();

    const { count } = await db
    .selectFrom('study_sessions')
    .where('user_id', '=', userId)
    .select(db.fn.count('id').as('count'))
    .executeTakeFirstOrThrow();

    return {
        paginatedSessions,
        totalStudySessionsCount: Number(count),
    };
}


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

export interface SessionFilters {
    dateFrom?: Date;
    dateTo?: Date;
    plannedDuration_gte?: number;
    plannedDuration_lte?: number;
    totalStudyTime_gte?: number;
    totalStudyTime_lte?: number;
    totalPauseTime_gte?: number;
    totalPauseTime_lte?: number;
    focusScore_gte?: number;
    focusScore_lte?: number;
}
export async function getPaginatedStudySessionsByUserId(userId: number, pageOptions: {
    pageSize: number,
    offset: number,
    sortBy: SortableSessionsColumns,
    sortOrder: 'asc' | 'desc'
}, filters?: SessionFilters) {

    const { pageSize: size, offset, sortBy, sortOrder } = pageOptions;

    let baseQuery = db
    .selectFrom('study_sessions')
    .where('user_id', '=', userId);


    if(filters?.dateFrom){
        baseQuery = baseQuery.where('created_at', '>=', filters.dateFrom.toISOString());
    }
    if(filters?.dateTo){
        baseQuery = baseQuery.where('created_at', '<=', filters.dateTo.toISOString());
    }
    if(filters?.plannedDuration_gte){
        baseQuery = baseQuery.where('planned_duration', '>=', filters.plannedDuration_gte*60);
    }
    if(filters?.plannedDuration_lte){
        baseQuery = baseQuery.where('planned_duration', '<=', filters.plannedDuration_lte*60);
    }
    if(filters?.totalStudyTime_gte){
        baseQuery = baseQuery.where('total_study_time', '>=', filters.totalStudyTime_gte);
    }
    if(filters?.totalStudyTime_lte){
        baseQuery = baseQuery.where('total_study_time', '<=', filters.totalStudyTime_lte);
    }
    if(filters?.totalPauseTime_gte){
        baseQuery = baseQuery.where('total_pause_time', '>=', filters.totalPauseTime_gte);
    }
    if(filters?.totalPauseTime_lte){
        baseQuery = baseQuery.where('total_pause_time', '<=', filters.totalPauseTime_lte);
    }
    if(filters?.focusScore_gte){
        baseQuery = baseQuery.where('focus_score', '>=', filters.focusScore_gte);
    }
    if(filters?.focusScore_lte){
        baseQuery = baseQuery.where('focus_score', '<=', filters.focusScore_lte);
    }

    const paginatedSessions = await baseQuery
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


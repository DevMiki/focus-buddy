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
    plannedDuration_gt?: number;
    plannedDuration_lt?: number;
    totalStudyTime_gt?: number;
    totalStudyTime_lt?: number;
    totalPauseTime_gt?: number;
    totalPauseTime_lt?: number;
    focusScore_gt?: number;
    focusScore_lt?: number;
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
    if(filters?.plannedDuration_gt){
        baseQuery = baseQuery.where('planned_duration', '>=', filters.plannedDuration_gt*60);
    }
    if(filters?.plannedDuration_lt){
        baseQuery = baseQuery.where('planned_duration', '<=', filters.plannedDuration_lt*60);
    }
    if(filters?.totalStudyTime_gt){
        baseQuery = baseQuery.where('total_study_time', '>=', filters.totalStudyTime_gt);
    }
    if(filters?.totalStudyTime_lt){
        baseQuery = baseQuery.where('total_study_time', '<=', filters.totalStudyTime_lt);
    }
    if(filters?.totalPauseTime_gt){
        baseQuery = baseQuery.where('total_pause_time', '>=', filters.totalPauseTime_gt);
    }
    if(filters?.totalPauseTime_lt){
        baseQuery = baseQuery.where('total_pause_time', '<=', filters.totalPauseTime_lt);
    }
    if(filters?.focusScore_gt){
        baseQuery = baseQuery.where('focus_score', '>=', filters.focusScore_gt);
    }
    if(filters?.focusScore_lt){
        baseQuery = baseQuery.where('focus_score', '<=', filters.focusScore_lt);
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


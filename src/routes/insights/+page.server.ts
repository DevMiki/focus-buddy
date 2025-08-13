
import { getPaginatedStudySessionsByUserId, type SessionFilters } from "$lib/server/repositories/study-session-repository";
import { mapStudySessionTableToStudySession } from "$lib/server/utils";
import type { StudySessionsTable } from "$lib/types/database";
import type { StudySession } from "$lib/types/session";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const sortableColumnsMap: { [key: string]: keyof StudySessionsTable } = {
    createdAt: 'created_at',
    plannedDuration: 'planned_duration',
    totalStudyTime: 'total_study_time',
    totalPauseTime: 'total_pause_time',
    focusScore: 'focus_score'
};

// We can derive the list of allowed client-facing names directly from the map's keys.
const allowedSortByClient = Object.keys(sortableColumnsMap);


export const load: PageServerLoad = async ({ locals, url }) => {
    console.log('Fetching all study sessions for insights page');


    const user = locals.user;
    if (!user) throw redirect(302, '/login?redirectTo=/insights');

    const pageNumber = parseInt(url.searchParams.get('pageNumber') ?? "1");
    const pageSize = Math.min(parseInt(url.searchParams.get('pageSize') ?? '5'), 50);
    const offset = (pageNumber - 1) * pageSize;

    const sortByParam = url.searchParams.get('sortBy') ?? 'createdAt';
    const sortBy = allowedSortByClient.includes(sortByParam as keyof StudySession)
        ? sortByParam as keyof StudySession
        : 'createdAt';
    const sortByDbColumn = sortableColumnsMap[sortBy]

    const sortOrderParam = url.searchParams.get('sortOrder') ?? 'asc';
    const sortOrder = sortOrderParam === 'asc' ? 'asc' : 'desc';

    const filters: SessionFilters = {}
    const dateFromParam = url.searchParams.get('dateFrom')
    if(dateFromParam){
        filters.dateFrom = new Date(dateFromParam)
    }
    const dateToParam = url.searchParams.get('dateTo')
    if(dateToParam){
        filters.dateTo = new Date(dateToParam)
    }
    const plannedDurationGtParam = url.searchParams.get('plannedDuration_gt')
    if(plannedDurationGtParam){
        filters.plannedDuration_gt = parseInt(plannedDurationGtParam)
    }
    const plannedDurationLtParam = url.searchParams.get('plannedDuration_lt')
    if(plannedDurationLtParam){
        filters.plannedDuration_lt = parseInt(plannedDurationLtParam)
    }
    const totalStudyTimeGtParam = url.searchParams.get('totalStudyTime_gt')
    if(totalStudyTimeGtParam){
        filters.totalStudyTime_gt = parseInt(totalStudyTimeGtParam)
    }
    const totalStudyTimeLtParam = url.searchParams.get('totalStudyTime_lt')
    if(totalStudyTimeLtParam){
        filters.totalStudyTime_lt = parseInt(totalStudyTimeLtParam)
    }
    const totalPauseTimeGtParam = url.searchParams.get('totalPauseTime_gt')
    if(totalPauseTimeGtParam){
        filters.totalPauseTime_gt = parseInt(totalPauseTimeGtParam)
    }
    const totalPauseTimeLtParam = url.searchParams.get('totalPauseTime_lt')
    if(totalPauseTimeLtParam){
        filters.totalPauseTime_lt = parseInt(totalPauseTimeLtParam)
    }
    const focusScoreParam = url.searchParams.get('focusScore_gt')
    if(focusScoreParam){
        filters.focusScore_gt = parseFloat(focusScoreParam)
    }
    const focusScoreLtParam = url.searchParams.get('focusScore_lt')
    if(focusScoreLtParam){
        filters.focusScore_lt = parseFloat(focusScoreLtParam)
    }



    let { paginatedSessions, totalStudySessionsCount: totalCount } = await getPaginatedStudySessionsByUserId(
        user.id, 
        { pageSize, offset, sortBy: sortByDbColumn, sortOrder }, 
        filters)

    let sessions = mapStudySessionTableToStudySession(paginatedSessions);
    return {
        sessions,
        totalCount,
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
        url: url.toString(),
        filters: {
            dateFrom: filters.dateFrom?.toISOString().split('T') ?? '',
            dateTo: filters.dateTo?.toISOString().split('T') ?? '',
            plannedDuration_gte: filters.plannedDuration_gt ?? '',
            plannedDuration_lt: filters.plannedDuration_lt ?? '',
            totalStudyTime_gte: filters.totalStudyTime_gt ?? '',
            totalStudyTime_lt: filters.totalStudyTime_lt ?? '',
            totalPauseTime_gte: filters.totalPauseTime_gt ?? '',
            totalPauseTime_lt: filters.totalPauseTime_lt ?? '',
            focusScore_gte: filters.focusScore_gt ?? '',
            focusScore_lt: filters.focusScore_lt ?? '',
        }
    }
}


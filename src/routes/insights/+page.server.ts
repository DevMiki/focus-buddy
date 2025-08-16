
import { getPaginatedStudySessionsByUserId, type SessionFilters } from "$lib/server/repositories/study-session-repository";
import { mapStudySessionTableToStudySession } from "$lib/server/utils";
import type { StudySessionsTable } from "$lib/types/database";
import type { StudySession } from "$lib/types/session";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const SECONDS_IN_MINUTE = 60;

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
    if (dateFromParam) {
        filters.dateFrom = new Date(dateFromParam)
    }
    const dateToParam = url.searchParams.get('dateTo')
    if (dateToParam) {
        filters.dateTo = new Date(dateToParam)
    }
    const plannedDurationGtParam = url.searchParams.get('plannedDuration_gte')
    if (plannedDurationGtParam) {
        filters.plannedDuration_gte = parseInt(plannedDurationGtParam)
    }
    const plannedDurationLtParam = url.searchParams.get('plannedDuration_lte')
    if (plannedDurationLtParam) {
        filters.plannedDuration_lte = parseInt(plannedDurationLtParam)
    }
    const totalStudyTimeGtParam = url.searchParams.get('totalStudyTime_gte')
    if (totalStudyTimeGtParam) {
        filters.totalStudyTime_gte = parseInt(totalStudyTimeGtParam)
    }
    const totalStudyTimeLtParam = url.searchParams.get('totalStudyTime_lte')
    if (totalStudyTimeLtParam) {
        filters.totalStudyTime_lte = parseInt(totalStudyTimeLtParam)
    }
    const totalPauseTimeGtParam = url.searchParams.get('totalPauseTime_gte')
    if (totalPauseTimeGtParam) {
        filters.totalPauseTime_gte = parseInt(totalPauseTimeGtParam)
    }
    const totalPauseTimeLtParam = url.searchParams.get('totalPauseTime_lte')
    if (totalPauseTimeLtParam) {
        filters.totalPauseTime_lte = parseInt(totalPauseTimeLtParam)
    }
    const focusScoreParam = url.searchParams.get('focusScore_gte')
    if (focusScoreParam) {
        filters.focusScore_gte = parseFloat(focusScoreParam)
    }
    const focusScoreLtParam = url.searchParams.get('focusScore_lte')
    if (focusScoreLtParam) {
        filters.focusScore_lte = parseFloat(focusScoreLtParam)
    }

    normalizeFilters(filters);

    let { paginatedSessions, totalStudySessionsCount } = await getPaginatedStudySessionsByUserId(
        user.id,
        { pageSize, offset, sortBy: sortByDbColumn, sortOrder },
        filters);

    let sessions = mapStudySessionTableToStudySession(paginatedSessions);
    return {
        sessions,
        totalStudySessionsCount,
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
        url: url.toString(),
        filters: {
            dateFrom: filters.dateFrom?.toISOString().split('T') ?? '',
            dateTo: filters.dateTo?.toISOString().split('T') ?? '',
            plannedDuration_gte: filters.plannedDuration_gte ?? 0,
            plannedDuration_lte: filters.plannedDuration_lte ?? 0,
            totalStudyTime_gte: filters.totalStudyTime_gte ?? 0,
            totalStudyTime_lte: filters.totalStudyTime_lte ?? 0,
            totalPauseTime_gte: filters.totalPauseTime_gte ?? 0,
            totalPauseTime_lte: filters.totalPauseTime_lte ?? 0,
            focusScore_gte: filters.focusScore_gte ?? 0,
            focusScore_lte: filters.focusScore_lte ?? 0,
        }
    }
}

type DateKeys = "dateFrom" | "dateTo";
function isDateKey(filterKey: keyof SessionFilters): filterKey is DateKeys {
    return filterKey === "dateFrom" || filterKey === "dateTo";
}

function normalizeFilters(filters: SessionFilters): void {
    for (const key of Object.keys(filters) as (keyof SessionFilters)[]) {
        if (isDateKey(key)) continue;
        const value = filters[key];
        filters[key] = value ?? 0 * SECONDS_IN_MINUTE;
    }
}

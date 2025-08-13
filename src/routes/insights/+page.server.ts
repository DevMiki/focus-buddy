
import { getPaginatedStudySessionsByUserId } from "$lib/server/repositories/study-session-repository";
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


    let { paginatedSessions, totalStudySessionsCount: totalCount } = await getPaginatedStudySessionsByUserId(user.id, { pageSize, offset, sortBy: sortByDbColumn, sortOrder })

    let sessions = mapStudySessionTableToStudySession(paginatedSessions);
    return {
        sessions,
        totalCount,
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
        url: url.toString()
    }
}


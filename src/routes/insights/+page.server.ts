
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getPaginatedStudySessionsByUserId } from "$lib/server/repositories/study-session-repository";
import { mapStudySessionTableToStudySession } from "$lib/server/utils";

export const load: PageServerLoad = async ({ locals, url }) => {
    console.log('Fetching all study sessions for insights page');

    const user = locals.user;
    if (!user) throw redirect(302, '/login?redirectTo=/insights');

    const pageNumber = parseInt(url.searchParams.get('page') ?? "1");
    const pageSize = Math.min(parseInt(url.searchParams.get('size') ?? '10'), 50);
    const offset = (pageNumber - 1) * pageSize;


    let { paginatedSessions, totalStudySessionsCount: totalCount } = await getPaginatedStudySessionsByUserId(user.id, { size: pageSize, offset })

    let sessions = mapStudySessionTableToStudySession(paginatedSessions);

    return {
        sessions,
        totalCount,
        pageNumber,
        pageSize
    }
}


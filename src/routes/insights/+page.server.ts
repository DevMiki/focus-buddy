import { findAllSessionsByUserId } from "$lib/server/repositories/study-session-repository";
import type { StudySession } from "$lib/types/session";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

type SerializableStudySession = Omit<StudySession, 'segments' | 'start_time' | 'end_time' | 'created_at'> & {
    startTime: number;
    endTime: number;
    createdAt: string;
};

export const load: PageServerLoad = async ({ locals }) => {
    console.log('Fetching all study sessions for insights page');

    const user = locals.user;
    if(!user) throw redirect(302, '/login?redirectTo=/insights');

    const sessions = await findAllSessionsByUserId(user.id);

    console.log(sessions);
    const serializableSessions: SerializableStudySession[] = sessions.map(session => ({
        id: session.id,
        plannedDuration: session.planned_duration,
        totalStudyTime: session.total_study_time,
        totalPauseTime: session.total_pause_time,
        totalPauses: session.total_pauses,
        startTime: Number(session.start_time),
        endTime: Number(session.end_time),
        createdAt: session.created_at,
        focusScore: session.focus_score
    }));

    return {
        sessions: serializableSessions
    }
}
import { db } from '../db/db';
import type { NewStudySession, NewSessionSegment } from '$lib/types/database';
import type { StudySession } from '$lib/types/session';
import { roundNumber } from '../utils';

/**
 * Saves a complete study session, including its segments, within a database transaction.
 * @param session An application-level StudySession object from the session-processor.
 */
export async function saveSession(session: StudySession, userId: number) {

    return await db.transaction().execute(async (trx) => {
        // 1. Prepare and insert the main session record.
        const sessionToInsert: NewStudySession = {
            planned_duration: session.plannedDuration,
            start_time: session.startTime,
            end_time: session.endTime,
            total_study_time: session.totalStudyTime,
            total_pause_time: session.totalPauseTime,
            total_pauses: session.totalPauses,
            focus_score: session.focusScore,
            user_id: userId,
        };

        sessionToInsert.focus_score = roundNumber(session.focusScore, 0);
        const newSession = await trx
            .insertInto('study_sessions')
            .values(sessionToInsert)
            .returning('id')
            .executeTakeFirstOrThrow();

        // 2. Prepare the segment records, adding the new session ID to each.
        if (session.segments.length > 0) {
            const segmentsToInsert: NewSessionSegment[] = session.segments.map(seg => ({
                session_id: newSession.id,
                type: seg.type,
                start_time: seg.startTime,
                end_time: seg.endTime,
            }));

            // 3. Insert all segments in a single, efficient query.
            await trx
                .insertInto('session_segments')
                .values(segmentsToInsert)
                .execute();
        }

        return newSession;
    });
}

/**
 * Finds all segments belonging to a specific session ID.
 * @param sessionId The ID of the parent study session.
 */
export async function findAllSegmentsBySessionId(sessionId: number) {
    return await db
        .selectFrom('session_segments')
        .where('session_id', '=', sessionId) // Correct, type-safe syntax
        .selectAll()
        .orderBy('start_time', 'asc')
        .execute();
}
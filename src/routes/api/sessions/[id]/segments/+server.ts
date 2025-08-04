// src/routes/api/sessions/[id]/segments/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { findAllSegmentsBySessionId } from '$lib/server/repositories/session-segment-repository';

// This handler responds to GET requests like /api/sessions/123/segments
export const GET: RequestHandler = async ({ params }) => {
    // `params.id` comes from the [id] in the folder name.
    const sessionId = Number(params.id);

    if (isNaN(sessionId)) {
        throw error(400, 'Invalid session ID provided.');
    }

    try {
        const segmentsFromDb = await findAllSegmentsBySessionId(sessionId);

        // Convert bigints to numbers for JSON serialization
        const serializableSegments = segmentsFromDb.map(seg => ({
            ...seg,
            startTime: Number(seg.start_time),
            endTime: Number(seg.end_time),
        }));

        return json(serializableSegments);
    } catch (e) {
        console.error(`Failed to fetch segments for session ${sessionId}:`, e);
        throw error(500, 'Failed to fetch session details.');
    }
};
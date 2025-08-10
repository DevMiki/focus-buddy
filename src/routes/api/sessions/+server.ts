import { saveSession } from "$lib/server/repositories/session-segment-repository";
import { processSession } from "$lib/services/session-processor";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
    console.log('Received request to save a new session');

    const user = locals.user;
    if(!user){
        throw error(403, "User not authenticated");
    }

    try {
        const { events, plannedDuration } = await request.json();

        if (!events || !Array.isArray(events) || events.length < 2 || !plannedDuration) {
            throw error(400, 'Invalid session data provided');
        }

        const sessionToSave = await processSession(events, plannedDuration);
        if (!sessionToSave) {
            throw error(400, 'Failed to process session data');
        }
        
        await saveSession(sessionToSave, user.id);
        
        return json({ message: 'Session saved successfully' }, { status: 201 });
    } catch (error: any) {
        console.error('Error saving session:', error);
        return json({ error: 'Failed to save session' }, { status: 500 });
    }
}
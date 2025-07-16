import type { SessionEvent, SessionSegment, StudySession } from "$lib/types/session";
import { toasts } from "./toasts.svelte";

export function processSession(events: SessionEvent[], plannedDuration: number): StudySession | void {

    if (events.length === 0) {
        toasts.addToast({
            type: 'error',
            message: 'No session events to process.',
            duration: 2500
        })
        return;
    }
    
    console.log('Processing session with events:', events);
    const studySession: StudySession = {
        id: 0,
        plannedDuration: 0,
        startTime: events[0].timestamp,
        endTime: Date.now(),
        segments: [],
        totalStudyTime: 0,
        totalPauseTime: 0,
        totalPauses: 0,
        focusScore: 0,
        createdAt: new Date().toISOString()
    }

    events = [...events].sort((firstEvent, secondEvent) => firstEvent.timestamp - secondEvent.timestamp);
    const segments: SessionSegment[] = [];

    for (let i = 0; i < events.length; i++) {
        const currentEvent: SessionEvent = events[i];
        const nextEvent: SessionEvent = events[i + 1];
        const segmentStartTime = currentEvent.timestamp;
        const segmentEndTime = nextEvent ? nextEvent.timestamp : Date.now();
        const duration = Math.floor((segmentEndTime - segmentStartTime) / 1000);


        let segment: SessionSegment = {
            type: 'study',
            session_id: 0, // This will be set later when saving to the database
            startTime: 0,
            endTime: 0,
        };

        if (currentEvent.type === 'start' || currentEvent.type === 'resume') {
            segment.type = 'study';
            segment.startTime = segmentStartTime;
            segment.endTime = segmentEndTime;
            segments.push(segment);
            studySession.totalStudyTime += duration;
            studySession.plannedDuration = plannedDuration;
        }
        else if (currentEvent.type === 'pause') {
            segment.type = 'pause';
            segment.startTime = segmentStartTime;
            segment.endTime = segmentEndTime;
            segments.push(segment);
            studySession.totalPauseTime += duration;
            studySession.totalPauses++;
        }
        else {
            segment.type = 'end';
            segment.startTime = segmentStartTime;
            segment.endTime = segmentEndTime;
            segments.push(segment);
            studySession.endTime = segmentEndTime;
        }
    }
    studySession.segments = segments;
    studySession.focusScore = studySession.totalStudyTime / (studySession.totalStudyTime + studySession.totalPauseTime) * 100 - 2.5 * studySession.totalPauses;

    return studySession;
}
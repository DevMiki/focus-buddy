import type { StudySessionsTable, StudySessionTableSelect } from "$lib/types/database";
import type { StudySession } from "$lib/types/session";

export function roundNumber(value: number, decimalPlaces = 0): number {
	if (!Number.isFinite(value)) throw new TypeError('Invalid number');
	return parseFloat(value.toFixed(decimalPlaces));
}

export function mapStudySessionTableToStudySession(studySessions: StudySessionTableSelect[]): StudySession[] {

	return studySessions.map(studySession => {
		return {
			id: studySession.id,
			plannedDuration: studySession.planned_duration,
			startTime: studySession.start_time,
			endTime: studySession.end_time,
			segments: [],
			totalStudyTime: studySession.total_study_time,
			totalPauseTime: studySession.total_pause_time,
			totalPauses: studySession.total_pauses,
			focusScore: studySession.focus_score,
			createdAt: studySession.created_at
		}
	})
}
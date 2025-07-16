export interface SessionEvent {
    timestamp: number;
    type: 'start' | 'end' | 'pause' | 'resume' | 'reset';
}

export interface SessionSegment {
    type: 'study' | 'pause' | 'end'; 
    session_id: number;  
    startTime: number; 
    endTime: number;
}

export interface StudySession {
    id: number;
    plannedDuration: number;
    startTime: number;
    endTime: number;
    segments: SessionSegment[];
    totalStudyTime: number;
    totalPauseTime: number;
    totalPauses: number;
    focusScore: number;
    createdAt: string;
}


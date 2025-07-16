import type { Generated, Insertable, Selectable, Updateable, ColumnType } from 'kysely';

// --- TABLE INTERFACES ---
// These interfaces describe the exact shape of your database tables.

export interface ThemesTable {
    id: Generated<number>;
    name: string;
    image_url: string;
    primary_color: string;
    secondary_color: string;
}

export interface StudySessionsTable {
    id: Generated<number>;
    planned_duration: number;
    start_time: number;
    end_time: number;
    total_study_time: number;
    total_pause_time: number;
    total_pauses: number;
    focus_score: number; 
    created_at: ColumnType<string, string | undefined, never>;
}

export interface SessionSegmentsTable {
    id: Generated<number>;
    session_id: number;  
    type: 'study' | 'pause' | 'end'; 
    start_time: number;
    end_time: number;
}

// --- MASTER DATABASE INTERFACE ---
// This is the single source of truth for Kysely.
export interface Database {
    themes: ThemesTable;
    study_sessions: StudySessionsTable;
    session_segments: SessionSegmentsTable;
}


// These types are for use in your application code, giving you
// full type safety when working with database records.

// Themes
export type Theme = Selectable<ThemesTable>;
export type NewTheme = Insertable<ThemesTable>;
export type ThemeUpdate = Updateable<ThemesTable>;

// Study Sessions
export type StudySession = Selectable<StudySessionsTable>;
export type NewStudySession = Insertable<StudySessionsTable>;
export type StudySessionUpdate = Updateable<StudySessionsTable>;

// Session Segments
export type SessionSegment = Selectable<SessionSegmentsTable>;
export type NewSessionSegment = Insertable<SessionSegmentsTable>;
export type SessionSegmentUpdate = Updateable<SessionSegmentsTable>;
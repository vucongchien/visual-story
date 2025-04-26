
// Common types used across the application
export interface User {
  id: string;
  username: string;
  email?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  sex: string;
  old: number;
}

// export interface ApiResponse<T> {
//   data: T;
//   status: number;
//   message: string;
// } 


export interface StorySegment {
  type: 'choice' | 'text';
  choiceText?: string;
  content?: string;
}

export interface ChoiceResponse {
  appendedSegments: StorySegment[];
  currentChoices: ChoiceOptionProps[];
  status: 'in_progress' | 'finished';
}

export interface ChoiceOptionProps{
  text:string,
  //
}
export interface SessionProps {
  id: string;
  title: string;
  createdAt: string;
  currentChoices:ChoiceOptionProps[];
  story:StorySegment[];
  //cac thuoc tinh khac
}

export interface CreateSessionPayload {
  genreId: string, // ID lấy từ /api/options
  settingId: string// ID lấy từ /api/options
}

export interface GenreProps {
  id: string;
  name: string;
}

export interface SettingProps {
  id: string;
  name: string;
}

export interface OptionsData {
  genres: GenreProps[];
  settings: SettingProps[];
}

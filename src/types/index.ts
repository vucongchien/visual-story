//types
// Common types used across the application
export interface User {
  id: string;         // ID trong hệ thống của bạn
  googleId: string;   // ID duy nhất từ Google
  username: string;     // Tên hiển thị (display name)
  email: string;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  locale?: string;    // Ngôn ngữ, vd: "vi"
  // Thêm các trường bạn muốn lấy từ People API
  // gender?: string;
  // birthday?: { year: number, month: number, day: number };
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

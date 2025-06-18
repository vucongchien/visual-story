import { SessionProps, CreateSessionPayload, ChoiceResponse } from "../types";
import { fetchWithAuth } from './apiClient';

const BASE_URL = import.meta.env.VITE_API_URL;


export async function fetchSessions(): Promise<SessionProps[]> {
  const res = await fetchWithAuth(`/sessions`);
  if (!res.ok) throw new Error("Lỗi khi lấy sessions");
  return res.json();
}

export async function fetchSessionById(id: string): Promise<SessionProps> {
  const res = await fetchWithAuth(`/sessions/${id}`);
  if (!res.ok) throw new Error("Không tìm thấy session");
  return res.json();
}

export async function createSession(
  payload: CreateSessionPayload
): Promise<SessionProps> {
  const res = await fetchWithAuth(`/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Lỗi khi tạo session");
  return res.json();
}

export async function deleteSession(id: string): Promise<void> {
  const res = await fetchWithAuth(`/sessions/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Lỗi khi xóa session");
}

export async function postChoice(
  sessionId: string,
  choiceIndex: number
): Promise<ChoiceResponse> {
  const res = await fetchWithAuth(`/sessions/${sessionId}/choice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choiceIndex }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi khi gửi lựa chọn: ${errorText}`);
  }

  return res.json();
}

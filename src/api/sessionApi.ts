import { SessionProps, CreateSessionPayload, ChoiceResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchSessions(): Promise<SessionProps[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
  const res = await fetch(`${BASE_URL}/sessions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Lỗi khi lấy sessions");
  return res.json();
}

export async function fetchSessionById(id: string): Promise<SessionProps> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
  const res = await fetch(`${BASE_URL}/sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Không tìm thấy session");
  return res.json();
}

export async function createSession(
  payload: CreateSessionPayload
): Promise<SessionProps> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
  const res = await fetch(`${BASE_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Lỗi khi tạo session");
  return res.json();
}

export async function deleteSession(id: string): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
  const res = await fetch(`${BASE_URL}/sessions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Lỗi khi xóa session");
}

//Post
export async function postChoice(
  sessionId: string,
  choiceIndex: number
): Promise<ChoiceResponse> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
  const res = await fetch(`${BASE_URL}/sessions/${sessionId}/choice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ choiceIndex }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Lỗi khi gửi lựa chọn: ${errorText}`);
  }

  return res.json();
}

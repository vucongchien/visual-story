import { OptionsData } from "../types";


const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchOptions(): Promise<OptionsData> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Không tìm thấy token");
  }
    const res = await fetch(`${BASE_URL}/options`,{
      headers: { "Content-Type": "application/json" },
    credentials: "include",
    });
    if (!res.ok) throw new Error('Không thể lấy options');
    return res.json();
  }
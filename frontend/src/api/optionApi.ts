import { OptionsData } from "../types";
import { fetchWithAuth } from "./apiClient";


const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchOptions(): Promise<OptionsData> {
  // Sử dụng fetchWithAuth để có khả năng tự động làm mới token
  const res = await fetchWithAuth(`/options`);
  
  if (!res.ok) throw new Error('Không thể lấy options');
  return res.json();
}
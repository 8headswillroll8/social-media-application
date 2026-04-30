import { post } from "../api/apiClient.js";

export async function createApiKey() {
  const response = await post("/auth/create-api-key", { name: "Flori" });

  localStorage.setItem("apiKey", response.data.key);

  return response.data.key;
}

const API_URL = "http://localhost:3000/api";

export async function getData(endpoint) {
  const res = await fetch(`${API_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`GET ${endpoint} failed: ${res.status}`);
  }
  return res.json();
}

export async function postData(endpoint, data) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`POST ${endpoint} failed: ${res.status}`);
  }

  return res.json();
}

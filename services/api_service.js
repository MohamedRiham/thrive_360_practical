import { fetch } from "expo/fetch";

export async function fetchData(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      return data;
    } else {
      throw new Error(`Server error: ${resp.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

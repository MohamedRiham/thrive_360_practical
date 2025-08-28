import { fetch } from "expo/fetch";

export async function fetchData(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error(`Network response was not ok: ${resp.status}`);
    }

    const data = await resp.json(); 
    return data;
  } catch (error) {

    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

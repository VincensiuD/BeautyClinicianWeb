type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface CustomFetchOptions {
  method?: FetchMethod;
  body?: any;
  timeout?: number;
}

export async function customFetch(
  url: string,
  body?: object,
  method? : FetchMethod
) {

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  const fetchOptions: RequestInit = {                                                                                                                                
    method,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json",
    },
    signal: controller.signal,
  };

  try {
    if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }
    const response = await fetch(url, fetchOptions);

    const data = await response.json();
    data.status = response.status;
    return data;
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      console.error(`Request to ${url} aborted`);
    }
    console.error((error as Error).toString());
    throw error;
  } finally {
    clearTimeout(id);
  }
}

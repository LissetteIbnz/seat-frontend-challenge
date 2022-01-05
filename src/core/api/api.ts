const get = async <T>(url: string): Promise<T> => {
  const requestOptions: RequestInit = {
    method: "GET",
  };
  const response = await fetch(url, requestOptions);
  return await response.json();
};

const post = async (url: string, body: unknown) => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return response.json();
};

const put = async (url: string, body: unknown) => {
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  return response.json();
};

// Prefixed with underscored because delete is a reserved word in Javascript.
const _delete = async (url: string) => {
  const requestOptions: RequestInit = {
    method: "DELETE",
  };
  const response = await fetch(url, requestOptions);
  return response.json();
};

export const apiClient = {
  get,
  post,
  put,
  delete: _delete,
};

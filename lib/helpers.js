export const addNewPost = async (data, urlPath) => {
  const res = await fetch(urlPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  const result = await res.json();
  return result;
};

export const getUserData = async urlPath => {
  const res = await fetch(urlPath);

  const result = await res.json();
  return result;
};

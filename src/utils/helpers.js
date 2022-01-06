export const fetchApi = async (url) => {
  return await fetch(url).then((res) => res.json());
};

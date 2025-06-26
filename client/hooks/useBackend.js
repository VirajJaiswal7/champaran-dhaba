export const useBackend = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return { backendUrl };
};

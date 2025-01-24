export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getUserId = () => {
  const userId = localStorage.getItem("DSA_RAG_USER_ID");
  if (!userId) {
    const newUserId = crypto.randomUUID();
    localStorage.setItem("DSA_RAG_USER_ID", newUserId);
    return newUserId;
  }
  return userId;
};

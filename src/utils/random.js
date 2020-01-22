export const generateRandomString = () =>
  Math.random()
    .toString(36)
    .slice(3);

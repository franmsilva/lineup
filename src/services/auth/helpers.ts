export const getInitials = (displayName: string | null) => {
  if (!displayName) return null;

  const names = displayName.split(' ');

  return `${names[0][0]}${names[1][0]}`.toUpperCase();
};

export const getInitials = (name: string): string => {
  if (!name) return "";

  const words = name.trim().split(" ");
  const firstInitial = words[0]?.charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1]?.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
};

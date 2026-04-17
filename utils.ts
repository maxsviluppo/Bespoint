/**
 * Converte una stringa in Proper Case:
 * Ogni prima lettera di tutte le parole in maiuscolo, il resto in minuscolo.
 */
export const toProperCase = (str: any): string => {
  if (!str) return "";
  const s = String(str);
  return s
    .toLowerCase()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

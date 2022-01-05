const getStringLowerCase = (value: string): string => (value ? value.toLowerCase().trim() : "");

const removeAccents = (value: string) =>
  Boolean(value.normalize) ? value.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : value;

export const formatValue = (value: unknown) => {
  const stringValue = getStringLowerCase(`${value}`);
  return removeAccents(stringValue);
};

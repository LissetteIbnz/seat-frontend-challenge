import { formatValue } from "./string.helper";
import { isUndefinedOrNull } from "./value.helper";

const filterByField = <Entity, Value extends keyof Entity>(
  item: Entity,
  filter: Entity,
  field: Value,
) => {
  const itemValue = item[field];
  const filterValue = filter[field];

  if (isUndefinedOrNull(itemValue) || isUndefinedOrNull(filterValue)) {
    return false;
  }

  const itemValueString = formatValue(itemValue);
  const filterValueString = formatValue(filterValue);

  return itemValueString.includes(filterValueString);
};

const matchSomeField = <Entity, Key extends keyof Entity>(item: Entity, filter: Partial<Entity>) =>
  Object.keys(filter).some((field) => filterByField(item, filter, field as Key));

export const filterByText = <Entity, Key extends keyof Entity>(
  collection: Entity[],
  text: string,
  fields: Key[],
) => {
  if (!Array.isArray(collection) || collection.length === 0) {
    return [];
  }

  if (!text) {
    return collection;
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    return collection;
  }

  const filter = fields.reduce(
    (newFilter, field) => ({
      ...newFilter,
      [field]: text,
    }),
    {},
  );

  return collection.filter((item) => matchSomeField(item, filter));
};

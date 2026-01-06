import { groupBy } from "./polyfill/groupBy";

function damageMapper(damageRelations: { name: string }[], multiplier: number) {
  return damageRelations.map((damage_source) => ({ name: damage_source.name, multiplier }));
}

export function typeMultiplierAnalyzer(
  data?: {
    damage_relations:
      | {
          double_damage_from: { name: string; url: string }[];
          half_damage_from: { name: string; url: string }[];
          no_damage_from: { name: string; url: string }[];
        }
      | undefined;
    name: string | undefined;
    id: number | undefined;
  }[]
) {
  if (!data) return [];
  let collection: { name: string; multiplier: number }[] = [];

  data.forEach((type) => {
    for (const relation in type.damage_relations) {
      switch (relation) {
        case "double_damage_from":
          {
            collection.push(...damageMapper(type.damage_relations[relation], 2));
          }
          break;
        case "half_damage_from":
          {
            collection.push(...damageMapper(type.damage_relations[relation], 0.5));
          }
          break;
        case "no_damage_from":
          {
            collection.push(...damageMapper(type.damage_relations[relation], 0));
          }
          break;
      }
    }
  });

  const effectiveTypeMultipliersInput = groupBy(collection, ({ name }) => name);
  const effectiveTypeMultipliers = Object.keys(effectiveTypeMultipliersInput).reduce((acc, curr) => {
    const multipliersInput = effectiveTypeMultipliersInput[curr];
    const finalMultiplier =
      multipliersInput?.reduce((accu, curre) => {
        return accu * curre.multiplier;
      }, 1) || 1;
    acc.push({ name: curr, multiplier: finalMultiplier });

    return acc;
  }, [] as { name: string; multiplier: number }[]);

  return effectiveTypeMultipliers.sort((a, b) => b.multiplier - a.multiplier);
}

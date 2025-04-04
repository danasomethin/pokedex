export interface PokemonDetails {
  name: string;
  spriteUrl: string;

  height: number | null;
  weight: number | null;
  hp: number | null;
  attack: number | null;
  defense: number | null;
  spAttack: number | null;
  spDefense: number | null;
  speed: number | null;
}

export type HeightWeightKeys = "height" | "weight";

export type StatsKeys =
  | "hp"
  | "attack"
  | "defense"
  | "spAttack"
  | "spDefense"
  | "speed";

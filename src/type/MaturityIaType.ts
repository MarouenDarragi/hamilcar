export interface Capacity {
  capacite: string;
  description: string[];
}
export interface Descriptive {
  name: string;
  capacities: Capacity[];
}
export interface Level {
  min: number;
  max: number;
  niveau: string;
  resume_niveau: string;
  motif: string;
  description: string;
}
export interface Dimension {
  name: string;
  couleur: string;
  icon: string;
  descriptives: Descriptive[];
  levels: Level[];
}
export interface Tool {
  title: string;
  dimensions: Dimension[];
  Index_G: Level[];
}

/* options fixes pour chaque question */
export const OPTIONS = [
  "N’existe pas",
  "Existe partiellement",
  "Existe pleinement",
  "Optimisée",
  "Adaptative",
] as const;

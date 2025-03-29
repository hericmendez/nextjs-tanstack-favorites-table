export type Game = {
  id: string | number;
  name: string;
  platform: string;
  release_date: string;
  genre: string;
  rating: number;
  developer: string;
  description?: string;
};
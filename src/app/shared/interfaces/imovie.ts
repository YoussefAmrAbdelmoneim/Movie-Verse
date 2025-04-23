export interface IMovie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  genres: Genre[];
  budget?: number;
  revenue?: number;
  status?: string;
  number_of_seasons?: number;
  original_language: string;
  production_companies: ProductionCompany[];
  media_type?: string;
  last_air_date?: string;
}
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
}
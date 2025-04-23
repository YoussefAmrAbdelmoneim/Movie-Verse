export interface SearchResult {
    id: number;
    title?: string;
    name?: string;
    poster_path?: string;
    profile_path?: string;
    vote_average?: number;
    overview?: string;
    release_date?: string;
    first_air_date?: string;
    known_for_department?: string;
    known_for?: any[];
  }
  
  export interface Tab {
    id: string;
    label: string;
  }
export interface ICredits {
    id: number;
    cast: Cast[];
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }
  
export enum AspectRatio {
  Portrait = "2/3",
  Landscape = "16/9",
  Thumbnail = "4/3"
}

export interface Poster {
  url: string;
  aspectRatio: AspectRatio;
}

export interface Posters {
  portrait: Poster;
  landscape: Poster;
  thumbnail: Poster;
}

export interface CastMember {
  characterName: string;
  actorName: string;
}

export interface Crew {
  directors: string[];
  producers: string[];
  writers: string[];
}

export interface Classification {
  rating: string; 
  advisoryContent: string[];
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  rating: string;
  quality: string;
  description: string;
  isTopMovie: boolean;
  similarContent: string[]; 
  posters: Posters;
  cast: CastMember[];
  crew: Crew;
  classification: Classification;
}

export interface Container {
  id: string;
  title: string;
  layout: string;
  items: Movie[];
}

export interface MovieData {
  containers: Container[];
} 
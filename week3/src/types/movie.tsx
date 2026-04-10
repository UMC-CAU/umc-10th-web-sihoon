export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  adult: boolean;
  backdrop_path: string; 
  genre_ids: number[]; 
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
};

export type MovieDetail = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { Movie, MovieDetail } from '../types/movie';

const MovieDetailPage = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}`,
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}` } }
      );
      setMovie(data);
    };
    fetchMovie();
  }, [movieID]);

  return (
   <div className='bg-gray-200 min-h-screen'>
  <div className='p-8'>
    {movie && ( <div className='flex gap-8'>

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className='w-64 rounded-lg'
        />

        <div className='flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{movie.title}</h1>
          <div className ='font-bold text-xl'>
             <p>{movie.release_date}</p>
             <p>평점: {movie.vote_average}</p>
             <p>시간: {movie.runtime}분</p>
          </div>


          <div className='flex gap-4'>
            {movie.genres.map((genre) => (
              <span key={genre.id} className='px-2 py-2 bg-black text-white rounded'>
                {genre.name}
              </span>
            ))}
          </div>

          <p>{movie.overview}</p>
        </div>

      </div>
    )}
  </div>
  </div>
)

};


export default MovieDetailPage;
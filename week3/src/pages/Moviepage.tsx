import { useEffect, useState } from 'react';
import type { Movie, MovieResponse } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';

const MoviePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
   
  //1. 로딩상태
  const [isPending, setIsPending] = useState(false);

  //2. 에러상태
  const [isError, setIsError] = useState(false);

  //3. 페이지
  const [page, setPage] = useState(1);   // 페이지네이션할때 5로 시작했었는데 
                                         //일부 카테고리는 5페이지가 없어서 api에서 에러남. 
 

  const params = useParams <{  // url에서 category를 가져오는 부분
    category: string 
  }>();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try{
        const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${params.category}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
          },
        }
      );
      setMovies(data.results);
      }
       catch{
        setIsError(true);
    
       }

      finally{   //try-catch문에서 에러가 발생하든 안하든 무조건 실행되는 부분
          setIsPending(false);
      }

    }; // useEffect 안에서 js return 불가!!  cleanup함수는 return 가능!!

    fetchMovies();

  }, [page, params.category]);  //page가 바뀔 때마다, category가 바뀔 때마다 fetchMovies함수 실행

  if (isError) {
       return(
       <>
        <span className='text-red-900 text-5xl'>에러!!</span>
       </>
       )
    }

  return (
   <>
      <div className='flex justify-center items-center gap-6 mt-4'>
         <button
          className='px-4 py-1 bg-gray-500 text-white rounded-lg mb-4 shadow-md disabled:bg-gray-300
          transition-colors duration-300 hover:bg-gray-600'
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
         >{'<'} </button>
         <span className='mx-2 text-lg'>Page: {page}</span>
         <button
          className='px-4 py-1 bg-gray-500 text-white rounded-lg mb-4 shadow-md disabled:bg-gray-300
          transition-colors duration-300 hover:bg-gray-600'
          onClick={() => setPage((prev) => prev + 1)}
         >{'>'} </button>
      </div>

      {isPending && (
        <div className='flex justify-center items-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}


    {!isPending &&(
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 '>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
    )}
   </>
  );
};

export default MoviePage;
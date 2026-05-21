import { useState } from 'react';
import type { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useParams } from 'react-router-dom';
import useCustomFetch from '../hooks/useCustomFetch';

const MoviePage = () => {
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>(); //app.tsx 에서 카테고리 설정함

  // page나 category가 바뀌면 url이 바뀌어 자동으로 재요청됨
  const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;

  const { data, isPending, isError } = useCustomFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center h-64 gap-4'>
        <span className='text-5xl'>ㅠㅠ</span>
        <p className='text-red-500 text-xl font-semibold'>
          데이터를 불러오는 오류 발생했음.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* 페이지네이션 */}
      <div className='flex justify-center items-center gap-6 mt-4'>
        <button
          className='px-4 py-1 bg-gray-500 text-white rounded-lg mb-4 shadow-md disabled:bg-gray-300
          transition-colors duration-300 hover:bg-gray-600'
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          {'<'}
        </button>
        <span className='mx-2 text-lg'>Page: {page}</span>
        <button
          className='px-4 py-1 bg-gray-500 text-white rounded-lg mb-4 shadow-md disabled:bg-gray-300
          transition-colors duration-300 hover:bg-gray-600'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data ? page >= data.total_pages : false}
        >
          {'>'}
        </button>
      </div>

      {/* 로딩 스피너 */}
      {isPending && (
        <div className='flex justify-center items-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {/* 영화 그리드 */}
      {!isPending && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
};

export default MoviePage;

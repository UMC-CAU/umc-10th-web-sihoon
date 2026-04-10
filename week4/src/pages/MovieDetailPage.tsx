import { useParams } from 'react-router-dom';
import type { MovieDetail } from '../types/movie';
import useCustomFetch from '../hooks/useCustomFetch';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieID } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${movieID}?language=ko-KR`;

  const { data: movie, isPending, isError } = useCustomFetch<MovieDetail>(url);

  // 로딩 상태
  if (isPending) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-900'>
        <LoadingSpinner />
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-gray-900 gap-4'>
        <p className='text-red-400 text-xl font-semibold'>
          영화 정보를 불러오지 못함.
        </p>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className='relative min-h-screen bg-gray-900 text-white overflow-hidden'>
      {/* 배경 블러 이미지 */}
      <div
        className='absolute inset-0 bg-cover bg-center scale-110 blur-sm opacity-20'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path ?? movie.poster_path})`,
        }}
      />

      {/* 컨텐츠 */}
      <div className='relative z-100 max-w-5xl mx-auto p-8'>
        <div className='flex flex-col md:flex-row gap-10'>
          {/* 포스터 */}
          <div className='flex-shrink-0'>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className='w-64 rounded-2xl shadow-2xl'
            />
          </div>

          {/* 상세 정보 */}
          <div className='flex flex-col gap-5 justify-center'>
            <h1 className='text-4xl font-bold leading-tight'>{movie.title}</h1>

            {/* 메타 정보 */}
            <div className='flex flex-wrap gap-3 text-sm text-gray-300'>
              <span className='flex items-center gap-1'>
                개봉일 {movie.release_date}
              </span>
              <span className='flex items-center gap-1'>
                시간 {movie.runtime}분
              </span>
              <span className='flex items-center gap-1'>
                별점  {movie.vote_average.toFixed(1)} / 10
              </span>
            </div>

            {/* 장르 태그 */}
            <div className='flex flex-wrap gap-2'>
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className='px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm backdrop-blur-sm'
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* 줄거리 */}
            <div>
              <h2 className='text-lg font-semibold mb-2 text-gray-200'>줄거리</h2>
              <p className='text-gray-300 leading-relaxed text-sm'>
                {movie.overview || '줄거리 정보가 없습니다.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;

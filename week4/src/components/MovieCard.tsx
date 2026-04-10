import { useState } from 'react';
import type { Movie } from '../types/movie';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return(
       <div 
        className='relative rounded-lg overflow-hidden cursor-pointer duration-300 transform hover:scale-105'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate(`/movie/${movie.id}`)}
       >
        <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title + "의 이미지"}
        />

        {isHovered && ( 
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
            backdrop-blur-md flex flex-col justify-center items-center
            text-white'
            >   <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
            </div>
        )}

        </div>
    )
}
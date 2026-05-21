import { Link, NavLink } from 'react-router-dom'

const LINKS=[ 
    { to:'/', label: '홈' },
    { to:'/movies/popular', label: '인기 영화' },
    { to:'/movies/now_playing', label: '현재 상영중' },
    { to:'/movies/upcoming', label: '개봉 예정'},
]

export const Navbar = () => {
    return (
           <div className ='flex gap-3 p-4'>
             {LINKS.map(({to, label}) => (
                <NavLink 
                key={to} 
                to={to} 
                className=
                {({isActive}) => isActive ? 'text-blue-500' : 'text-black hover:text-gray-300'}>
                  {label}
                </NavLink>
              ))}
            </div>

        )
}
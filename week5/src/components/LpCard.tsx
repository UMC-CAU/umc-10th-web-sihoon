import { useNavigate } from "react-router-dom";

interface LpCardProps {
    id: number;
    title: string;
    thumbnail: string;
    createdAt: Date;
    likesCount: number;
}

const LpCard = ({ id, title, thumbnail, createdAt, likesCount }: LpCardProps) => {
    const navigate = useNavigate();

    const formattedDate = new Date(createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    return (
        <div
            className="relative group w-full aspect-square rounded-xl overflow-hidden cursor-pointer"
            onClick={() => navigate(`/lp/${id}`)}
        >
            <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

          
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="text-white font-semibold text-sm truncate">{title}</p>
                <p className="text-gray-300 text-xs mt-1">{formattedDate}</p>
                <p className="text-pink-400 text-xs mt-0.5">좋아요 {likesCount}</p>
            </div>
        </div>
    );
};

export default LpCard;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";
import useUpdateMyInfo from "../hooks/mutations/useUpdateMyInfo";

const MyPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");

    const { data } = useQuery({
        queryKey: ["myInfo"],
        queryFn: getMyInfo,
        select: (res) => res.data,
    });

    const { mutate: updateMyInfo, isPending } = useUpdateMyInfo();

    const handleEdit = () => {
        setName(data?.name ?? "");
        setBio(data?.bio ?? "");
        setIsEditing(true);
    };

    const handleSave = () => {
        updateMyInfo({ name, bio }, { onSuccess: () => setIsEditing(false) });
    };

    return (
        <div className="max-w-md mx-auto p-6 text-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">마이페이지</h1>
                <button onClick={handleEdit} className="text-sm text-purple-400 hover:text-purple-300">
                    설정
                </button>
            </div>

            {data?.avatar && (
                <img src={data.avatar} className="w-20 h-20 rounded-full object-cover mb-4" alt="프로필" />
            )}
            <p className="text-xl font-semibold">{data?.name}님 ㅎㅇㅇ</p>
            <p className="text-gray-400 mt-1">{data?.bio ?? "bio 없음"}</p>
            <p className="text-gray-500 text-sm mt-1">{data?.email}</p>

            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-gray-800 rounded-xl p-6 w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold">프로필 수정</h2>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름"
                            className="w-full bg-gray-700 rounded-lg px-4 py-2 mb-3 outline-none"
                        />
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="bio (선택)"
                            rows={3}
                            className="w-full bg-gray-700 rounded-lg px-4 py-2 mb-4 outline-none resize-none"
                        />
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 py-2 rounded-lg transition-colors"
                        >
                            {isPending ? "저장 중..." : "저장"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPage;

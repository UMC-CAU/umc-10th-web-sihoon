import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import type { ResponseMyInfoDto } from "../types/auth";
import { useState } from "react";   

const MyPage = () => {
    const{logout}=useAuth();
    const[data,setData]=useState<ResponseMyInfoDto>();
    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await getMyInfo();
                console.log(response);
                setData(response);
            } catch (error) {
                console.error("내 정보 조회 실패", error);
            }
        };

        fetchMyInfo();
    }, []);

    const handleLogout = async() => {
        await logout()
    }

    return <div>마이페이지
             <h1>{data?.data?.name}님 ㅎㅇㅇ</h1>
             <button className="bg-red-500 text-white rounded px-4 py-2" 
             onClick={handleLogout}>
               로그아웃
             </button>
           </div>;
};

export default MyPage;

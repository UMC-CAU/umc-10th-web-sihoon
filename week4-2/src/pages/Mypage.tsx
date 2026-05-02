import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const response = await getMyInfo();
                console.log(response);
            } catch (error) {
                console.error("내 정보 조회 실패", error);
            }
        };

        fetchMyInfo();
    }, []);

    return <div>마이페이지</div>;
};

export default MyPage;

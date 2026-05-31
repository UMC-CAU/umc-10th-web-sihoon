import { useAppDispatch } from './hooks/useCustomRedux';
import { openModal } from '../slices/modalSlice';
import { useCartInfo } from './hooks/useCartStore';

const PriceBox = () => {
    const { total } = useCartInfo();
    const dispatch = useAppDispatch();

    const handleInitaialize = () => {
        dispatch(openModal()); //모달열리게 변경
    }



    return <div className="p-4 bg-gray-100 rounded-lg jstify-end text-right flex justify-between">
         <button onClick={handleInitaialize} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            초기화
        </button>
        총 가격: {total}원
       
    </div>
}

export default PriceBox;
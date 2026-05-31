import { useAppSelector } from './hooks/useCustomRedux';
import { useAppDispatch } from './hooks/useCustomRedux';
import { openModal } from '../slices/modalSlice';

const PriceBox = () => {
    const {total} = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleInitaialize = () => {
        dispatch(openModal());
    }



    return <div className="p-4 bg-gray-100 rounded-lg jstify-end text-right flex justify-between">
         <button onClick={handleInitaialize} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            초기화
        </button>
        총 가격: {total}원
       
    </div>
}

export default PriceBox;
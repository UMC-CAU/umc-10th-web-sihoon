import type {Lp} from '../types/cart';
import { useAppDispatch } from './hooks/useCustomRedux';
import { decrease, increase } from '../slices/cartSlice';

interface CartItemProps {
     lp: Lp;
}


const CartItem = ({ lp }: CartItemProps) => {
    const dispatch = useAppDispatch();

    const handleIncrease = () => {
        dispatch(increase({ id: lp.id }));
    };

      const handleDecrease = () => {
        dispatch(decrease({ id: lp.id }));
    };

    return (
        <li className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 ">
            <img src={lp.img} alt={lp.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{lp.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{lp.singer}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-gray-900">{lp.price}원</span> 
                <div className="flex items-center gap-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={handleDecrease}>
                        −
                    </button>
                    <span className="w-4 text-center text-sm font-medium">{lp.amount}</span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={handleIncrease}>
                        +
                    </button>
                </div>
            </div>
        </li>
    )


}

export default CartItem;
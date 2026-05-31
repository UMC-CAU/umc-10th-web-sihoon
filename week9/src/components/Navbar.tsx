import {FaShoppingCart} from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from './hooks/useCustomRedux';
import { calculateTotals } from '../slices/cartSlice';
import { useEffect } from 'react';

const Navbar = () => {
    const {amount,cartItems} = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch, cartItems]);
    
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">My Store</h1>
            <div className="relative">
                <FaShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{amount}</span>
            </div>
        </div>
    )
}


export default Navbar;    
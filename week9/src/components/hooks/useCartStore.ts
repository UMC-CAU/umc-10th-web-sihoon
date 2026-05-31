import type { CartItems } from "../../types/cart";
import { useAppDispatch, useAppSelector } from "./useCustomRedux";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import cartItems  from "../../constants/cartItems";
import { useShallow } from "zustand/react/shallow";



interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}


interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions;
}

export const useCartStore = create<CartState>()(immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
        increase: (id:string)=>{
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id === id);
                if (cartItem) {
                    cartItem.amount += 1;
                }
            });
        },
        decrease: (id:string)=>{
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id === id);
                if (cartItem) {
                    cartItem.amount -= 1;
                    if (cartItem.amount <= 0) {
                        state.cartItems = state.cartItems.filter((item) => item.id !== id);
                    }
                }
            });
        },
        removeItem: (id:string)=>{
            set((state) => {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            });
        },
        clearCart: ()=>{
            set((state) => {
                state.cartItems = [];
            });
        },
        calculateTotals: ()=>{
            set((state) => {
                let amount = 0;
                let total = 0;
                state.cartItems.forEach((item) => {
                    amount += item.amount;
                    total += Number(item.price) * item.amount;
                });
                state.amount = amount;
                state.total = total;
            });
        }
    }
}))); 


//스토어에서 상태값 읽어오는 커스텀 훅
export const useCartInfo = () =>
    useCartStore(
        useShallow((state) => ({
            cartItems: state.cartItems,
            amount: state.amount,
            total: state.total,
        }))
    );

//스토어에서 액션함수들을 가져오는 커스텀 훅
export const useCartActions = () =>
    useCartStore((state) => state.actions);

//둘로 나눈 이유: 상태값과 액션함수를 분리하여 상태가 바뀔때마다 불필요하게 리렌더링되는걸 막음
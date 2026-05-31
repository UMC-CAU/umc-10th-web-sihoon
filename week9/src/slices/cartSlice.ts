import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems"; 
import { createSlice, type PayloadAction } from "@reduxjs/toolkit/react";


export interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
}


//cartslice  생성
//createslice 는 rtk에서 제공

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
     //증가
     increase:(state,action: PayloadAction<{id:string}>)=>{ 
        //페이로드: 리덕스에서 액션을 보낼때 
        // 어떤 아이템에 대한 액션인지 보내야하는데 그 데이터를 페이로드라함
        const itemId=action.payload.id;
        const item=state.cartItems.find((item)=>item.id===itemId);
        if(item){
            item.amount+=1;
        }
    },
     //감소
     decrease:(state,action: PayloadAction<{id:string}>)=>{ 
        const itemId=action.payload.id;
        const item=state.cartItems.find((item)=>item.id===itemId);
        if(item && item.amount > 0){
            item.amount-=1;
        }
     },
     //리무브 아이템
     removeItem:(state,action: PayloadAction<{id:string}>)=>{ 
        const itemId=action.payload.id;
        state.cartItems = state.cartItems.filter((item)=>item.id !== itemId);
     },
     //클리어카트
     clearCart: (state) => {
        state.cartItems = [];
     },
     //총액 계산
     calculateTotals: (state) => {
        let total = 0;
        let amount = 0;
        state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price); //프라이스가 스트링이었네..

        })
        state.amount = amount;
        state.total = total;


    },

}});
 
export const { increase, decrease, removeItem, clearCart, calculateTotals } = 
cartSlice.actions;
// 덕패턴 리듀서는 export default 써야함

const cartReducer = cartSlice.reducer;

export default cartReducer;
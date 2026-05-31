import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';

function createStore() {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    });

    return store;
}

const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//타입스크립트가 상태, 디스패치의 타입을 모르기 때문에
//리턴타입을 RootState로 지정해주고, 디스패치 타입도 AppDispatch로 지정해줌
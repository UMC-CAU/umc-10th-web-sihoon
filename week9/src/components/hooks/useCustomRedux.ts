import {useDispatch, useSelector} from 'react-redux';
import type {AppDispatch} from '../../store/store';
import type {RootState} from '../../store/store';
import type {TypedUseSelectorHook} from 'react-redux';


export const useAppDispatch = () => useDispatch<AppDispatch>();
//액션을 보냄


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//스토어에서 상태를 읽어옴
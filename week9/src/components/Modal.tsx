import { useAppDispatch } from './hooks/useCustomRedux';
import { closeModal } from '../slices/modalSlice';
import { clearCart } from '../slices/cartSlice';

const Modal = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-6 shadow-xl w-80">
                <h2 className="text-lg font-semibold text-gray-900">정말 초기화할거야?</h2>
                <div className="flex gap-4 w-full">
                    <button
                        onClick={() => dispatch(closeModal())}
                        className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        아니요
                    </button>
                    <button
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                        className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

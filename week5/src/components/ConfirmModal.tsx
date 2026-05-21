interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({ message, onConfirm, onCancel }: ConfirmModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-gray-800 text-white rounded-xl p-6 w-80">
                <p className="text-center mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-colors"
                    >
                        예
                    </button>
                    <button
                        onClick={onCancel}
                        className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg transition-colors"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;

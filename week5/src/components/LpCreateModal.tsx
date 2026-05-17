import { useState } from "react";
import useCreateLp from "../hooks/mutations/useCreateLp";
import { uploadImage } from "../apis/lp";

interface LpCreateModalProps {
    onClose: () => void;
}

const LpCreateModal = ({ onClose }: LpCreateModalProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [published, setPublished] = useState(true);

    const { mutate: createLp, isPending } = useCreateLp();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await uploadImage(file);
        setThumbnail(url);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return;
        createLp(
            { title, content, thumbnail, tags, published },
            { onSuccess: onClose }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
            <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">LP 작성</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
                </div>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 mb-3 outline-none focus:ring-1 focus:ring-purple-500"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용"
                    rows={4}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 mb-3 outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                />

                <label className="block mb-3">
                    <span className="text-sm text-gray-400 mb-1 block">썸네일 사진</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-gray-300" />
                    {thumbnail && <img src={thumbnail} className="mt-2 h-20 rounded object-cover" />}
                </label>

                <div className="flex gap-2 mb-3">
                    <input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        placeholder="태그 입력"
                        className="flex-1 bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-purple-500"
                    />
                    <button onClick={handleAddTag} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg">추가</button>
                </div>

                {tags.length === 0 && <p className="text-xs text-red-400 mb-2">태그를 최소 1개 입력해주세요</p>}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                        <span key={tag} className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            #{tag}
                            <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-white ml-1">✕</button>
                        </span>
                    ))}
                </div>

                <label className="flex items-center gap-2 mb-5 text-sm">
                    <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                    공개 게시
                </label>

                <button
                    onClick={handleSubmit}
                    disabled={isPending || !title.trim() || !content.trim() || tags.length === 0}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-40 py-2 rounded-lg font-semibold transition-colors"
                >
                    {isPending ? "등록 중..." : "Add LP"}
                </button>
            </div>
        </div>
    );
};

export default LpCreateModal;

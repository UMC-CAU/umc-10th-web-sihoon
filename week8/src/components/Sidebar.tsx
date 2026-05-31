type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function Sidebar({ isOpen, close }: Props) {
  return (
    <>
      {/*오버레이 */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"//닫혀있을때 마우스 클릭 막음.
        }`}
      />

      
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white shadow-2xl z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
       
        <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500">
          <span className="text-lg font-semibold">메뉴</span>
          <button
            onClick={close}
            className="text-blue-200 hover:text-white text-2xl leading-none"
            aria-label="닫기"
          >
            X
          </button>
        </div>



        <nav className="flex flex-col mt-4 px-4 gap-1">
         <a href="#search" className="block px-3 py-2 rounded hover:bg-blue-600">
           검색
         </a>
         <a href="#mypage" className="block px-3 py-2 rounded hover:bg-blue-600">
           마이페이지
         </a>
         <div>ㅎㅇㅇ2</div>
         <div>ㅎㅇㅇ3</div>
         <div>ㅎㅇㅇ4</div>

        </nav>
      </aside>
    </>
  );
}

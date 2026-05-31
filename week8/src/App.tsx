import "./App.css";
import Sidebar from "./components/Sidebar";
import { useSidebar } from "./hooks/useSidebar";

function App() {
  const { isOpen, close, toggle } = useSidebar();

  return (
    <div className="min-h-screen bg-blue-50">
     
      <header className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white shadow-md">
        <button
          onClick={toggle}
          className="flex flex-col gap-1.5 p-1"
          aria-label="메뉴 열기"
        >
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
        <h1 className="text-xl font-bold">돌돌 돌림판</h1>
      </header>


      <Sidebar isOpen={isOpen} close={close} />


      <div className="p-8 text-blue-900">
        <h2 className="text-2xl font-semibold mb-4">메인 글</h2>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar';
import CartList from './components/CartList';
import { Provider } from 'react-redux';
import store from './store/store';
import PriceBox from './components/PriceBox';
import Modal from './components/Modal';
import { useAppSelector } from './components/hooks/useCustomRedux';

function AppContent() {
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <CartList />
      <PriceBox />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App;
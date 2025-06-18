import './App.sass';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import PhonesPage from "./pages/PhonesPage";
import ProductPage from './pages/ProductPage';
import BillPage from './pages/BillPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path="/phones" element={<PhonesPage/>}/>
        <Route path="/:id" element={<ProductPage/>}/>
        <Route path="/bill" element={<BillPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

import Dashboard from './component/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CartPage from './component/CartPage';
import CancelPage from './component/CancelPage';
import SuccessPage from './component/SuccessPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} /> 
        <Route path='/cart' element={<CartPage/>} /> 
        <Route path='/cancel' element={<CancelPage/>} /> 
        <Route path='/success' element={<SuccessPage/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


import Dashboard from './component/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CartPage from './component/CartPage';
import Response from './component/Response';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>} /> 
        <Route path='/cart' element={<CartPage/>} /> 
        <Route path='/respnse' element={<Response/>} /> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

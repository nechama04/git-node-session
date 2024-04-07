import Home from './components/home';
import Nav from './components/nav';

// import './App.css';
import { Routes, Route } from "react-router-dom"
import AllProduct from './features/product/AllProduct';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProductItem from './features/product/ProductItem';
import Basket from './features/order/Basket';
import History from './features/order/history';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<AllProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productItem"  element={<ProductItem />}/>     
        <Route path="/basket" element={<Basket />} />
        <Route path="/history" element={<History />} />


      </Routes>


    </>
  );
}

export default App;

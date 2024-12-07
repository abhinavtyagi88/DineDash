import Sign from './Screens/Sign';
import HomePage from './Screens/HomePage';
import LogIn from './Screens/LogIn';
import { Routes,Route } from 'react-router-dom';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './Screens/myOrders';
import './App.css';

function App() {

  return (

    <>
    <CartProvider>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/signup'  element={<Sign/>}/>
    <Route path='/login' element={ <LogIn/>}/>
    <Route path='/myorder' element={ <MyOrder/>}/>
    </Routes>
    </CartProvider>
     </>

  );
}

export default App;

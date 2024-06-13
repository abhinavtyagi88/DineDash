import './App.css';
import Sign from './Screens/Sign';


import HomePage from './Screens/HomePage';
import LogIn from './Screens/LogIn';
import { Routes,Route } from 'react-router-dom';

function App() {

  return (

    <>
    <Routes>

    <Route path='/' element={<HomePage/>}/>
    <Route path='/sign' element={<Sign/>}/>
    <Route path='/logIn' element={ <LogIn/>}/>
    
    </Routes>

     </>

  );
}

export default App;

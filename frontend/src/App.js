import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Album from './components/album';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/album' element={<Album/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

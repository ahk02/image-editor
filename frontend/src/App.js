import logo from './logo.svg';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Album from './components/album';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Editor from './components/editor';
import Navbar from './components/navbar';
import AlbumList from './components/album_temp';
import Room from './components/Room';

function App() {
  return (
    <div className=' h-screen'>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/editor' element={<Editor/>}/>
        <Route path='/room' element={<Room/>}/>
        <Route path='/album' element={<AlbumList/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

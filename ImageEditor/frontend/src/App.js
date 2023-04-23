import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Editor from './components/editor';
import Navbar from './components/navbar';
import AlbumList from './components/albumlist';

function App() {
  return (
    <div className=' h-screen'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/room/:id' element={<Editor />} />
          <Route path='/album' element={<AlbumList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

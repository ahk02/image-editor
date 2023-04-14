import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Album from './components/album';
import Home from './components/home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/album' element={<Album/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

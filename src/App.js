import {Routes, Route, BrowserRouter} from  'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Profil from './pages/Profil/Profil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profil" element={<Profil/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

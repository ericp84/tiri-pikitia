import {Routes, Route, BrowserRouter} from  'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profil from './components/Profil';
import Pins from './components/Pins';
import Pinscreate from './components/PinsCreate';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './configureStore'


function App() {
  return (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/profil" element={<Profil/>}/>
              <Route path="/pins/:id" element={<Pins/>}/>
              <Route path="/pins_create" element={<Pinscreate/>}/>
            </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>


  );
}

export default App;

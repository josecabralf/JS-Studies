import './App.css';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import Personajes from './components/Personajes/Personajes';
import Canciones from './components/Canciones/Canciones';
import Peliculas from './components/Peliculas/Peliculas';
import Nominaciones from './components/Nominaciones/Nominaciones';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";


function App() {
  return (
    <div>

      <BrowserRouter>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/personajes" element={<Personajes />} />
              <Route path="/canciones" element={<Canciones />} />
              <Route path="/nominaciones" element={<Nominaciones />} />
              <Route path="/peliculas" element={<Peliculas />} /> 
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
    
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import HolaMundo from './.componentes/HolaMundo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HolaMundo /*mensaje="Hello World - José Cabral"*/></HolaMundo>
        <a
          className="App-link"
          href="https://frc.utn.edu.ar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ir a la página de la UTN - FRC
        </a>
      </header>
    </div>
  );
}

export default App;

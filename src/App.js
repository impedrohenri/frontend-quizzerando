
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Definindo as rotas */}
          <Route path="/login" element={<Login />} />
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

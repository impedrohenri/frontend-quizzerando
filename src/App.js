
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import NotFound from './pages/NotFound';
import EsqueceuSenha from './pages/EsqueceuSenha';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />}/>
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

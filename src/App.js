import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import EsqueceuSenha from './pages/EsqueceuSenha';
import Perfil from './pages/Perfil';
import { CriarQuiz, IniciarQuiz, PerguntasQuiz, ResultadoQuiz } from './pages/QuizPages';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />}/>
          <Route path="/esqueceu-senha" element={<EsqueceuSenha />}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/quiz/:id" element={<IniciarQuiz/>}/>
          <Route path="/quiz/criar" element={<CriarQuiz/>}/>
          <Route path="/quiz/:id/pergunta/:id" element={<PerguntasQuiz/>}/>
          <Route path="/quiz/resultado" element={<ResultadoQuiz/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
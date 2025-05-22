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
import { AuthProvider } from './contexts/AuthContexts';
import PrivateRoutes from './Auth/PrivateRoutes';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes> 
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />

            {/* Rotas privadas */}
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/quiz/criar" element={<CriarQuiz />} />
              <Route path="/quiz/:id" element={<IniciarQuiz />} />
              <Route path="/quiz/:id/pergunta/:id" element={<PerguntasQuiz />} />
              <Route path="/quiz/:id/resultado" element={<ResultadoQuiz />} />
            </Route>

            {/* Rota para 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
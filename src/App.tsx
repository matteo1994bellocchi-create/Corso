import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CertificatePage } from './pages/CertificatePage';
import { FinalExamPage } from './pages/FinalExamPage';
import { Home } from './pages/Home';
import { ModulePage } from './pages/ModulePage';
import { ModuleQuizPage } from './pages/ModuleQuizPage';
import { ProgressProvider } from './store/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/moduli/:slug" element={<ModulePage />} />
            <Route path="/moduli/:slug/quiz" element={<ModuleQuizPage />} />
            <Route path="/esame-finale" element={<FinalExamPage />} />
            <Route path="/certificato" element={<CertificatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;

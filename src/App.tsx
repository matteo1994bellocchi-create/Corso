import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CertificatePage } from './pages/CertificatePage';
import { FinalExamPage } from './pages/FinalExamPage';
import { Home } from './pages/Home';
import { ModulePage } from './pages/ModulePage';
import { ModuleQuizPage } from './pages/ModuleQuizPage';
import { ProjectPage } from './pages/ProjectPage';
import { ProgressProvider } from './store/ProgressContext';

function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/moduli/:slug" element={<ModulePage />} />
            <Route path="/moduli/:slug/quiz" element={<ModuleQuizPage />} />
            <Route path="/esame-finale" element={<FinalExamPage />} />
            <Route path="/certificato" element={<CertificatePage />} />
            <Route path="/progetto" element={<ProjectPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProgressProvider>
  );
}

export default App;

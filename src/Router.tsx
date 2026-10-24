
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StartPage from './pages/StartPage';
import CorridorPage from './pages/CorridorPage';
import WallPage from './pages/WallPage';
import BoxPage from './pages/BoxPage';
import AppleBoxPage from './pages/AppleBoxPage';
import StolPage from './pages/StolPage';
import AppleInsidePage from "./pages/AppleInsidePage";
import InsidePage from "./pages/InsidePage";
import NaruzhuPage from "./pages/NaruzhuPage";
import TwoWayPage from "./pages/TwoWayPage";
import ElectrPage from "./pages/ElectrPage";
import ElectrupPage from "./pages/ElectrupPage";
import BackhomePage from "./pages/BackhomePage";

function Router() {
    return (
        <BrowserRouter basename="/Room-react">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/start" element={<StartPage />} />
                <Route path="/corridor" element={<CorridorPage />} />
                <Route path="/wall" element={<WallPage />} />
                <Route path="/box" element={<BoxPage />} />
                <Route path="/index4" element={<AppleBoxPage />} />
                <Route path="/stol.html" element={<StolPage />} />
                <Route path="/appleinside" element={<AppleInsidePage />} />
                <Route path="/inside" element={<InsidePage />} />
                <Route path="/naruzhu" element={<NaruzhuPage />} />
                <Route path="/2way" element={<TwoWayPage />} />
                <Route path="/electr" element={<ElectrPage />} />
                <Route path="/electrup" element={<ElectrupPage />} />
                <Route path="/backhome" element={<BackhomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;

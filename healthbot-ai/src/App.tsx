import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Hospitals from './pages/Hospitals';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-ink selection:bg-accent-blue/10">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/hospitals" element={<Hospitals />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

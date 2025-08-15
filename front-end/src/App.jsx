import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { FrontIa } from './components/FrontIa/FrontIa';

function App() {

  return (
    <Router>
      <Header />
      <AppRoutes />
      <FrontIa/>
      <Footer/>
    </Router>
  );
}

export default App;
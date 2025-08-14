import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './AppRoutes';
import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Ia } from './components/FrontIa/ia';

function App() {

  return (
    <Router>
      <Header />
      <AppRoutes />
      <Ia/>
      <Footer/>
    </Router>
  );
}

export default App;
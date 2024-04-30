//import logo from './logo.svg';
import Header from './Components/Header'
import Footer from './Components/Footer'
import KycMain from './Components/KycMain'
import SuccessOrder from './Components/SuccessOrder';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/bagicRepo">
          <Route index element={<KycMain/>}/>
          <Route path="success" element={<SuccessOrder/>}/>
          </Route>

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

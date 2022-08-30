import "./App.css";
import CertificatePdf from "./components/CertificatePdf";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import ProofOfWork from "./components/ProofOfWork";

function App() {
  return (
    <>
      {/* <CertificatePdf/> */}

      {/* browser router  */}
      <Router>
        <Routes>
          <Route path="/" element={<CertificatePdf />} />
          <Route path="/proof-of-work" element={<ProofOfWork />} />
        </Routes>
      </Router>
      



     
    </>
  );
}

export default App;

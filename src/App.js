import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Finalpage from "./components/Finalpage";
import { PlayerProvider } from "./context/Playercontext";

function App() {
  return (
    <>
    <BrowserRouter>
    <PlayerProvider >
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/finalpage" element={<Finalpage />} />
        </Routes>
      </div>
      </PlayerProvider >
    </BrowserRouter>
    </>
  );
}

export default App;

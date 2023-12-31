import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/signin/Signin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Home from "./pages/home";
import Shelf from "./pages/shelf";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookshelf" element={<Shelf />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

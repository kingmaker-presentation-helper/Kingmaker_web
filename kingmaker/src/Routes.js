import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/main";
import Start from "./pages/StartPracticePage/start";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/startPage" element={<Start/>} />
      </Routes>
    </>
  );
};

export default App;

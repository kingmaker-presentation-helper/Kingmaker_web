import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/main";
import Start from "./pages/StartPracticePage/start";
import During from "./pages/DuringPractice/during";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/startPage" element={<Start/>} />
        <Route path="/duringPage" element={<During/>}/>
      </Routes>
    </>
  );
};

export default App;

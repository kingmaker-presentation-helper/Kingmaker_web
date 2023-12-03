import { Routes, Route } from "react-router-dom";
import Main from "./pages/MainPage/main";
import Start from "./pages/StartPracticePage/start";
import During from "./pages/DuringPractice/during";
import LoginPage from "./pages/LoginPage/LoginPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/startPage" element={<Start/>} />
        <Route path="/duringPage" element={<During/>}/>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;

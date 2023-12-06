import { Routes, Route } from "react-router-dom";
import Sidebar from './component/sidebar';
import Navbar from './component/navbar';
import After_practice from './pages/AfterPractice/after_practice';
import Before_practice from './pages/StartPractice/before_practice';
import Dashboard from './pages/MainPage/dashboard';
import Expected_question from './pages/Question/expected_question';
import Middle_practice from './pages/DuringPractice/middle_practice';

const App = () => {
    return (
      <><div className="App h-100">

      <div className="container-xxl position-relative bg-white d-flex p-0 m-0 h-100">
        {/* <Sidebar currentPage={selectedPage} onButtonClick={handleButtonClick}/> */}
        <Sidebar />

        <div class="content mx-auto">
          <Navbar/>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/start" element={<Before_practice/>} />
            <Route path="/practicing" element={<Middle_practice/>}/>
            <Route path="/review" element={<After_practice />} />
            <Route path="/question" element={<Expected_question />} />
          </Routes>

        </div>
      </div>
      
      </div>

      </>
    );
  };
  
  export default App;
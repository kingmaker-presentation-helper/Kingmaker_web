import './App.css';
import Sidebar from './component/sidebar';
import Navbar from './component/navbar';
import After_practice from './pages/AfterPractice/after_practice';
import Before_practice from './pages/StartPractice/before_practice';
import Dashboard from './pages/MainPage/dashboard';
import Expected_question from './pages/Question/expected_question';
import Middle_practice from './pages/DuringPractice/middle_practice';

import React, {useState} from 'react';


function App() {

  const [selectedPage, setPage] = useState(1);

  const handleButtonClick = (number) =>{
    setPage(number);
  };

  const renderPage = () =>{
    switch(selectedPage) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Before_practice />;
      case 3:
        return <Middle_practice />;
      case 4:
        return <After_practice />;
      case 5:
        return <Expected_question />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App h-100">

      <div className="container-xxl position-relative bg-white d-flex p-0 m-0 h-100">
        {/* <Sidebar currentPage={selectedPage} onButtonClick={handleButtonClick}/> */}

        <div class="content mx-auto">
          <Navbar/>

          {renderPage()}
        </div>
      </div>
      
    </div>
  );
}

export default App;

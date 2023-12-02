import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const navigateToStartPage = () =>{
        navigate("/startPage");
    }

    const navigateToDuringPage = () => {
        navigate("/duringPage");
    }
  return (
    <>
      <header
        id="header"
        class="header"
        style={{
          width: "225px",
          left: "0",
          transform: "none",
          position: "fixed",
          top: "0",
          bottom: "0px",
          borderRight: "1px solid #f5f5f5",
          zIndex: "30",
          backgroundColor: "#fff",
          paddingLeft: "60px",
        }}
        >
        <h1 class="logo_wrap">
          <button
            className="logo-button"
            style={{
                backgroundPosition: "-255px -321px",
                // width: "114px",
                // height: "20px",
                display: "block",
                // paddingTop: "20px",
                margin: "37px 10px 5px 20px",
                backgroundColor: "transparent",
                border: "none",
                boxSahdow: "none",
                fontSize: "35px",
                fontWeight: "700",
                cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            #KingMaker
          </button>
          </h1>

        <h3 class="Dashboard">
            <button>
                Dashboard
            </button>
        </h3>
        <h3 class="StartPractice">
            <button onClick={()=>{
                navigateToStartPage();
                }}>
                연습 시작
            </button>
        </h3>
        <h3 class="DuringPractice">
            <button onClick={() =>{
                navigateToDuringPage();
            }}>
                연습 중
            </button>
        </h3>
        <h3 class="EndPractice">
            <button>
                연습 끝(분석)
            </button>
        </h3>
        <h3 class="QandA">
            <button>
                발표 예상 질문
            </button>
        </h3>
        </header>
    </>
  );
};

export default Header;


{/* <!-- Sidebar Start -->
<div class="sidebar pe-4 pb-3">
    <nav class="navbar bg-light navbar-light">
        <a href="index.html" class="navbar-brand mx-4 mb-3">
            <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>KingMaker</h3>
        </a>
        <div class="d-flex align-items-center ms-4 mb-4">
            <div class="position-relative">
                <img class="rounded-circle" src="img/user.jpg" alt="" style="width: 40px; height: 40px;">
                <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
            </div>
            <div class="ms-3">
                <h6 class="mb-0 userName">UserName</h6>
                <span class="role">Role</span>
            </div>
        </div>
        <div class="navbar-nav w-100">
            <a href="index.html" class="nav-item nav-link active"><i class="fa fa-tachometer-alt me-2"></i>Dashboard</a>
            <!-- <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="fa fa-laptop me-2"></i>Elements</a>
                <div class="dropdown-menu bg-transparent border-0">
                    <a href="button.html" class="dropdown-item">Buttons</a>
                    <a href="typography.html" class="dropdown-item">Typography</a>
                    <a href="element.html" class="dropdown-item">Other Elements</a>
                </div>
            </div> -->
            <a href="before_practice.html" class="nav-item nav-link"><i class="fa fa-th me-2"></i>연습 시작</a>
            <a href="middle_practice.html" class="nav-item nav-link"><i class="fa fa-th me-2"></i>연습 중</a>
            <a href="after_practice.html" class="nav-item nav-link"><i class="fa fa-th me-2"></i>연습 끝 (분석) </a>
            <a href="expected_question.html" class="nav-item nav-link"><i class="fa fa-th me-2"></i>발표 예상 질문</a>
            <!-- <a href="form.html" class="nav-item nav-link"><i class="fa fa-keyboard me-2"></i>Forms</a>
            <a href="table.html" class="nav-item nav-link"><i class="fa fa-table me-2"></i>Tables</a>
            <a href="chart.html" class="nav-item nav-link"><i class="fa fa-chart-bar me-2"></i>Charts</a>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i class="far fa-file-alt me-2"></i>Pages</a>
                <div class="dropdown-menu bg-transparent border-0">
                    <a href="signin.html" class="dropdown-item">Sign In</a>
                    <a href="signup.html" class="dropdown-item">Sign Up</a>
                    <a href="404.html" class="dropdown-item">404 Error</a>
                    <a href="blank.html" class="dropdown-item">Blank Page</a>
                </div>
            </div> -->
        </div>
    </nav>
</div>
<!-- Sidebar End -->  */}
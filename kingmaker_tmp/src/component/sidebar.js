import React from 'react';
import {Link} from 'react-router-dom';


const sidebarStyle = {

};

const imageStyle = {
    width: '40px',
    height: '40px'
};


const Sidebar = () => {

  return (
    <>
        <div class="sidebar d-none d-md-block h-100" style={sidebarStyle}>
            <nav class="navbar bg-light navbar-light d-flex align-items-start h-100 p-0" style={sidebarStyle}>
                <div class="my-auto ms-2 mt-0">
                <a href="index.html" class="navbar-brand mx-4 mb-3">
                    <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>KingMaker</h3>
                </a>
                <div class="d-flex align-items-center ms-4 mb-4">
                    <div class="position-relative">
                        <img class="rounded-circle" src="img/user.jpg" alt="" style={imageStyle} />
                        <div class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0 userName">UserName</h6>
                        <span class="role">Role</span>
                    </div>
                </div>
                <div class="navbar-nav w-100">
                    <Link class='nav-link' to='/'><i class='fa fa-tachometer-alt me-2'>Dashboard</i></Link>
                    <Link class='nav-link' to='/start'><i class='fa fa-th me-2'>연습 시작</i></Link>
                    <Link class='nav-link' to='/practicing'><i class='fa fa-th me-2'>연습 중</i></Link>
                    <Link class='nav-link' to='/review'><i class='fa fa-th me-2'>연습 끝 (분석)</i></Link>
                    <Link class='nav-link' to='/question'><i class='fa fa-th me-2'>발표 예상 질문</i></Link>
                </div>
                </div>
            </nav>
        </div>
    </>
  );
};

export default Sidebar;

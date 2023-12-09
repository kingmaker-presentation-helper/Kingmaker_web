import React from 'react';
import Footer from '../../component/footer';
import Info from './component/info';
import RecentPractice from './component/recent_practice';
import Reference from './component/reference';
import Widget from './component/widget';

const Dashboard = () =>{
    return (
        <>
        <Info />
        <RecentPractice />
        <Footer />
        </>
    );
};

export default Dashboard;
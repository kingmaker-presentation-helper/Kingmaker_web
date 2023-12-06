import React from 'react';
import Footer from '../../component/footer';
import Audio from './component/audio';
import PPT from './component/ppt';
import Video from './component/video';


const Middle_practice = () =>{
    return (
        <>
        <div class="container mt-5">
            <div class="text-center mb-4">
                <h2>음성 녹음 및 웨이브폼 표시</h2>
                <p>아래 버튼을 눌러 녹음을 시작하세요.</p>

                <Video />

                <PPT />
                
                <Audio />
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Middle_practice;
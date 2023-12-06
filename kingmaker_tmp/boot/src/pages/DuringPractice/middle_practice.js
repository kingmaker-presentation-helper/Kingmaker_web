import React, {useEffect, useState, useRef} from 'react';
import Footer from '../../component/footer';
import Audio from './component/audio';
import PPT from './component/ppt';
import Camera from './component/camera';


const Middle_practice = () =>{

    const cameraRef = useRef();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let intervalId;

        if(isActive) {
            intervalId = setInterval(() => {
                cameraRef.current.capturePhoto();
            }, 3000)
        }
        return () =>{
            clearInterval(intervalId);
        };
    }, [isActive])

    const captureToggle = () => {
        setIsActive(!isActive)
        console.log("isActive:", isActive)
    }


    return (
        <>
        <div class="container mt-5">
            <div class="text-center mb-4">
                <h2>음성 녹음 및 웨이브폼 표시</h2>
                <p>아래 버튼을 눌러 녹음을 시작하세요.</p>

                <Camera ref={cameraRef}/>

                <PPT />
                
                <Audio />

                <button onClick={captureToggle}>
                    {isActive ? '종료' : '시작'}
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Middle_practice;
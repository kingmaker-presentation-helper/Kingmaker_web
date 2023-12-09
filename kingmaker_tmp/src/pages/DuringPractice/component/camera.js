import React, {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import Webcam from 'react-webcam';

const videoConstraints={
    width:540,
    facingMode: 'environment'
}

const Camera = forwardRef((props, ref)=>{

    const webcamRef = useRef(null);
    const [captureIndex, setCaptureIndex] = useState(1);

    // 스크린샷 url 생성 함수
    const capturePhoto = async() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if(imageSrc){
            const filename=`${captureIndex}.jpg`;
            downloadPhoto(imageSrc, filename);

            setCaptureIndex(captureIndex + 1);
        }
    }

    const downloadPhoto = (url, filename) =>{
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const onUserMedia = (e) =>{
        console.log(e)
    }

    useImperativeHandle(ref, () => ({
        capturePhoto
    }));

    return(
        <>
        <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true} />
        </>
    )
});

export default Camera;
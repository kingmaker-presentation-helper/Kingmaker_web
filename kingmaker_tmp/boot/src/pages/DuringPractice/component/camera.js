import React, {useState, useRef} from 'react';
import Webcam from 'react-webcam';

const videoConstraints={
    width:540,
    facingMode: 'environment'
}

const Camera=()=>{

    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);

    // 스크린샷 url 생성 함수
    const capturePhoto = React.useCallback(async()=>{
        const imageSrc = webcamRef.current.getScreenshot()
        setUrl(imageSrc);
    }, [webcamRef]);

    const onUserMedia = (e) =>{
        console.log(e)
    }

    return(
        <>
        <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        mirrored={true} />


        <button onClick={capturePhoto}>Capture</button>
        <button onClick={()=> setUrl(null)}>Refresh</button>

        {url && (
            <div>
                <img src={url} alt="Screenshot" />
            </div>
        )}
        </>
    )
}

export default Camera;
import React, {useRef} from 'react';
import Webcam from 'react-webcam'

const Video =()=>{
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback((mediaDevices)=>
        setDevices(mediaDevices.filter(({kind}) => kind === 'videoinput')),
        [setDevices]
    );


    React.useEffect(()=>{
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices])

    return(
        <>
        <div class="row">
            <div class="col-12 mb-4">
                <div class="ratio ratio-16x9 mh-100">
                    
                    {devices.map((device, key)=>(
                        <div key={key}>
                            <Webcam
                            audio={false}
                            videoConstraints={{deviceId:device.deviceId}}/>
                            {device.label || `Device ${key + 1}`}
                        </div>
                    ))}

                    {/* <div id="videoPlaceholder" class="bg-light rounded shadow-lg d-flex justify-content-center align-items-center h-100 w-100">
                        <span class="text-muted">비디오 미리보기</span>
                    </div>
                    <video id="liveVideoFeed" class="rounded shadow-lg d-none h-100 w-100" autoplay muted></video>
                    <video id="videoPlayback" class="rounded shadow-lg d-none h-100 w-100"></video> */}
                </div>
            </div>
        </div>
        </>
    );
}

export default Video;
import React from 'react';

const Video =()=>{
    return(
        <>
        <div class="row">
            <div class="col-12 mb-4">
                <div class="ratio ratio-16x9 mh-100">
                    <div id="videoPlaceholder" class="bg-light rounded shadow-lg d-flex justify-content-center align-items-center h-100 w-100">
                        <span class="text-muted">비디오 미리보기</span>
                    </div>
                    <video id="liveVideoFeed" class="rounded shadow-lg d-none h-100 w-100" autoplay muted></video>
                    <video id="videoPlayback" class="rounded shadow-lg d-none h-100 w-100"></video>
                </div>
            </div>
        </div>
        </>
    );
}

export default Video;
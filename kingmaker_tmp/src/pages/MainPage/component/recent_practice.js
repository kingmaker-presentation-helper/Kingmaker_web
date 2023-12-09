import React, {useEffect, useRef, useState} from "react";
// import './carousel.scss';

const RecentPractice =()=>{

    const getContainerStyle =()=>({
        // overflowX: 'auto',
        // whiteSpace: 'nowrap'
    });

    const getItemStyle=()=>({
        // display: 'inline-block',
    });

    const imgs = [
        'img/ppt1.jpg',
        'img/ppt2.png',
        'img/ppt3.png',
        'img/ppt4.jpg',
    ];

    // const [item, setItem] = useState([
    //     {
    //         id: 1,
    //         url: 'img/ppt1.jpg'
    //     },
    //     {
    //         id: 2,
    //         url: 'img/ppt2.png'
    //     },
    //     {
    //         id: 3,
    //         url: 'img/ppt3.png'
    //     },
    //     {
    //         id: 4,
    //         url: 'img/ppt4.jpg'
    //     }
    // ]);

    // const [currentIndex, setCurrentIndex] = useState(0);
    // const fakeData = 2;
    // const setSliders=()=>{
    //     const addedFront = [];
    //     const addedLast = [];
    //     let index = 0;
    //     while (index < fakeData) {
    //         addedLast.push(item[index % item.length]);
    //         addedFront.unshift(item[item.length - 1 - (index % item.length)]);
    //         index++;
    //     }

    //     return [...addedFront, ...item, ...addedLast];
    // };

    // const handlerSlide = index =>{
    //     if (index < 0) {
    //         direction.current = 'left';
    //         index = slides.length - 1;
    //         setOffTransition(true);
    //     } else if(index === slides.length - 1) {
    //         direction.current = 'right';
    //         index = slides.length - 1;
    //     }
    //     setCurrentIndex(index);
    // }

    // const handleSwipe = direction =>{
    //     handlerSlide(currentIndex + direction);
    // };

    // const slides = setSliders();
    // const [offTransition, setOffTransition] = useState(false);
    // const direction = useRef('left');
    // const transition = offTransition ? '0s' : '1s';
    // const [disabled, setDisabled] = useState(false);
    // const buttonControll = () =>{
    //     setDisabled(true);
    //     setTimeout(()=> setDisabled(false), 1000);
    // };

    // useEffect(()=> {
    //     if (
    //         direction.current === 'right' &&
    //         currentIndex === slides.length - 1
    //     ) {
    //         setTimeout(()=> {
    //             setOffTransition(true);
    //             setCurrentIndex(0);
    //         }, 1000);
    //     }
    //     else if (
    //         direction.current === 'left' &&
    //         currentIndex === slides.length - 1
    //     ) {
    //         setTimeout(()=>{
    //             setOffTransition(false);
    //             setCurrentIndex(slides.length-2);
    //         }, [10]);
    //     }
    // }, [currentIndex]);

    return(
        <>
        {/* <div class='project'>
            <button
                disabled={disabled}
                onClick={()=>{
                    handleSwipe(-1);
                    buttonControll();
                }}>&lt;
            </button>
            <div className='carousel'>
                <div
                    className='carouselBox'
                    style={{
                        transform: `translateX(${-100 * currentIndex}%)`,
                        transition
                    }}>
                        {slides.map(({url, id}, idx) =>{
                            return (
                                <div
                                    key={idx}
                                    className='carouselItem'
                                    style={{backgroundImage: `url(${url})`}}>
                                        {id}
                                </div>
                            );
                        })}
                </div>
            </div>
            <button
                disabled={disabled}
                onClick={()=>{
                    handleSwipe(1);
                    buttonControll();
                }}>
                    &gt;
                </button>
        </div> */}
        <div class="container pt-4 px-4 m-0">
            <div class="container-fluid bg-light rounded p-4">
                <h6 class="mb-0">최근 연습</h6>
                <div class="d-flex overflow-auto" style={getContainerStyle()}>
                    {imgs.map((path, index) => (
                        <div key={index} class="" style={getItemStyle()}>
                            <button class='btn btn-link'>
                                <img src={path} class="d-block" alt={`이미지 ${index + 1}`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default RecentPractice;
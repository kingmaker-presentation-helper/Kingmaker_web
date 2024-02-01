var sessionkey = localStorage.getItem('sessionkey');

window.onload = async function() {
    await Promise.all([
        updatePPT(),
    ]);
};

async function updatePPT(){
    try {
        const response = await fetch(`http://43.200.201.188:9000/function/ppt_img/${sessionkey}`);
        const imagesData = await response.json();

        console.log('imagesData: ',imagesData);

        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');

        imagesData.images.forEach((imageData, index) =>{
            const imageUrl = `data:image/png;base64, ${imageData.data}`;
            const imgElement = new Image();
            imgElement.src = imageUrl;
            imgElement.alt = `Image ${index + 1}`;
            imgElement.className = 'd-block w-100';

            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            if (index === 0) carouselItem.classList.add('active');

            carouselItem.appendChild(imgElement);

            const caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';
            carouselItem.appendChild(caption);

            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExampleCaptions');
            indicator.setAttribute('data-bs-slide-to', index);
            if(index === 0) indicator.classList.add('active');

            carouselInner.appendChild(carouselItem);
            carouselIndicators.appendChild(indicator);
        });

    } catch (error) {
        console.error('Error in updatePPT: ', error);
        return;
    }
}
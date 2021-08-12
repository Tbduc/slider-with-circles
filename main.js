const slideImage = document.querySelectorAll('.slides-image');
const slidesContainer = document.querySelector('.slides-container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const navigationDots = document.querySelector('.navigation-dots');
let numberOfImages = slideImage.length;
let slideWidth = slideImage[0].clientWidth;
console.log(slideWidth);
let currentSlide = 1;

//Set up the slider
function init() {
    slideImage.forEach((img, i) => {
        img.style.left = i * 100 + "%";
    });
    slideImage[1].classList.add("active");
    slidesContainer.style.transform = 'translateX(-' + slideWidth * currentSlide + 'px)';
    createNavigationDots()
}

init();

function createNavigationDots() {
    for(let i = 0; i < numberOfImages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('single-dot');
        navigationDots.appendChild(dot);
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    }
    navigationDots.children[0].classList.add('hide');
    navigationDots.children[numberOfImages-1].classList.add('hide');
    navigationDots.children[1].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    console.log(currentSlide);
    if(currentSlide >= numberOfImages - 1) {
        goToSlide(1);
        return;
    }
    slidesContainer.style.transition = '900ms cubic-bezier(0.48, 0.15, 0.18, 1)';
    currentSlide++;
    goToSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    console.log(currentSlide);
    if(currentSlide <= 0) {
        goToSlide(numberOfImages - 2);
        return;
    }
    slidesContainer.style.transition = '900ms cubic-bezier(0.48, 0.15, 0.18, 1)';
    currentSlide--;
    goToSlide(currentSlide);
    
}) 

function goToSlide(slideNumber) {
    slidesContainer.style.transform = 'translateX(-' + slideWidth * slideNumber + 'px)';
    currentSlide = slideNumber;
    setActiveClass();
}

function setActiveClass() {
    let currentActive = document.querySelector('.slides-image.active');
    currentActive.classList.remove('active');
    slideImage[currentSlide].classList.add('active');

    let currentDot = document.querySelector('.single-dot.active');
    currentDot.classList.remove('active');
    navigationDots.children[currentSlide].classList.add('active');
    if(slideImage[currentSlide].id === "lastClone") {
        navigationDots.children[currentSlide].classList.remove('active');
        navigationDots.children[currentSlide + 4].classList.add('active');
    }
    if(slideImage[currentSlide].id === "firstClone") {
        navigationDots.children[currentSlide].classList.remove('active');
        navigationDots.children[currentSlide - 4].classList.add('active');
    }
}

slidesContainer.addEventListener('transitionend', () => {
    if(slideImage[currentSlide].id === 'lastClone') {
        slidesContainer.style.transition = 'none';
        currentSlide = numberOfImages - 2;
        slidesContainer.style.transform = 'translateX(-' + slideWidth * currentSlide + 'px)';
    }
    if(slideImage[currentSlide].id === 'firstClone') {
        slidesContainer.style.transition = 'none';
        currentSlide = numberOfImages - currentSlide;
        slidesContainer.style.transform = 'translateX(-' + slideWidth * currentSlide + 'px)';
    }
});
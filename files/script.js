let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

let callback = (entries, observer) => {
    let image = entries[0]
    if (!image.target.classList.contains('animate__slideInLeft')) {
        if (image.isIntersecting) {
            console.log(image)
            image.target.classList.add('animate__slideInLeft')
        }
    }
}

let observer = new IntersectionObserver(callback, options);

const images = document.querySelectorAll('.appear');

images.forEach(image => {
    observer.observe(image);
})

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

let callback = (entries, observer) => {
    let image = entries[0]
    if (!image.target.classList.contains('animate__zoomIn')) {
        if (image.isIntersecting) {
            image.target.classList.remove('hide');
            image.target.classList.add('animate__zoomIn')
        }
    }
}

let observer = new IntersectionObserver(callback, options);

const images = document.querySelectorAll('.appear');

images.forEach(image => {
    observer.observe(image);
});
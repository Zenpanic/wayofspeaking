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

const sendMessage = () => {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    fetch('https://wayofspeaking.herokuapp.com/send_message', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            message: message
        })
    }).then(response => {
        console.log('Message Sent!');
    })
}
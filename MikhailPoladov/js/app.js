// PARTICLES.js

particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 100,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#22ff3c"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.3,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 2,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#1cf542",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 743.0506492557308,
                    "size": 3,
                    "duration": 4.872463273808071,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 105,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": false
    }

);

// TYPED.js

window.onload = () => {
    
    let title = new Typed('.intro .title', {
        strings: ["", "Добро пожаловать!"],
        typeSpeed: 30,
        loop: false,
        showCursor: false
    });

    setTimeout(() => {
        if (title.typingComplete) {
            let title = new Typed('.intro .description', {
                strings: ["", "Меня зовут Михаил, я Junior Frontend Web-разработчик."],
                typeSpeed: 15,
                loop: false,
                showCursor: false
            });
            document.querySelector(".intro .description").style.opacity = "60%";
        }

        setTimeout(() => {
            if (title.typingComplete) {
                let title = new Typed('.intro .start-btn', {
                    strings: ["", ">>> связаться"],
                    typeSpeed: 15,
                    loop: false,
                    showCursor: false
                });
                document.querySelector(".intro .start-btn").style.opacity = "100%";
            }
        }, 2000);

    }, 2000);
}

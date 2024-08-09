// Плавный скрол для страницы
SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 800,
    // Размер шага в пикселях 
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение 
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Поддержка тачпада
    touchpadSupport: true,
})

//---------------- Файл stylekit.html
//------- Копирование стиля в буфер обмен
if (document.querySelector(".stylekit")) {
    function clipboardClass() {
        const styleClass = document.querySelectorAll(".indentation-system__class");
        let styleClassText = null;

        styleClass.forEach((elem) => {
            elem.onclick = function () {
                document.execCommand("copy");
            };

            elem.addEventListener("copy", function (event) {
                event.preventDefault();
                if (event.clipboardData) {
                    event.clipboardData.setData("text/plain", elem.textContent);
                    styleClassText = event.clipboardData.getData("text");
                    elem.innerHTML = "Скопированно";

                    const timer = setTimeout(() => {
                        elem.innerHTML = styleClassText;
                    }, 1000);
                }
            });
        });
    }

    try {
        clipboardClass();
    } catch (error) {
        console.error(error);
    }
}

//---------------- Файл index.html
//------- Секция main-cover - главный слайдер
if (document.querySelector(".main-cover")) {
    animateText()
    animateOpacity()
    function mainSlaider() {
        var swiper = new Swiper(".mySwiper-main-cover", {
            effect: 'creative', // Определяет эффект перехода слайдов
            simulateTouch: false,
            // grabCursor: true, // Устанавливает курсор в виде "grab" при наведении на слайдер
            speed: 1000, // Устанавливает скорость перехода между слайдами в миллисекундах
            loop: true, // Включает бесконечную прокрутку слайдов
            autoplay: {
                delay: 2000, // Задержка между переключением слайдов в миллисекундах
                disableOnInteraction: false, // Отключение автопрокрутки при взаимодействии пользователя с слайдером
            },
            scrollbar: {
                el: '.swiper-scrollbar', // Указание на элемент, который будет использоваться в качестве скроллбара
                hide: false, // Показывать скроллбар всегда
                draggable: true, // Позволяет перетаскивать скроллбар
            },
            navigation: {
                nextEl: ".swiper-button-next", // Указание на элемент управления для переключения к следующему слайду
                prevEl: ".swiper-button-prev", // Указание на элемент управления для переключения к предыдущему слайду
            },
            creativeEffect: {
                prev: {
                    shadow: true, // Добавляет тень при переключении к предыдущему слайду
                    translate: ["-40%", 0, -1], // Настройки анимации для переключения к предыдущему слайду
                },
                next: {
                    translate: ["100%", 0, 0], // Настройки анимации для переключения к следующему слайду
                },
            },
            breakpoints: {
                768: {
                    autoplay: false, // Отключение автопрокрутки при ширине экрана 768px и больше
                    // simulateTouch: false,
                    // grabCursor: false,
                },
            },
            on: {
                slideChangeTransitionStart: function () {
                    this.slides.forEach((slide, index) => {

                        const animationElements = slide.querySelectorAll('.animation-text');
                        if (index === this.activeIndex) {
                            animationElements.forEach((element) => {
                                gsap.to(element, {
                                    y: '150%',
                                    duration: 0,
                                });
                            });
                        }

                        const animationElementsOpacity = slide.querySelectorAll('.animation-opacity');
                        if (index === this.activeIndex) {
                            animationElementsOpacity.forEach((element) => {
                                gsap.to(element, {
                                    opacity: 0,
                                    duration: 0,
                                });
                            });
                        }

                    });
                },
                slideChangeTransitionEnd: function () {
                    const currentSlide = this.slides[this.activeIndex];
                    animateText(currentSlide);
                    animateOpacity(currentSlide);
                },
            },
        });

        const navigationButtons = document.querySelectorAll('.swiper-button-next, .swiper-button-prev');
        const navigationWrapper = document.querySelector('.swiper-button-wrapper');
        const navigationTimeout = 1500; // Установите желаемую задержку в миллисекундах

        navigationWrapper.addEventListener('click', (event) => {
            if (event.target.classList.contains('swiper-button-next') || event.target.classList.contains('swiper-button-prev')) {
                navigationButtons.forEach(btn => {
                    btn.style.pointerEvents = 'none'; // Блокируем кнопки навигации при клике
                });

                setTimeout(() => {
                    navigationButtons.forEach(btn => {
                        btn.style.pointerEvents = 'auto'; // Разблокируем кнопки после задержки
                    });
                }, navigationTimeout);
            }
        });
    }

    try {
        mainSlaider();
    } catch (error) {
        // console.error(error);
    }
}

//---------------- Файл index.html
//------- Секция projects - плавное сворачивание
if (document.querySelector(".projects")) {

    function projectsCheckBtn() {
        const dropdownItem = document.querySelectorAll('.projects__item');
        dropdownItem.forEach(elem => {
            const btn = elem.querySelector('.projects__ctoggleButton');
            const toggle = elem.querySelector('.projects__toggle');
            const content = elem.querySelector('.projects__content');
            const image = elem.querySelector('.projects__image');

            btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg)';

            btn.addEventListener('click', () => {
                if (toggle.checked) {
                    content.style.height = content.scrollHeight + 'px';
                    // content.classList.add('sp-t-yellow');
                    image.style.height = image.scrollHeight + 'px';
                    // image.style.height = '100%';
                    btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg)';

                } else {
                    content.style.height = '0px';
                    // content.classList.remove('sp-t-yellow');
                    image.style.height = '0px';
                    btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg)';
                }
            })
        })
    }

    try {
        projectsCheckBtn();
    } catch (error) {
        console.error(error);
    }

}

//---------------- Файл index.html
//------- Секция partners - бегущая строка
if (document.querySelector(".partners")) {
    function mainTicker() {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 'auto', // Устанавливаем количество видимых слайдов
            spaceBetween: 24, // Расстояние между слайдами
            autoplay: {
                delay: 2000, // Задержка между переключением слайдов в миллисекундах
            },
            speed: 800, // Скорость анимации в миллисекундах
            loop: true, // Разрешить зацикливание слайдов
        });
    }

    try {
        mainTicker();
    } catch (error) {
        console.error(error);
    }
}

//---------------- Файл -
//------- Анимация текста, появление снизу
function animateText() {
    gsap.set('.animation-text', {
        // opacity: 0,
        // scaleY: 0,
        // transformOrigin: "0% 100%",
        // transform: "scaleY(0.1)"
        y: '150%',
    });
    gsap.to('.animation-text', {
        duration: .7,
        // scaleY: 1,
        // opacity: 1,
        // transformOrigin: "0% 100%",
        // ease: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        y: 0,
    });
}

//---------------- Файл -
//------- Анимация, появление из прозрачности
function animateOpacity() {
    gsap.set('.animation-opacity', {
        opacity: 0,
        // scaleY: 0,
        // transformOrigin: "0% 100%",
        // transform: "scaleY(0.1)"
        // y: '150%',
    });
    gsap.to('.animation-opacity', {
        duration: .7,
        // scaleY: 1,
        opacity: 1,
        // transformOrigin: "0% 100%",
        // ease: "cubic-bezier(0.390, 0.575, 0.565, 1.000)"
        // y: 0,
    });
}
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

var swiper = new Swiper(".mySwiper-main-cover", {
    effect: 'creative',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    creativeEffect: {
        prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },
    // coverflowEffect: {
    //     rotate: 50, // Угол поворота слайдов
    //     stretch: 0, // Растяжение слайдов
    //     depth: 100, // Глубина перекрытия
    //     modifier: 1, // Модификатор
    //     slideShadows: true // Тень слайдов
    // },
    speed: 1000,

    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    // pagination: {
    //     el: ".swiper-pagination",
    //     clickable: true,
    // },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false, // Показывать скроллбар всегда
        draggable: true, // Позволяет перетаскивать скроллбар
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
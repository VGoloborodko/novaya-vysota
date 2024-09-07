window.addEventListener('load', (event) => {
    const body = document.querySelector('body');

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

                            const animationElements = slide.querySelectorAll('.animation-text-slide');
                            if (index === this.activeIndex) {
                                animationElements.forEach((element) => {
                                    gsap.to(element, {
                                        y: '150%',
                                        duration: 0,
                                    });
                                });
                            }

                            const animationElementsOpacity = slide.querySelectorAll('.animation-opacity-slide');
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

        //------- Анимация текста, появление снизу
        function animateText() {
            gsap.set('.animation-text-slide', {
                y: '150%',
            });
            gsap.to('.animation-text-slide', {
                duration: .7,
                y: 0,
            });
        }

        //------- Анимация, появление из прозрачности
        function animateOpacity() {
            gsap.set('.animation-opacity-slide', {
                opacity: 0,
            });
            gsap.to('.animation-opacity-slide', {
                duration: .7,
                opacity: 1,
            });
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
                        image.style.height = image.scrollHeight + 'px';
                        btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg)';

                    } else {
                        content.style.height = '0px';
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

    //---------------- Файл catalog.html
    //------- Секция catalog - плавное сворачивание
    if (document.querySelector(".catalog")) {

        function catalogCheckBtn() {
            const dropdownItem = document.querySelectorAll('.catalog__filters-item');
            dropdownItem.forEach(elem => {
                const btn = elem.querySelector('.catalog__ctoggleButton');
                const toggle = elem.querySelector('.catalog__toggle');
                const content = elem.querySelector('.catalog__filters-block');
                // const image = elem.querySelector('.projects__image');

                btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';

                btn.addEventListener('click', () => {
                    if (toggle.checked) {
                        content.style.display = 'block';
                        // content.style.height = content.scrollHeight + 'px';
                        // image.style.height = image.scrollHeight + 'px';
                        btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';

                    } else {
                        content.style.display = 'none';
                        // content.style.height = '0px';
                        // image.style.height = '0px';
                        btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg) center center/contain no-repeat';
                    }
                })
            })
        }

        try {
            catalogCheckBtn();
        } catch (error) {
            console.error(error);
        }

    }

    //---------------- Файл catalog.html
    //------- Секция catalog - плавное сворачивание
    if (document.querySelector(".info-center")) {

        // function infoCenterCheckBtn() {
        //     const dropdownItem = document.querySelectorAll('.info-center__filters-item');
        //     dropdownItem.forEach(elem => {
        //         const btn = elem.querySelector('.info-center__ctoggleButton');
        //         const toggle = elem.querySelector('.info-center__toggle');
        //         const content = elem.querySelector('.info-center__filters-block');
        //         // const image = elem.querySelector('.projects__image');

        //         btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';

        //         btn.addEventListener('click', () => {
        //             if (toggle.checked) {
        //                 content.style.display = 'flex';
        //                 // content.style.height = content.scrollHeight + 'px';
        //                 // image.style.height = image.scrollHeight + 'px';
        //                 btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';

        //             } else {
        //                 content.style.display = 'none';
        //                 // content.style.height = '0px';
        //                 // image.style.height = '0px';
        //                 btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg) center center/contain no-repeat';
        //             }
        //         })
        //     })
        // }

        function infoCenterCheckBtn() {
            const dropdownItem = document.querySelectorAll('.info-center__filters-item');

            dropdownItem.forEach((elem, index) => {
                const btn = elem.querySelector('.info-center__ctoggleButton');
                // const toggle = elem.querySelector('.info-center__toggle');   
                const content = elem.querySelector('.info-center__filters-block');
                let isOpen = false;

                btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';

                if (index === 0) {
                    content.style.display = 'flex';
                    btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';
                    isOpen = true;
                } else {
                    content.style.display = 'none';
                    btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg) center center/contain no-repeat';
                }

                btn.addEventListener('click', () => {
                    if (isOpen) {
                        content.style.display = 'none';
                        btn.style.background = 'url(/assets/icon/projects_ctoggleButton_open.svg) center center/contain no-repeat';
                        isOpen = false;
                    } else {
                        content.style.display = 'flex';
                        btn.style.background = 'url(/assets/icon/projects_ctoggleButton_close.svg) center center/contain no-repeat';
                        isOpen = true;
                    }
                });
            });
        }


        try {
            infoCenterCheckBtn();
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

    //---------------- Файл index.html
    //------- Секция header - функционал
    if (document.querySelector(".header__desktop")) {

        function headerDesktop() {

            // Появление и скрытие каталога
            const headerDesktop = document.querySelector('.header__desktop');
            const headerInput = document.querySelector('.header__desktop .header__toggle');
            const headerBtn = document.querySelector('.header__desktop .button-block__small-list');
            const catalog = document.querySelector('.header__catalog');
            const catalogBlock = document.querySelector('.header__catalog-block');

            const HeaderIcon = document.querySelector('.header__search-icon');

            headerInput.addEventListener('click', () => {

                if (headerInput.checked) {
                    setTimeout(() => {
                        catalogBlock.style.transition = 'all .5s';
                        catalogBlock.style.opacity = '1';
                    }, 500);

                    HeaderIcon.style.transition = 'all 0s';
                    headerDesktop.classList.remove('transparent')
                    catalog.classList.remove('close-catalog');
                    headerBtn.classList.add('header-click')
                    catalog.classList.add('open-catalog');
                    body.classList.add('no-scroll');
                } else {
                    if (headerDesktop.getAttribute('data-id') === 'transparent') {
                        headerDesktop.classList.add('transparent')
                        HeaderIcon.style.transition = 'all 1.5s';
                        setTimeout(() => {
                            HeaderIcon.style.transition = 'all 0s';
                        }, 1500);

                    }
                    catalogBlock.style.transition = 'all 0s';
                    catalogBlock.style.opacity = '0';
                    headerBtn.classList.remove('header-click')
                    catalog.classList.remove('open-catalog');
                    body.classList.remove('no-scroll');
                    catalog.classList.add('close-catalog');
                }
            })


            // Скрытие части меню при скроле
            let lastScrollTop = 0;
            const headerMain = document.querySelector('.header__main');
            const headerCover = document.querySelector('.header__desktop-cover');
            const headerCoverScroll = document.querySelector('.header__desktop-cover-scroll');

            // Скрываем часть хедера
            if (document.documentElement.scrollTop !== 0) {
                headerMain.classList.remove('open-catalog');
                headerCover.classList.remove('header-scroll-two');
                headerCoverScroll.classList.remove('header-scroll-four');
                headerMain.classList.add('close-catalog');
                headerCover.classList.add('header-scroll');
                headerCoverScroll.classList.add('header-scroll-three');
            }


            window.addEventListener('scroll', function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollTop > lastScrollTop) {
                    // Скроллим вниз и скрываем
                    headerMain.classList.remove('open-catalog');
                    headerCover.classList.remove('header-scroll-two');
                    headerCoverScroll.classList.remove('header-scroll-four');
                    headerMain.classList.add('close-catalog');
                    headerCover.classList.add('header-scroll');
                    headerCoverScroll.classList.add('header-scroll-three');
                } else {
                    // Скроллим вверх
                    if (scrollTop === 0) {
                        headerCover.classList.remove('header-scroll');
                        headerMain.classList.remove('close-catalog');
                        headerCoverScroll.classList.remove('header-scroll-three');
                        headerCoverScroll.classList.add('header-scroll-four');
                        headerCover.classList.add('header-scroll-two');
                        headerMain.classList.add('open-catalog');
                    }
                }

                // lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            });


            // Фильтрация меню в каталоге
            // const categoryHeaders = document.querySelectorAll('.header__category-item h4');
            const liElements = document.querySelectorAll('li[data-id]');
            const mainMenuItems = document.querySelectorAll('.header__main-menu-item');

            // categoryHeaders.forEach(header => {
            //     header.addEventListener('mouseover', () => {
            //         mainMenuItems.forEach(item => item.style.display = 'none');
            //     });
            // });

            liElements.forEach(li => {
                li.addEventListener('click', () => {
                    const dataId = li.getAttribute('data-id');
                    mainMenuItems.forEach(item => item.style.display = 'none');
                    // Показываем только блок с соответствующим data-id
                    const correspondingBlock = document.querySelector(`.header__main-menu-item[data-id="${dataId}"]`);
                    if (correspondingBlock) {
                        correspondingBlock.style.display = 'flex';
                    }
                });
            });
        }

        try {
            headerDesktop();
        } catch (error) {
            // console.error(error);
        }

    }

    // Частичная анимация
    function animation() {
        gsap.registerPlugin(ScrollTrigger);

        const animationText = document.querySelectorAll(".animation-text");
        const animationOpacity = document.querySelectorAll(".animation-opacity");

        // Появление снизу
        animationText.forEach(elem => {

            gsap.set(elem, {
                y: '150%',
            });

            gsap.to(elem, {
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                }
            });
        });

        // Появление из прозрачности
        animationOpacity.forEach(elem => {

            gsap.set(elem, {
                opacity: 0,
            });

            gsap.to(elem, {
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top bottom",
                }
            });
        });
    }

    try {
        animation();
    } catch (error) {
        // console.error(error);
    }

    // Плавный сколл для id
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const scrollOptions = {
                    behavior: 'smooth',
                    block: 'center', // Элемент будет выравниваться по центру
                    inline: 'center' // Элемент будет выравниваться по центру
                };
                targetElement.scrollIntoView(scrollOptions);
            } else {
                console.error(`Элемент с ID '${targetId}' не найден.`);
            }
        });
    });

});

// Вызов просходит в html
// Замена иконки при вводе в поиске
function toggleIcon(input) {
    const HeaderIcon = document.querySelector('.header__search-icon');
    if (input.value) {
        HeaderIcon.classList.add('active');
    } else {
        HeaderIcon.classList.remove('active');
    }
}

// Вызов просходит в html
// Очистка поиска
function clearInput() {
    const input = document.querySelector('.header__search-input');
    input.value = '';
    toggleIcon(input);
    input.focus();
}

// Переход на страницу поиска
const inputSearch = document.querySelector('.header__search-input');
inputSearch.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        // Переход на другую страницу
        window.location.href = '/search.html'; // Укажите нужный URL
    }
});

var swiper = new Swiper(".mySwiper-chips", {
    slidesPerView: 'auto',
    spaceBetween: 10,
});

// Добавить в структуру - ползунок
if (document.getElementById("range-slider")) {
    document.addEventListener("DOMContentLoaded", function () {
        var rangeSlider = document.getElementById('range-slider');
        var rangeFrom = document.getElementById('range-from');
        var rangeTo = document.getElementById('range-to');

        noUiSlider.create(rangeSlider, {
            start: [20, 180], // начальное значение from и to
            connect: true, // соединение между позициями
            range: {
                'min': 0,
                'max': 200 // минимальное и максимальное значение
            }
        });

        rangeSlider.noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (handle == 0) {
                rangeFrom.value = Math.round(value);
                resizeInput(rangeFrom);
            } else {
                rangeTo.value = Math.round(value);
                resizeInput(rangeTo);
            }
        });
    });

    function resizeInput(input) {
        input.style.width = input.value.length + "ch";
    }
}

if (document.querySelector(".main-card__star-rating")) {
    // document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll('.main-card__star');
    const starRating = document.querySelector('.main-card__star-rating');

    let currentRating = 0;

    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function () {
            if (currentRating === 0) {
                star.classList.add('fill');
                for (let i = 0; i < index; i++) {
                    stars[i].classList.add('fill');
                }
            }
        });

        star.addEventListener('mouseleave', function () {
            if (currentRating === 0) {
                starRating.querySelectorAll('.main-card__star').forEach(s => s.classList.remove('fill'));
            }
        });

        star.addEventListener('click', function () {
            const rating = parseInt(star.dataset.rating);
            currentRating = rating;
            starRating.querySelectorAll('.main-card__star').forEach((s, i) => {
                s.classList.toggle('fill', i < rating);
            });
            stars.forEach(s => {
                s.removeEventListener('mouseenter', null);
                s.removeEventListener('mouseleave', null);
                s.style.cursor = 'default';
            });
        });
    });
    // });
}

var swiper = new Swiper(".mySwiper-product-card", {
    slidesPerView: 'auto',
    spaceBetween: 10,
});

if (document.querySelector(".form-popup")) {
    const btnPopup = document.querySelector('.form-popup');
    const popupShadow = document.querySelector('.popup-shadow');

    function btnPopupOpen() {
        popupShadow.style.display = 'block';

        btnPopup.style.transform = 'translateX(0)';
        btnPopup.style.transition = '.5s ease-in';
    }

    function btnPopupClose() {
        popupShadow.style.display = 'none';

        btnPopup.style.transform = 'translateX(100%)';
        btnPopup.style.transition = '.5s ease-in';
    }
}

if (document.querySelector(".comparison")) {
    const chips = document.querySelectorAll('.button-block__chip');

    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            chips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');

            const targetId = chip.parentElement.dataset.id;
            const comparisonItems = document.querySelectorAll('.comparison__filter');

            comparisonItems.forEach(item => {
                if (item.dataset.id === targetId) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const selectedButton = document.querySelector('.button-block__chip.selected');
    if (selectedButton) {
        const targetId = selectedButton.parentElement.dataset.id;
        const comparisonItems = document.querySelectorAll('.comparison__filter');

        comparisonItems.forEach(item => {
            if (item.dataset.id === targetId) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    const links = document.querySelectorAll('.chips a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = link.dataset.id;
            const comparisonItems = document.querySelectorAll('.comparison__filter');

            comparisonItems.forEach(item => {
                if (item.dataset.id === targetId) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
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




var swiper = new Swiper(".mySwiper", {
    slidesPerView: 'auto', // Устанавливаем количество видимых слайдов
    spaceBetween: 24, // Расстояние между слайдами
    autoplay: {
        delay: 2000, // Задержка между переключением слайдов в миллисекундах
    },
    speed: 800, // Скорость анимации в миллисекундах
    loop: true, // Разрешить зацикливание слайдов
});

window.addEventListener('scroll', function () {
    var mainGeneral = document.querySelector('.main-general');
    var newsArticles = document.querySelector('.news-articles');
    var writeSection = document.querySelector('.write');
    var scrolled = (window.scrollY - mainGeneral.offsetTop) - writeSection.offsetHeight;
    // console.log(scrolled);
    
    var speed = 0.4; // Увеличенная скорость движения блока

    newsArticles.style.transform = 'translateY(' + (scrolled * speed) + 'px)'; // Изменяем вертикальный отступ блока news-articles в зависимости от скролла относительно блока "main-general"
});

// window.addEventListener('scroll', function () {
//     var mainGeneral = document.querySelector('.main-general');
//     var newsArticles = document.querySelector('.news-articles');
//     var writeSection = document.querySelector('.write');

//     var scrolled = window.scrollY - mainGeneral.offsetTop;
//     var speed = 0.5; // Скорость движения блока

//     var newsArticlesHeight = newsArticles.offsetHeight;
//     var writeSectionTop = writeSection.offsetTop;

//     if (scrolled * speed + newsArticlesHeight < writeSectionTop) {
//         newsArticles.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
//     }
// });
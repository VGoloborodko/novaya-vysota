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

    const dropdownItem = document.querySelectorAll('.projects__item');
    dropdownItem.forEach(elem => {
        const btn = elem.querySelector('.toggleButton');
        const content = elem.querySelector('.content');
        const image = elem.querySelector('.projects__image');

        btn.addEventListener('click', () => {
            if (content.style.height && content.style.height !== '0px') {
                content.style.height = '0px';
            } else {
                content.style.height = content.scrollHeight + 'px';
            }

            if (image.style.height && image.style.height !== '0px') {
                image.style.height = '0px';
            } else {
                image.style.height = image.scrollHeight + 'px';
            }

        })

        // btn.addEventListener('click', () => {
        //     console.log(content);
        //     if (content.style.height && content.style.height !== '0px') {
        //         content.style.height = '0px';
        //     } else {
        //         content.style.height = content.scrollHeight + 'px';
        //     }

        // })
    })

}
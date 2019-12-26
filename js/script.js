window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {

            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


    //TIMER
    let deadLine = '2019-12-23';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = hours = Math.floor((t / (1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.hours < 10 && t.hours >= 0) {
                hours.textContent = '0' + t.hours;
            } else {
                hours.textContent = t.hours;
            }
            if (t.minutese < 10 && t.minutes >= 0) {
                minutes.textContent = '0' + t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10 && t.seconds >= 0) {
                seconds.textContent = '0' + t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadLine);

    //modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriprionBtn = document.querySelectorAll('.description-btn');


    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';

    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });


    //tabs modal

    function showModal() {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    descriprionBtn.forEach(function (item) {
        item.addEventListener('click', function () {
            showModal();
        });
    });

    //Form
    let message = {
        loading: 'loading...',
        success: 'thanks, see you later',
        failure: 'something went wrong'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(elem);

            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('readystatechange', function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState == 4 && request.status == 200) {
                    statusMessage.innerHTML = message.success;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }

        });
    };
    sendForm(form);
    // contact form
    let contactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByTagName('input');
    sendForm(contactForm);

});

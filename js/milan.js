/*
* @Author: anchen
* @Date:   2016-03-30 10:05:42
* @Last Modified by:   anchen
* @Last Modified time: 2016-03-31 10:35:52
*/

'use strict';
window.onload = function () {
    var scrAera = document.getElementById("milannews");
    var liHeight = 120;//单行高度
    var scrTimer;//设置定时器
    var speed = 50;
    var delayTime = 2000;
    scrAera.scrollTop = 0;
    scrAera.innerHTML += scrAera.innerHTML;
    function scrAgain() {
        scrTimer = setInterval(scrollUp, speed);
        scrAera.scrollTop++;
    }
    function scrollUp() {
        if (scrAera.scrollTop % liHeight == 0) {
            clearInterval(scrTimer);
            setTimeout(scrAgain, delayTime);
        } else {
            scrAera.scrollTop++;
            if (scrAera.scrollTop >= scrAera.scrollHeight / 2) {
                scrAera.scrollTop = 0;
            }
        }
    }
    setTimeout(scrAgain, delayTime);




    // 轮播图
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 4;
    var animated = false;
    var interval = 3000;
    var timer;


    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset / (time / inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function () {
            if ((speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            } else {
                list.style.left = left + 'px';
                if (left > -200) {
                    list.style.left = -960 * len + 'px';
                }
                if (left < (-960 * len)) {
                    list.style.left = '-960px';
                }
                animated = false;
            }
        }
        go();
    }

    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 4) {
            index = 1;
        } else {
            index += 1;
        }
        animate(-960);
        showButton();
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 4;
        } else {
            index -= 1;
        }
        animate(960);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if (this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -960 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}
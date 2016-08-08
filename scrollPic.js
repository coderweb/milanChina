window.onload = function () {
    //获取元素
    var scrollPic = document.getElementById("scrollPic");
    //图片列表
    var picList = document.getElementById("list");
    var btnList = document.getElementById("buttons").getElementsByTagName("span");
    var preBtn = document.getElementById("prev");
    var nextBtn = document.getElementById("next");

    var picWidth = 9;
    var index = 1; //用于标记当前图片

    // 为上下页按钮添加点击事件
    preBtn.onclick = function () {
        //picList.style.left = parseInt(picList.style.left) + 960 + "px";
        animate(960);
    }

    nextBtn.onclick = function () {
        //picList.style.left = parseInt(picList.style.left) - 960 + "px";
        animate(-960);
    }

    function animate(offset) {
        var newLeft = parseInt(picList.style.left) + offset;
        picList.style.left = newLeft + "px";
        if (newLeft < -3840) {
            //到最后一张图时，将left值变成第一张图
            picList.style.left = -960 + "px";
        }
        if (newLeft > -960) {
            picList.style.left = -3840 + "px";
        }
    }


}
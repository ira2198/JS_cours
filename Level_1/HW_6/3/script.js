var arrImg = ["pic_1", "pic_2", "pic_3", "pic_4", "pic_5", "pic_6"];
var step = 0;

function elements(e) {
    var block = document.getElementsByClassName("container")[0];
    var back = document.createElement("button");
    back.appendChild(document.createTextNode("НАЗАД"));
    back.classList.add("button");
    back.onclick = moveBackward;
    block.appendChild(back);

    var blockImg = document.createElement("div");
    blockImg.classList.add("windImg");
    block.appendChild(blockImg);
    var img = document.createElement("img");
    img.src = "img/" + arrImg[0] + ".jpg";
    blockImg.appendChild(img);

    var next = document.createElement("button");
    next.appendChild(document.createTextNode("ВПЕРЕД"));
    next.classList.add("button");
    next.onclick = moveNext;
    block.appendChild(next);
}

function moveBackward() {
    var img = document.getElementsByTagName("img")[0];
    (step == arrImg.length - 1) ? step = 0: step++;
    img.src = "img/" + arrImg[step] + ".jpg";

}

function moveNext() {

    var img = document.getElementsByTagName("img")[0];
    (step == 0) ? step = arrImg.length - 1: step--;
    img.src = "img/" + arrImg[step] + ".jpg";

}

window.onload = elements;
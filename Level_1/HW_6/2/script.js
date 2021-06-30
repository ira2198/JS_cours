var artifact_1 = {
    title: "Перо феникса",
    price: 1200,
    picture: "img/artifact_1.jpg"
}
var artifact_2 = {
    title: "Яд василиска",
    price: 800,
    picture: "img/artifact_2.png"
}
var artifact_3 = {
    title: "Корень мандрагоры",
    price: 300,
    picture: "img/artifact_3.jpg"
}
var artifact_4 = {
    title: "Зелье удачи",
    price: 2800,
    picture: "img/artifact_4.jpg"
}
var artifact_5 = {
    title: "Маховик времени",
    price: 3700,
    picture: "img/artifact_5.png"
}
var artifact_6 = {
    title: "Рог единорога",
    price: 2200,
    picture: "img/artifact_6.jpg"
}
var artifactsArr = [artifact_1, artifact_2, artifact_3, artifact_4, artifact_5, artifact_6];
var sum = 0;

function prodAdd() {
    var products = document.getElementsByClassName("products")[0];
    for (var i = 0; i < artifactsArr.length; i++) {
        var artifactName = document.createElement("div");
        artifactName.classList.add("artName");
        var nameHeader = document.createElement("div");
        nameHeader.classList.add("card");

        artifactName.appendChild(document.createTextNode(artifactsArr[i].title));
        nameHeader.appendChild(artifactName);
        var pictureWind = document.createElement("div");
        pictureWind.classList.add("artImg");
        nameHeader.appendChild(pictureWind);

        var artifactImg = document.createElement("img");
        artifactImg.src = artifactsArr[i].picture;

        var priceSpan = document.createElement("span");
        priceSpan.classList.add("price")
        nameHeader.appendChild(priceSpan);

        priceSpan.appendChild(document.createTextNode(artifactsArr[i].price + "  золотых монет"))

        var button = document.createElement("button");
        button.classList.add("buttonArt");
        button.appendChild(document.createTextNode("Приобрести"));
        button.setAttribute("id", "button_" + i);
        button.onclick = cartAdd;
        nameHeader.appendChild(button);


        pictureWind.appendChild(artifactImg);
        products.appendChild(nameHeader);

    }

}

function cartAdd(ev) {
    var selectArtifact = artifactsArr[ev.target.id.split("_")[1]]
    var basket = document.getElementsByClassName("cart")[0];
    var cell = document.createElement("div");
    cell.appendChild(document.createTextNode(selectArtifact.title));
    basket.appendChild(cell);
    var price = document.createElement("span");
    price.appendChild(document.createTextNode(selectArtifact.price + "  монет"));
    basket.appendChild(price);
    sum += selectArtifact.price;
    document.getElementsByClassName("totalCosts")[0].textContent = "Стоимость ваших покупок " + sum + " золотых монет";
}

window.onload = prodAdd;
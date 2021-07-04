const goods = [{
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/1__card.jpg",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"


    },
    {
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/2__card.png",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"

    },
    {
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/3__card.jpg",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"

    },
    {
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/4__card.jpg",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"

    },
    {
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/5__card.jpg",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"

    },
    {
        button: "Add to Cart",
        imgButton: "img/basketCard.svg",
        image: "img/6__card.jpg",
        title: "ELLERY X M'O CAPSULE",
        definition: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
        price: "$52.00"

    },

];
const $productCards = document.querySelector('.product__cards');


const $cards = document.querySelector('.card');

const renderGoodsItem = ({ image, title, definition, price }) => {
    return `<section class="card"> <div class="cards__shadow"> <button class="cards__hover-basked"><img src="img/basketCard.svg" alt="based"> <span class="basketCard-text">Add to Cart</span>
</button> </div> <div class = "card-background"><img src="${image}" alt="product"></div> <h4 class="card__header">${title}</h4><p class="card__description">${definition}</p>
<div class="price red">${price}</div>    
</section>`;

};

const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
        item => renderGoodsItem(item)
    ).join(" ");


    $productCards.insertAdjacentHTML('beforeend', goodsList);
}


renderGoodsList();
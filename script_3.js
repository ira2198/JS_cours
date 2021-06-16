<


var goods = [{
    title: "Товар 1",
    made: "Виталий",
    price: 100,
    quantity: 5
}, {
    title: "Товар 2",
    price: 200,
    quantity: 3,
    made: "Артем"

}, {
    title: "Товар 3",
    price: 300,
    quantity: 9,
    made: "Наталья"
}];



function countBasketPrice() {
    var priceTitle = [];
    for (var i = 0; i < goods.length; i++) {
        priceTitle.push(goods[i].price * goods[i].quantity);
    }
    var result = 0;
    for (var j = 0; j < priceTitle.length; j++) {
        result += priceTitle[j];
    }

    return result;

}
document.write(countBasketPrice());
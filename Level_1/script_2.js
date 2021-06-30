// 3.
console.log("задание №3");
var a = ((Math.random() - 0.5) * 10).toFixed(0);
console.log(a + "   значение а");
var b = ((Math.random() - 0.5) * 10).toFixed(0);
console.log(b + "   значение b");
if (a > 0 && b > 0) {
    console.log(a - b);
} else if (a < 0 && b < 0) {
    console.log(a * b);
} else {
    console.log(Number(a) + Number(b));
}


//  4.
console.log("задание №4");

var n = (Math.round(Math.random() * (16 - 1) + 1));
var num = n - 1;
console.log(num + "     случайное число от 0 до 15");
list(num);

function list(f) {
    if (f < 15) {
        console.log(f++);
        list(f);
    } else if (f == 15) {
        console.log(f);
    }
}
/* switch (num) {
     case 0:
        console.log(num++);
    case 1:
        console.log(num++);
    case 2:
        console.logt(num++);
   case 3:
         console.log(num++);
     case 4:
         console.log(num++);
     case 5:
         console.log(num++);
     case 6:
         console.log(num++);
     case 7:
         console.log(num++);
     case 8:
         console.log(num++);
     case 9:
         console.log(num++);
     case 10:
         console.log(num++);
     case 11:
         console.log(num++);
     case 12:
         console.log(num++);
     case 13:
         console.log(num++);
     case 14:
         console.log(num++);
     case 15:
         console.log(num);
         break;
    default:
         break;
 }*/


// 5.- 6.

console.log("задание №5, №6");

function sum(a, b) {
    return a + b;
}

function diff(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function divis(a, b) {
    return a / b;
}

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case "+":
            var result = sum(arg1, arg2);
            console.log(result);
            break

        case "-":
            var result = diff(arg1, arg2);
            console.log(result);
            break
        case "*":
            var result = mult(arg1, arg2);
            console.log(result);
            break
        case "/":
            var result = divis(arg1, arg2);
            console.log(result);
            break
    }

}

mathOperation(1, 4, "+");
mathOperation(1, 4, "-");
mathOperation(1, 4, "*");
mathOperation(1, 4, "/");


// 8.  

console.log("задание №8");

/* function power(val, pow) {
    var n = Math.pow(val, pow);
    return n
}*/
function power(val, pow) {
    if (pow != 1) {
        return val *= power(val, pow - 1);
    } else {
        return val;
    }
}

console.log(power(3, 2));
//После игры необходимо спросить номер вопроса. 
//По номеру вопроса нужно вывести текст вопроса и текст выбранного ответа

var event, ok;
var repositoroes = []; // хранилище ответов

function questAnswer(question, answer1, answer2) {
    do { //Выводим первый вопрос
        ok = false;
        event = +prompt(question + answer1 + answer2 + '-1 - Выход из игры');

        if (event == -1) {
            break;
        } else {
            ok = isAnswers(works.a0, event);
        }

    } while (!ok);
    switch (event) {
        case 1:
            repositoroes.push([question, answer1]);
            break;
        case 2:
            repositoroes.push([question, answer2]);
            break;
        case -1:
            repositoroes.push([question, "Вы вышли из игры"]);
            break;
    }
    return event;
}

switch (questAnswer(works.a00, works.a1, works.a2)) {
    case 1: // Первое действие  - если в первом окне ввели 1 то открываем серию окон - окно 2
        switch (questAnswer(works.b00, works.b1, works.b2)) {
            case 1: // Второе действие, если во 2 окне ввели 1 то переходим на 4 окно
            case 2: //  если во 2 окне ввели 1 то переходим на 4 окно
                questAnswer(works.d00 + works.d1 + works.d2);
                break;
            case -1:
                break;
            default:
                alert("не корректный овет");
        }
        break;

    case 2:
        // Первое действие    Если в 1 окне ввели 2 то переходим к 3 окну
        switch (questAnswer(works.c00 + works.c1 + works.c2)) {
            case 1:
            case 2:
                questAnswer(works.d00 + works.d1 + works.d2);

            case -1:
                break;
            default:
                alert("не корректный овет");
        }
        break;
    case -1: // Первое действие
        break;
    default:
        alert("не корректный овет");
}
alert('Спасибо за игру');


function isAnswers(q, event) {
    if (isNaN(event) || !isFinite(event)) {
        alert('Вы ввели недопустимый символ');
        return false;
    } else if (event < 1 || event > q) {
        alert('Ваше число выходит из допустимого диапозона');
        return false;
    }
    return true;

}

var userQuestion = +prompt("Введите номер любого хода");
var result = "в ходе № " + userQuestion + " " + repositoroes[userQuestion - 1][0] + " Вы выбрали вариант" + repositoroes[userQuestion - 1][1];
alert(result);
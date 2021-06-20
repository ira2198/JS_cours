// Глобальные переменные:                            
var FIELD_SIZE_X = 20; //строки
var FIELD_SIZE_Y = 20; //столбцы
var SNAKE_SPEED = 200; // Интервал между перемещениями змейки
var snake = []; // Сама змейка
var direction = 'y+'; // Направление движения змейки
var gameIsRunning = false; // Запущена ли игра
var snake_timer; // Таймер змейки
var food_timer; // Таймер для еды
var score = 0; // Результат, счет игры

function init() { // вызывается самая первая
    prepareGameField(); // Генерация поля - вызов функции

    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле

    /*
	if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
    */
    wrap.style.width = '400px'; // размер поля
    // События кнопок Старт и Новая игра
    document.getElementById('snake-start').addEventListener('click', startGame); // кликаем по кнопке старт запускаем функцию
    document.getElementById('snake-renew').addEventListener('click', refreshGame);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection); // keydown регистрирует нажатия на клаву
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_X; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;

            row.appendChild(cell); // Добавление ячейки
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('snake-field').appendChild(game_table); // Добавление таблицы
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true; // запуск
    respawn(); // функция создания змейки
    // запускаем змейку
    snake_timer = setInterval(move, SNAKE_SPEED); //каждые 200мс запускаем функцию move 5 раз в сек 
    setTimeout(createFood, 5000); // функция запускается с задержкой в 5 сек


}

/**
 * Функция расположения змейки на игровом поле \ отрисовываем
 */
function respawn() {
    // Змейка - массив td
    // Стартовая длина змейки = 2

    // Respawn змейки из центра
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2); // 10 й столбез 10я строка. координаты змейки
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);

    // Хвост змейки
    var snake_tail = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0]; // получаем нужную ячейку подстовляя координаты

    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit'); // можно через classlist.add тоже но короче
    // Голова змейки
    var snake_head = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0]; // как хвомт но у уменьшается вверх по этому -1
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');

    snake.push(snake_tail); // элементы размещаем в массив змейки, хвост 0й индекс голова 1й
    snake.push(snake_head);
}

/**
 * Движение змейки
 */
function move() {
    //console.log('move',direction);
    // Сборка классов . создаем массив класов для новой ячейки со змейкой
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');

    // Сдвиг головы
    var new_unit; // ячейка для головы змейки
    var snake_coords = snake_head_classes[1].split('-'); //преобразовали строку в массив
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);

    // Определяем новую точку и направление движения
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0]; // ползет в лево
    } else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0]; // ползет в право
    } else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0]; // ползет вверх
    } else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0]; // ползет вниз
    }
    // 1) new_unit не часть змейки
    // 2) Змейка не ушла за границу поля
    console.log(new_unit);
    if (new_unit === undefined) {
        new_unit = teleport(coord_y, coord_x);
    }


    // Проверки
    if (!isSnakeUnit(new_unit) && bombChek(new_unit)) { // если ячейка не часть змейки вызываем переменную хорошо если функция фолс
        // Добавление новой части змейки
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit'); // добавили класс для змейкм
        snake.push(new_unit); // добавили массив

        // Проверяем, надо ли убрать хвост
        if (!haveFood(new_unit)) { // через функцию про еду
            // Находим хвост
            var removed = snake.splice(0, 1)[0]; //  нашли хвост змейки удалаяем первый элемент в массиве 
            var classes = removed.getAttribute('class').split(' ');

            // удаляем хвост
            removed.setAttribute('class', classes[0] + ' ' + classes[1]);
            // или removed.classList.remuve("snake-unit");
        }
    } else {
        finishTheGame(); // если врезается сама  в себя останавливаем
    }
}

function teleport(y, x) {
    var unit;
    if (direction == "x-") {
        unit = document.getElementsByClassName("cell-" + (y) + "-" + (FIELD_SIZE_X - 1))[0];
    } else if (direction == "x+") {
        unit = document.getElementsByClassName("cell-" + (y) + "-" + (0))[0];
    } else if (direction == "y+") {
        unit = document.getElementsByClassName("cell-" + (FIELD_SIZE_Y - 1) + "-" + (x))[0];
    } else if (direction == "y-") {
        unit = document.getElementsByClassName("cell-" + (0) + "-" + (x))[0];
    }
    return unit;
}




/**
 * Проверка на змейку
 * @param unit
 * @returns {boolean}
 */
function isSnakeUnit(unit) {
    var check = false; // - ячейка не часть змейки все норм

    if (snake.includes(unit)) { // проверяем есть ли в нашем массиве змейки  эта ячейка
        check = true;
    }
    return check;
}
/**
 * проверка на еду
 * @param unit
 * @returns {boolean}
 */
function haveFood(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' '); // все классы преобразуем в массив


    if (unit_classes.includes('food-unit')) { // если в этом массиве есть элемент с класом еда или бомба
        check = true;
        createFood();
        setTimeout(createBombs, 3000); // функция строит бомбу

        score++; // увеличиваем счет

        var showScore = document.getElementsByClassName("gameScore")[0];
        showScore.innerHTML = score;
    }

    return check;
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false; // еды нет

    while (!foodCreated) { //пока еду не создали
        // получаем рандомные координаты
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0]; // ысоздаем из них ячеку
        var food_cell_classes = food_cell.getAttribute('class').split(' '); // получаем массив крассов

        // проверка на змейку
        if (!food_cell_classes.includes('snake-unit')) { // если в этом массиве нет класа змейки
            var classes = ''; //присваиваем класс с кормом или
            // food_cell.classList.add ("food-unit");
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}

/**
 * Создание бомбочек
 */

function createBombs() {
    var bum = false;
    while (!bum) {
        // получаем рандомные координаты
        var bomb_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var bomb_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var bomb_cell = document.getElementsByClassName('cell-' + bomb_y + '-' + bomb_x)[0];
        var bomb_arr_classes = bomb_cell.getAttribute('class').split(' '); // получаем массив крассов

        // проверка на змейку
        if (!bomb_arr_classes.includes('snake-unit')) { // если в этом массиве нет класа змейки
            //присваиваем класс 
            bomb_cell.classList.add("bomb");
            bum = true;
        }
    }
    setTimeout(bombDelete, 20000);
}
//
// проверка на бомбочки
//

function bombChek(unit) {
    var check = true;
    var unit_classes = unit.getAttribute('class').split(' ');
    if (unit_classes.includes("bomb")) {
        check = false;
    }
    return check;
}
//
// Удаление бомбочек
// 
function bombDelete() {
    var arrBombs = document.getElementsByClassName("bomb");
    bombDel = arrBombs[arrBombs.length - 1];
    bombDel.classList.remove("bomb");

}

/**
 * Изменение направления движения змейки при нежатии клавиш
 * у каждой клавиши есть свой индивидуальный код
 * @param e - событие
 */
function changeDirection(e) {
    console.log(e);
    switch (e.keyCode) { // свойство код клавиши
        case 37: // Клавиша влево
            if (direction != 'x+') { // если при движении в лево змейка не движется в право
                direction = 'x-' // то поворачиваем в лево
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}

/**
 * Функция завершения игры
 */
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

// Инициализация
window.onload = init;
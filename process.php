<?php
//process.php проверяет данные на принадлежность области фигуры и создает данные, 
//которые позже будет необходимо добавить в таблицу (data_handler.js)

date_default_timezone_set('Europe/Moscow'); //Установление временной зоны на сервере

//Объявление функции check с параметрами $x, $y, $r
function check($x, $y, $r) { 
    if (
        ($y <= $x + $r / 2 && $x >= -($r / 2) && $x <= 0 && $y >= 0) || //Проверка попадания точки в первую область (треугольник)
        ($x ** 2 + $y ** 2 <= ($r / 2) ** 2 && $x >= 0 && $y >= 0) || //Проверка попадания точки во вторую область (окружность)
        ($x >= 0 && $y >= -$r && $y <= 0 && $x <= $r / 2) //Проверка попадания точки в третью область (прямоугольник)
    ) {
        return true; //Если точка попала в одну из областей, возвращаем true
    } else {
        return false; //Если точка не попала ни в одну из областей, возвращаем false
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') { //Проверка на то, что запрос пришел методом POST
    $x = floatval($_POST['XX']); 
    $y = floatval($_POST['YY']); 
    $r = floatval($_POST['RR']); //Извлечение значений из запроса и преобразование его в число 

    $current_time = date("H:i:s"); //Получение текущего времени в формате "Часы:Минуты:Секунды"
    $starting_time = microtime(true); //Запись текущего времени в миллисекундах в переменную $starting_time

    $checked_dot = check($x, $y, $r) ? "Попадание!" : "Промах!"; //Проверка, попала ли точка в заданную область
    $finish_time = round(microtime(true) - $starting_time, 7); //Вычисление время выполнения скрипта в секундах

    $data = array( //Создание ассоциативного массива с данными для отправки в JSON-формате
        "data" => array( //Заполнение вложенного массива с данными
            "x" => $x,
            "y" => $y,
            "r" => $r,
            "current_time" => $current_time,
            "finish_time" => $finish_time,
            "checked_dot" => $checked_dot
        )
    );

    //Отправление данных в формате JSON
    header('Access-Control-Allow-Origin: *'); //Установление заголовка для разрешения доступа откуда угодно
    echo json_encode($data); //Кодирование данных в формат JSON и отправляем их обратно на клиентскую сторону
}
?>
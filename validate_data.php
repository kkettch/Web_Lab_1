<?php
//validate_data.php проверяет что данные, полученные сервером от клиента имеют значение в нужном диапозоне

//Функция validate принимает x, y и r и проверяет их на соответствие условиям
function validate($x, $y, $r) {

    //Преобразование x, y и r в числа, чтобы избежать проблем с типами данных
    $x = floatval($x);
    $y = floatval($y);
    $r = floatval($r);

    //Проверка соответствия x, y и r заданным условиям
    if (($x >= -3 && $x <= 3) &&
        ($y >= -4 && $y <= 4) &&
        ($r >= 1 && $r <= 5)) {
        return true; //true, если все условия выполняются
    } else {
        return false; //false, если хотя бы одно условие не выполняется
    }
}

//Проверка, был ли запрос методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Получение значений x, y и r из POST-запроса
    $x = floatval($_POST['XX']);
    $y = floatval($_POST['YY']);
    $r = floatval($_POST['RR']);    

    //Вызов функции validate для проверки значений x, y и r
    $valid = validate($x, $y, $r);

    
    header('Access-Control-Allow-Origin: *'); //Установление заголовка для разрешения доступа откуда угодно
    echo json_encode(array("valid" => $valid)); //Отправка результата проверки в формате JSON
}
?>

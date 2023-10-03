//validate.js валидирует введенные пользователем данные на клиентской стороне перед отправкой их серверу

//Добавление обработчиа события "DOMContentLoaded", который срабатывает, когда весь HTML-документ был полностью загружен и преобразован в объект DOM
document.addEventListener("DOMContentLoaded", function () {
  //Получение кнопки с id "checking"
  const checkingButton = document.getElementById("checking");
  //Получение первой формы на странице
  const form = document.querySelector("form");

  //Добавление обработчика события "click" для кнопки "checking"
  checkingButton.addEventListener("click", function (e) {
    //Отмена стандартного поведения формы, чтобы предотвратить ее отправку
    e.preventDefault();

    //Получение значения X, введенного пользователем, из поля ввода
    const xInput = document.querySelector('input[name="X_coordinate"]').value;
    //Проверка, что значение X является числом или минусом
    if (!/^[+-]?\d+(\.\d+)?$/.test(xInput)) {
      // Если значение не является числом (целым или с плавающей точкой), вывод сообщения об ошибке и выход из функции
      document.getElementById("error_message").textContent =
        "Введите числовое значение X (целое или с плавающей точкой)!";
      return;
    }
    //Преобразование значения X в целое число
    const x = parseFloat(xInput);
    //Проверка, является ли значение X числом и находится ли в указанном диапазоне
    if (isNaN(x)) {
      document.getElementById("error_message").textContent =
        "Введите значение X!";
      return;
    } else if (x < -3 || x > 3) {
      document.getElementById("error_message").textContent =
        "Введите значение в указанном диапазоне!";
      return;
    }

    // Получаем все чекбоксы с именем, начинающимся с "y"
    const yCheckboxes = document.querySelectorAll('.checkbox[name^="y"]');
    let y = null;
    //Перебор всех чекбоксов и поиск выбранного
    yCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        y = parseFloat(checkbox.value);
      }
    });
    //Если не выбрано значение Y, вывод сообщения об ошибке и выход из функции
    if (y == null) {
      document.getElementById("error_message").textContent =
        "Укажите значение Y!";
      return;
    }

    //Получение выбранного значения R, поиск активной кнопки
    const rButton = document.querySelector(".btn.active");
    let r = null;
    //Если активная кнопка есть, преобразование ее значения в число
    if (rButton) {
      r = parseFloat(rButton.value);
    }
    //Если не выбрано значение R, вывод сообщение об ошибке и выход из функции
    if (r == null) {
      document.getElementById("error_message").textContent =
        "Выберите значение R!";
      return;
    }

    //Очищение сообщения об ошибке, если все ошибки были исправлены пользователем или он сразу ввел все верно
    document.getElementById("error_message").textContent = "";

    //Заполнение скрытых полей формы значениями X, Y и R
    document.getElementById("hiddenX").value = x;
    document.getElementById("hiddenY").value = y;
    document.getElementById("hiddenR").value = r;

    //Вызов функции sendData() для отправки данных на сервер
    sendData();
  });
});

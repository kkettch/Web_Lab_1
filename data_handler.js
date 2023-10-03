//data_handler.js отправляет данные на сервер, где те валидируется и при успешной валидации добавляется строка таблицы

function sendData() {
  // Получение значений x, y и r из соответствующих элементов формы
  var x = parseFloat($("input[name='XX']").val());
  var y = parseFloat($("input[name='YY']").val());
  var r = parseFloat($("input[name='RR']").val());

  // Создание объекта с данными для отправки на сервер
  var formData = new FormData();
  formData.append("XX", x);
  formData.append("YY", y);
  formData.append("RR", r);

  // Отправка данных на сервер методом POST с помощью jQuery AJAX
  $.ajax({
    type: "POST",
    url: "validate_data.php",
    data: formData,
    processData: false,
    contentType: false,
    dataType: "json",
    success: function (data) {
      if (data.valid) {
        // Если данные валидны, отправка их на сервер process.php для обработки
        $.ajax({
          type: "POST",
          url: "process.php",
          data: formData,
          processData: false,
          contentType: false,
          dataType: "json",
          success: function (data) {
            var tableBody = $("#resultTable tbody");
            var newRow = `
              <tr>
                <td>${data.data.x}</td>
                <td>${data.data.y}</td>
                <td>${data.data.r}</td>
                <td>${data.data.current_time}</td>
                <td>${data.data.finish_time}</td>
                <td>${data.data.checked_dot}</td>
              </tr>`;
            tableBody.append(newRow);
            draw(x, y, r); // Вызов функции draw для отрисовки точки на графике
          },
          error: function (error) {
            console.error("Error:", error);
          },
        });
      } else {
        // Если данные не валидны, сообщение об ошибке с помощью alert
        alert(
          "Произошла ошибка с данными. Пожалуйста, проверьте введенные значения."
        );
      }
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}

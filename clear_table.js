//clear_table.js реализует поведение кнопки 'Очистить таблицу'

//С помощью селектора jQuery выбирается элемент с id="resultTable". Этот элемент представляет собой таблицу
//Метод .html jQuery используется для изменения HTML-содержимого выбранного элемента
//Происходит возвращение таблицы в изначальное состояние до появления данных в ней

function clear_table() {
  $("#resultTable").html(`<thead> 
            <tr id="heads">
              <th>X</th>
              <th>Y</th>
              <th>R</th>
              <th>Текущее время</th>
              <th>Время работы</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
          </tbody>`);
}
//button.js реализует поведение кнопок значения R, чтобы можно было выбрать только одну кнопку,
//при выборе второй - выбор первой отменяется

// Добавление обработчик события "DOMContentLoaded", который срабатывает, когда весь HTML - документ был полностью загружен и преобразован в объект DOM.
document.addEventListener("DOMContentLoaded", function () {
  //Получение всех элементов класса "btn"
  const buttons = document.querySelectorAll(".btn");
  //Для каждой кнопки в коллекции "buttons" добавляется обработчик события "click"
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      //Перебор всех кнопок
      buttons.forEach((btn) => {
        //Удаление у каждой кнопки класса "active", если он есть.
        btn.classList.remove("active");
      });
      //Добавление "active" только кнопке, на которую нажали (this).
      this.classList.add("active");
    });
  });
});

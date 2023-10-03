//checkbox.js проверяет, что чможно выбрать только один чекбокс, при выборе второго галочка с первого снимается

const checkboxes = document.querySelectorAll(".checkbox"); //Получение всех элементов checkbox с классом "checkbox"

//Добавление обработчика событий для каждого элемента
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    //Если текущий элемент был выбран, снятие галочки с остальных
    if (this.checked) {
      //Перебор всех чекбоксов
      checkboxes.forEach((otherCheckbox) => {
        //Проверка, что текущий чекбокс не является текущим элементом
        if (otherCheckbox !== this) {
          //Снятие галочку с остальных чекбоксов
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

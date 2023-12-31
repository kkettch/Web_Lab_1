const canvas = document.getElementById("canvas"); //Получение элемент холста по его идентификатору "canvas" и сохранение его в переменной canvas
let defaultR = 5; //Устаналивается значение радиуса по умолчанию для загрузки страницы

//Объявление функции draw, которая будет выполнять рисование на холсте
function draw(x, y, r) {
  //Проверяется, смог ли быть получен хост по его id
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d"); //Получение контекста рисования для холста
    const size = 300; //Устанавливается размер холста
    canvas.setAttribute("width", size.toString()); //Установливается ширина холста
    canvas.setAttribute("height", size.toString()); //Установливается высота холста

    //Если радиус r не получен, устанавливается значениe defaultR
    if (r === undefined) {
      r = defaultR;
    }

    //Вызов функций для рисования различных элементов
    drawArea(ctx, size, r); //Рисование области
    drawAxes(ctx, size); //Рисование осей координат
    drawText(ctx, size, r); //Рисование текстовых меток на осях координат

    //Если переданы координаты точки (x, y), рисование точки
    if (x && y) {
      drawPoint(x, y, size, ctx);
    }
  } else {
    // Если холст не поддерживается, вывод сообщения об ошибке
    alert("Canvas - unsupport");
  }
}

//Объявление функции drawPolygon для рисования фигуры
function drawArea(ctx, size, r) {
  //Устанавливается общее количество точек для рисования фигуры
  let totalPoints = 12;
  //Вычисляется расстояние между точками
  let pointInPixels = size / totalPoints;

  //Рисование прямоугольника
  ctx.fillStyle = "#667fff"; //Устанавливается цвет заливки
  ctx.beginPath(); //Начинается путь рисования
  ctx.fillRect(size / 2, size / 2, (r / 2) * pointInPixels, r * pointInPixels); //Рисуется прямоугольник с указанными параметрами (x, y, ширина, высота)

  //Рисование треугольника
  ctx.beginPath(); //Начинается новый путь рисования
  ctx.moveTo(size / 2, size / 2); //Перемещение в начальную точку
  ctx.lineTo(size / 2 - (r / 2) * pointInPixels, size / 2); //Рисование линию до одной вершины треугольника
  ctx.lineTo(size / 2, size / 2 - (r / 2) * pointInPixels); //Рисование линии до следующей вершины
  ctx.fill(); // Заливаем треугольник цветом

  //Рисование окружности
  ctx.beginPath(); //Начинается новый путь рисования
  ctx.moveTo(size / 2, size / 2); //Перемещение в начальную точку
  ctx.arc(
    size / 2,
    size / 2,
    (r / 2) * pointInPixels,
    0,
    (3 * Math.PI) / 2,
    Math.PI
  ); //Рисование дуги полукруга с указанными параметрами:
  //Центр полукруга по х, центр полукруга по y, радиус, начальный угол, конечный угол, направление дуги
  ctx.fill(); //Заливка полукруг выбранным цветом
}

//Объявление функции drawAxes для рисования осей координат
function drawAxes(ctx, size) {
  ctx.fillStyle = "black"; //Устанавливается цвет заливки в черный
  ctx.fillRect(0, size / 2, size, 1); //Рисование горизонтальной оси (координата по х, координата по у, ширина в пикселя, высота в пикселях)
  ctx.fillRect(size / 2, 0, 1, size); //Рисование вертикальной оси (координата по х, координата по у, ширина в пикселя, высота в пикселях)
}

//Объявление функции drawText для рисования текстовых меток
function drawText(ctx, size, r) {
  let totalPoints = 12; //Общее количество точек для рисования меток
  let pointInPixels = size / totalPoints; //Вычисление расстояния между точками
  ctx.fillStyle = "black"; //Устаналивается цвет заливки текста в черный
  ctx.font = "15px serif"; //Устанавливается шрифт и размер текста

  //Рисование метки справа от центра осей координат
  ctx.fillText("R", size / 2 + r * pointInPixels, size / 2); //Какой текст рисуется, координата по х (смещение текста вправо от центра на r), координата по у
  ctx.fillText("R/2", size / 2 + (r / 2) * pointInPixels, size / 2); //Какой текст рисуется, координата по х (смещение текста вправо от центра на r/2), координата по y

  //Рисование метки снизу от центра осей координат
  ctx.fillText("R", size / 2, size / 2 + r * pointInPixels); //Какой текст рисуется, координата по х, координата по у (смещение текста вниз от центра на r)
  ctx.fillText("R/2", size / 2, size / 2 + (r / 2) * pointInPixels); //Какой текст рисуется, координата по х, координата по у (смещение текста вниз от центра на r/2)

  //Рисование метки сверху от центра осей координат
  ctx.fillText("R", size / 2, size / 2 - r * pointInPixels); //Какой текст рисуется, координата по х, координата по у (смещение текста вверх от центра на r)
  ctx.fillText("R/2", size / 2, size / 2 - (r / 2) * pointInPixels); //Какой текст рисуется, координата по х, координата по у (смещение текста вверх от центра на r/2)

  //Рисование метки слева от центра осей координат
  ctx.fillText("R", size / 2 - r * pointInPixels, size / 2); //Какой текст рисуется, координата по х (смещение текста влево от центра на r), координата по у
  ctx.fillText("R/2", size / 2 - (r / 2) * pointInPixels, size / 2); //Какой текст рисуется, координата по х (смещение текста влево от центра на r/2), координата по у
}

//Объявление функции drawPoint для рисования точки
function drawPoint(x, y, size, ctx) {
  ctx.fillStyle = "#ff75bf"; //Устаналивается цвет заливки точки в розовый
  let totalPoints = 12; //Общее количество точек для рисования
  let pointInPixels = size / totalPoints; //Вычисляется расстояние между точками

  ctx.beginPath(); //Новый путь рисования
  ctx.arc(
    size / 2 + pointInPixels * x, //Положение точки по оси X
    size / 2 - y * pointInPixels, //положение точки по оси Y
    5, //Радиус точки
    0, //Начальный угол, с которого начинается рисование окружности
    Math.PI * 2 //Конечный угол окружности в радианах
  );
  ctx.fill(); //Заливка точки выбранным цветом
}

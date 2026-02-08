let score = 0;
let clicked = false;

function goTo(id) {
  document.querySelectorAll("section")
    .forEach(s => s.classList.remove("active"));

  document.getElementById(id)
    .classList.add("active");
}

/* 1. Фишинг */
function correctClick() {
  if (!clicked) {
    document.getElementById("phishResult").innerText =
      "✅ Верно! Подозрительная ссылка — главный признак фишинга.";
    score++;
    clicked = true;
  }
}

function wrongClick() {
  if (!clicked) {
    document.getElementById("phishResult").innerText =
      "❌ Это тоже подозрительно, но самый важный признак — ссылка.";
  }
}

/* 2. Скачивание */
function downloadChoice(correct) {
  document.getElementById("downloadResult").innerText =
    correct
      ? "✅ Правильно! Официальный сайт безопаснее."
      : "❌ Ошибка! Торренты часто содержат вирусы.";

  if (correct) score++;
}

/* 3. Пароль */
function checkPassword() {
  let pass = document.getElementById("passwordInput").value;

  let strong =
    pass.length >= 8 &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass);

  document.getElementById("passwordStrength").innerText =
    strong ? "✅ Надёжный пароль!" : "❌ Слабый пароль";

  if (strong) score++;
}

/* 4. Вложение */
function fileChoice(correct) {
  document.getElementById("fileResult").innerText =
    correct
      ? "✅ Верно! .exe — часто вирус."
      : "❌ Фото не бывает .exe.";

  if (correct) score++;
}

/* 5. SMS */
function smsChoice(correct) {
  document.getElementById("smsResult").innerText =
    correct
      ? "✅ Правильно! Код нельзя никому передавать."
      : "❌ Это популярный способ взлома.";

  if (correct) score++;
}

/* 6. Флешка */
function usbChoice(correct) {
  document.getElementById("usbResult").innerText =
    correct
      ? "✅ Отлично! Флешки могут содержать вирусы."
      : "❌ Так можно заразить компьютер.";

  if (correct) score++;
}

/* Тест */
const quiz = [
  ["Если письмо требует срочно ввести пароль — это фишинг?", true],
  ["Можно ли скачивать игры с торрент-сайтов?", false],
  ["Троян маскируется под полезную программу?", true],
  ["Черви распространяются сами через сеть?", true],
  ["Шифровальщик требует выкуп за файлы?", true],
  ["Обновления системы повышают безопасность?", true],
  ["Антивирус защищает на 100%?", false],
  ["Надёжный пароль должен быть коротким?", false],
  ["Можно передавать код из SMS друзьям?", false],
  ["Фишинговый сайт может выглядеть как настоящий?", true]
];

function loadQuiz() {
  let box = document.getElementById("quizBox");
  box.innerHTML = "";

  quiz.forEach((q, i) => {
    box.innerHTML += `
      <div class="task">
        <p><b>${i + 1}. ${q[0]}</b></p>
        <button onclick="answer(${i}, true)">Да</button>
        <button onclick="answer(${i}, false)">Нет</button>
        <p id="exp${i}"></p>
      </div>
    `;
  });
}

function answer(i, choice) {
  let correct = quiz[i][1];
  let exp = document.getElementById("exp" + i);

  if (choice === correct) {
    score++;
    exp.innerText = "✅ Верно!";
  } else {
    exp.innerText = "❌ Неверно.";
  }
}

/* Результат */
function finishQuiz() {
  goTo("result");

  document.getElementById("finalText").innerText =
    `Ваш результат: ${score} баллов`;

  document.getElementById("finalTip").innerText =
    score >= 14
      ? "🔥 Отлично! Ты настоящий КиберДозор."
      : score >= 8
      ? "👍 Хорошо, но будь внимательнее."
      : "⚠ Нужно повторить теорию и пройти снова.";
}

function restart() {
  location.reload();
}

window.onload = loadQuiz;

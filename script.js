document.addEventListener("DOMContentLoaded", () => {
  // Elementos da interface
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");

  const levelSelect = document.getElementById("level-select");
  const startBtn = document.getElementById("start-btn");
  const questionTitle = document.getElementById("question-title");
  const answersList = document.getElementById("answers-list");
  const scoreSpan = document.getElementById("score");
  const totalQuestionsSpan = document.getElementById("total-questions");
  const restartBtn = document.getElementById("restart-btn");

  // Botões de ajuda
  const skipBtn = document.getElementById("skip-btn");
  const hintBtn = document.getElementById("hint-btn");

  // Perguntas por nível
  const questions = {
    facil: [
      {
        question: "Qual é a capital de Angola?",
        answers: ["Luanda", "Benguela", "Lubango", "Namibe"],
        correct: 0,
      },
      {
        question: "Quanto é 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: 1,
      },
    ],
    intermediario: [
      {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: ["Terra", "Marte", "Júpiter", "Vênus"],
        correct: 2,
      },
      {
        question: "Quem pintou a Mona Lisa?",
        answers: ["Picasso", "Van Gogh", "Da Vinci", "Michelangelo"],
        correct: 2,
      },
    ],
    dificil: [
      {
        question: "Qual é o número atômico do Carbono?",
        answers: ["6", "12", "14", "16"],
        correct: 0,
      },
      {
        question: "Quem desenvolveu a teoria da relatividade?",
        answers: ["Newton", "Einstein", "Tesla", "Darwin"],
        correct: 1,
      },
    ],
  };

  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let correctAnswers = 0;
  let skipUsed = false;
  let hintUsed = false;

  // Habilitar botão "Começar" quando o nível for selecionado
  levelSelect.addEventListener("change", () => {
    startBtn.disabled = false;
  });

  // Iniciar o jogo
  startBtn.addEventListener("click", () => {
    const selectedLevel = levelSelect.value;
    currentQuestions = questions[selectedLevel];
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    skipUsed = false;
    hintUsed = false;

    startScreen.classList.add("d-none");
    quizScreen.classList.remove("d-none");

    showQuestion();
  });

  // Mostrar pergunta atual
  function showQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionTitle.textContent = question.question;
    answersList.innerHTML = "";

    question.answers.forEach((answer, index) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = answer;
      li.addEventListener("click", () => selectAnswer(index, li));
      answersList.appendChild(li);
    });

    // Habilita as ajudas se ainda não foram usadas
    skipBtn.disabled = skipUsed;
    hintBtn.disabled = hintUsed;
  }

  // Verificar resposta
  function selectAnswer(index, selectedOption) {
    const correctAnswer = currentQuestions[currentQuestionIndex].correct;
    const allOptions = document.querySelectorAll(".list-group-item");

    // Desativa todas as opções após a seleção
    allOptions.forEach((option) => {
      option.style.pointerEvents = "none";
    });

    // Marca a opção selecionada como amarela
    selectedOption.style.backgroundColor = "yellow";

    // Após pequeno atraso, exibe o resultado
    setTimeout(() => {
      if (index === correctAnswer) {
        score += 100;
        correctAnswers++;
        selectedOption.style.backgroundColor = "green";
      } else {
        selectedOption.style.backgroundColor = "red";
        allOptions[correctAnswer].style.backgroundColor = "green"; // Marca a correta
      }

      // Próxima pergunta ou resultado
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
          showQuestion();
        } else {
          showResults();
        }
      }, 1000);
    }, 500);
  }

  // Pular questão
  skipBtn.addEventListener("click", () => {
    if (!skipUsed) {
      skipUsed = true;
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
      } else {
        showResults();
      }
    }
  });

  // Mostrar sugestão de resposta
  hintBtn.addEventListener("click", () => {
    if (!hintUsed) {
      hintUsed = true;
      const correctAnswer = currentQuestions[currentQuestionIndex].correct;
      const allOptions = document.querySelectorAll(".list-group-item");
      allOptions[correctAnswer].style.backgroundColor = "green";
    }
  });

// Mostrar resultados
function showResults() {
  quizScreen.classList.add("d-none");
  resultScreen.classList.remove("d-none");

  // Atualizar os valores do Score e Feedback
  scoreSpan.textContent = score; // Pontuação total (Score)
  document.getElementById("correct-answers").textContent = correctAnswers; // Acertos
  totalQuestionsSpan.textContent = currentQuestions.length; // Total de questões
}


  // Reiniciar o jogo
  restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("d-none");
    startScreen.classList.remove("d-none");
    startBtn.disabled = true;
    levelSelect.value = "";
  });
});

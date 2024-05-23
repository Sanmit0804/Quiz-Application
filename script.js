const questions = [
  {
    question: "Which of the following is a markup language",
    answers: [
      { text: "HTML", correct: true },
      { text: "CSS", correct: false },
      { text: "Java", correct: false },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "Which year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What does CSS stands for?",
    answers: [
      { text: "Hypertext Markup Language", correct: false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Jason Object Notation", correct: false },
      { text: "Object Oriented Programming language", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
};

const showQuestion = () => {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  // console.log(questionNo, currentQuestion.question );

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    // console.log(answer.text);
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

// const resetState = ()=>{
//   nextButton.style.display = "none";
//   while(answerButtons.firstChild)
//   {
//     answerButtons.removeChild(answerButtons.firstChild);
//   }
// }

const resetState = () => {
  nextButton.style.display = "none";
  answerButtons.innerHTML = " ";
};

const selectAnswer = (e) => {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
};

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

const showScore = () => {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
};

const handleNextButton = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
};

startQuiz();

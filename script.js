document.addEventListener("DOMContentLoaded", function() {
    /* ---------- SPLASH SCREEN ---------- */
    document.getElementById('enterBtn').addEventListener('click', function() {
      document.getElementById('splash').style.display = 'none';
      document.getElementById('main').style.display = 'block';
    });
  
    /* ---------- SCORE TRACKER ---------- */
    let score = 0;
  
    /* ---------- FLASHCARDS FUNCTIONALITY ---------- */
    const themes = [
      {
        heading: "Geography",
        cards: [
          { question: "What is the capital of France?", answer: "Paris" },
          { question: "Where is the Empire State Building located?", answer: "New York City" }
        ]
      },
      {
        heading: "Math",
        cards: [
          { question: "What is the formula that Pythagoras created?", answer: "Pythagorean theorem" },
          { question: "How many inches are in 1 foot?", answer: "12" }
        ]
      },
      {
        heading: "General Knowledge",
        cards: [
          { question: "What is the process that plants use to get energy?", answer: "Photosynthesis" }
        ]
      }
    ];
  
    let currentThemeIndex = 0;
    let currentCardIndex = 0;
    let showingQuestion = true;
  
    const themeHeading = document.getElementById("themeHeading");
    const cardContent = document.getElementById("cardContent");
    const flipBtn = document.getElementById("flipBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    function displayCard() {
      const currentTheme = themes[currentThemeIndex];
      themeHeading.textContent = currentTheme.heading;
      const flashcard = currentTheme.cards[currentCardIndex];
      cardContent.textContent = showingQuestion ? flashcard.question : flashcard.answer;
    }
  
    flipBtn.addEventListener("click", function() {
      showingQuestion = !showingQuestion;
      displayCard();
    });
  
    nextBtn.addEventListener("click", function() {
      const currentTheme = themes[currentThemeIndex];
      currentCardIndex++;
      if (currentCardIndex >= currentTheme.cards.length) {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        currentCardIndex = 0;
      }
      showingQuestion = true;
      displayCard();
    });
  
    displayCard();
  
    /* ---------- CALCULATOR FUNCTIONALITY ---------- */
    const calcDisplay = document.getElementById('display');
    const calcButtons = document.querySelectorAll('.calc-btn');
    let calcExpression = '';
  
    calcButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const value = btn.getAttribute('data-value');
        if (value === 'C') {
          calcExpression = '';
          calcDisplay.value = '';
        } else {
          calcExpression += value;
          calcDisplay.value = calcExpression;
        }
      });
    });
  
    document.getElementById('calcEquals').addEventListener('click', function() {
      try {
        const result = eval(calcExpression);
        calcDisplay.value = result;
        calcExpression = result.toString();
      } catch (e) {
        calcDisplay.value = 'Error';
        calcExpression = '';
      }
    });
  
    /* ---------- QUIZ FUNCTIONALITY ---------- */
    const quizCards = themes.flatMap(theme => theme.cards);
    const shuffledQuizCards = quizCards.sort(() => Math.random() - 0.5);
  
    let currentQuizIndex = 0;
    let totalCorrect = 0;
  
    const quizQuestionEl = document.getElementById('quizQuestion');
    const quizAnswerInput = document.getElementById('quizAnswerInput');
    const quizSubmit = document.getElementById('quizSubmit');
    const quizResultEl = document.getElementById('quizResult');
  
    // Disable copy/paste/cut
    quizAnswerInput.addEventListener('paste', e => e.preventDefault());
    quizAnswerInput.addEventListener('copy', e => e.preventDefault());
    quizAnswerInput.addEventListener('cut', e => e.preventDefault());
    quizAnswerInput.addEventListener('contextmenu', e => e.preventDefault());
  
    function loadQuizQuestion() {
      if (currentQuizIndex >= shuffledQuizCards.length) {
        quizQuestionEl.textContent = `You answered ${totalCorrect} out of ${shuffledQuizCards.length} questions correctly.`;
        quizAnswerInput.style.display = 'none';
        quizSubmit.style.display = 'none';
        return;
      }
  
      const currentQuizCard = shuffledQuizCards[currentQuizIndex];
      quizQuestionEl.textContent = currentQuizCard.question;
      quizAnswerInput.value = '';
      quizResultEl.textContent = '';
    }
  
    quizSubmit.addEventListener('click', function () {
      const currentQuizCard = shuffledQuizCards[currentQuizIndex];
      const userAnswer = quizAnswerInput.value.trim();
  
      if (userAnswer.toLowerCase() === currentQuizCard.answer.toLowerCase()) {
        quizResultEl.textContent = 'Correct!';
        totalCorrect++;
        score++;
        document.getElementById('score').textContent = score;
  
        currentQuizIndex++;
        setTimeout(() => {
          loadQuizQuestion();
        }, 1500);
      } else {
        let countdown = 4;
        quizResultEl.textContent = `Incorrect. The correct answer was: ${currentQuizCard.answer}. Please wait for the next question (${countdown}s)`;
  
        const interval = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            quizResultEl.textContent = `Incorrect. The correct answer was: ${currentQuizCard.answer}. Please wait for the next question (${countdown}s)`;
          } else {
            clearInterval(interval);
            currentQuizIndex++;
            loadQuizQuestion();
          }
        }, 1000);
      }
    });
  
    loadQuizQuestion();
  
    /* ---------- NOTES FUNCTIONALITY ---------- */
    const notesArea = document.getElementById('notesArea');
  
    // Load saved notes from localStorage
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
      notesArea.value = savedNotes;
    }
  
    // Save on input
    notesArea.addEventListener('input', function () {
      localStorage.setItem('userNotes', notesArea.value);
    });
  });
  
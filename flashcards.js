document.addEventListener("DOMContentLoaded", function() {
  // Group flashcards by theme
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
        { question: "What is the formula that pythagoras make?", answer: "pythagoream theorm" }
      ]
    },
    {
      heading: "General Knowledge",
      cards: [
        { question: "What is the process that plants use to get energy", answer: "Photosynthesis" }
      ]
    }
  ];

  let currentThemeIndex = 0;
  let currentCardIndex = 0;
  let showingQuestion = true;

  // Get references to HTML elements
  const themeHeading = document.getElementById("themeHeading");
  const cardContent = document.getElementById("cardContent");
  const flipBtn = document.getElementById("flipBtn");
  const nextBtn = document.getElementById("nextBtn");

  // Function to display the current card and update the theme heading
  function displayCard() {
    const currentTheme = themes[currentThemeIndex];
    // Update theme heading
    themeHeading.textContent = currentTheme.heading;
    const flashcard = currentTheme.cards[currentCardIndex];
    cardContent.textContent = showingQuestion ? flashcard.question : flashcard.answer;
  }

  // Flip the flashcard to show either the question or answer.
  flipBtn.addEventListener("click", function() {
    showingQuestion = !showingQuestion;
    displayCard();
  });

  // Move to the next flashcard (or theme if current theme is finished).
  nextBtn.addEventListener("click", function() {
    const currentTheme = themes[currentThemeIndex];
    currentCardIndex++;
    // If no more cards in the current theme, move to the next theme.
    if (currentCardIndex >= currentTheme.cards.length) {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      currentCardIndex = 0;
    }
    showingQuestion = true;
    displayCard();
  });

  // Display the first card on page load.
  displayCard();
});

  
document.addEventListener("DOMContentLoaded", function() {
    // Array of flashcards with a question and answer for each.
    const flashcards = [
      { question: "What is the capital of France?", answer: "Paris" },
      { question: "What is 2 + 2?", answer: "4" },
      { question: "What color is the sky?", answer: "Blue" },
      {question: "Who was "}
    ];
  
    let currentCard = 0;
    let showingQuestion = true;
  
    const cardContent = document.getElementById("cardContent");
    const flipBtn = document.getElementById("flipBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    // Function to display either the question or the answer.
    function displayCard() {
      const flashcard = flashcards[currentCard];
      cardContent.textContent = showingQuestion ? flashcard.question : flashcard.answer;
    }
  
    // Flip the flashcard to show the answer/question.
    flipBtn.addEventListener("click", function() {
      showingQuestion = !showingQuestion;
      displayCard();
    });
  
    // Move to the next flashcard.
    nextBtn.addEventListener("click", function() {
      currentCard = (currentCard + 1) % flashcards.length;
      showingQuestion = true;
      displayCard();
    });
  
    // Display the first card on page load.
    displayCard();
  });
  
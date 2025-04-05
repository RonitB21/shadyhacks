document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".calc-btn");
  
    // Append button values to the display.
    buttons.forEach(button => {
      button.addEventListener("click", function() {
        const value = this.getAttribute("data-value");
        if (value) {
          display.value += value;
        }
      });
    });
  
    // Clear display.
    document.getElementById("clear").addEventListener("click", function() {
      display.value = "";
    });
  
    // Evaluate the expression.
    document.getElementById("equals").addEventListener("click", function() {
      try {
        display.value = eval(display.value);
      } catch (e) {
        display.value = "Error";
      }
    });
  });
  
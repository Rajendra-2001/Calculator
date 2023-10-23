// Get the calculator elements
const display = document.querySelector(".calculator__display");
const buttons = document.querySelectorAll(".calculator__functions button");

// Initialize calculator variables
let currentInput = "";
let previousInput = "";
let operator = "";

// Helper function to update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Event listener for button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonValue = button.value;

        if (buttonValue === "=") {
            // Handle the "=" button to evaluate the expression
            if (currentInput && previousInput && operator) {
                currentInput = calculate(parseFloat(previousInput), operator, parseFloat(currentInput)).toString();
                previousInput = "";
                operator = "";
            }
        } else if (buttonValue === "clear") {
            // Handle the "AC" button to clear the calculator
            currentInput = "";
            previousInput = "";
            operator = "";
        } else if (buttonValue === "pos-neg") {
            // Handle the "+/-" button to toggle the sign
            if (currentInput) {
                currentInput = (-parseFloat(currentInput)).toString();
            }
        } else if (buttonValue === "%" && currentInput) {
            // Handle the "%" button to calculate a percentage
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (buttonValue.match(/[0-9\.]/)) {
            // Handle numeric and decimal point buttons
            currentInput += buttonValue;
        } else if (buttonValue.match(/[\+\-\*\/]/)) {
            // Handle operator buttons (+, -, *, /)
            if (currentInput && previousInput) {
                currentInput = calculate(parseFloat(previousInput), operator, parseFloat(currentInput)).toString();
                previousInput = "";
            }
            operator = buttonValue;
            previousInput = currentInput;
            currentInput = "";
        }

        updateDisplay();
    });
});

// Function to perform the calculation
function calculate(num1, operator, num2) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 !== 0 ? num1 / num2 : "Error";
        default:
            return "Error";
    }
}

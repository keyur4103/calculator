let displayValue = "";
let history = JSON.parse(localStorage.getItem("calculationHistory")) || [];

function clearDisplay() {
  displayValue = "";
  document.getElementById("display").value = displayValue;
}

function appendValue(value) {
  displayValue += value;
  document.getElementById("display").value = displayValue;
}

function calculate() {
  try {
    let result;
    if (displayValue.includes("%")) {
      // Handle percentage calculation separately
      const values = displayValue.split("%");
      if (values.length === 2) {
        result = parseFloat(values[0]) * (parseFloat(values[1]) / 100);
      } else {
        throw new Error("Invalid input for percentage calculation");
      }
    } else {
      // Evaluate the expression normally
      result = eval(displayValue);
    }

    document.getElementById("display").value = result;
    history.push(displayValue + " = " + result);
    localStorage.setItem("calculationHistory", JSON.stringify(history));
    updateHistoryDisplay();
  } catch (error) {
    document.getElementById("display").value = "Error";
  }
}

function updateHistoryDisplay() {
  const historySection = document.getElementById("historySection");
  historySection.innerHTML = "<h3>Calculation History:</h3>";
  history.forEach((item) => {
    const p = document.createElement("div");
    p.textContent = item;
    historySection.appendChild(p);
  });
}

function saveHistory() {
  updateHistoryDisplay();
}

window.onload = function () {
  document.getElementById("display").value = "";
};


function clearHistory() {
  history = []; 
  localStorage.removeItem("calculationHistory"); 
  updateHistoryDisplay(); 
}

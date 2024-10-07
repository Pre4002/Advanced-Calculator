let angleMode = 'rad';

function changeMode(mode) {
  angleMode = mode;
}

function insert(value) {
  document.getElementById('calc-display').value += value;
}

function clearDisplay() {
  document.getElementById('calc-display').value = '';
}

function backspace() {
  let display = document.getElementById('calc-display');
  display.value = display.value.slice(0, -1);
}

function calculate() {
  let expression = document.getElementById('calc-display').value;

  // Handling the factorial operation
  expression = expression.replace(/(\d+)!/g, function (match, num) {
    return factorial(num);
  });

  // Replace π with Math.PI
  expression = expression.replace(/π/g, Math.PI);

  // Handle square root operation
  expression = expression.replace(/sqrt\(([^)]+)\)/g, function (match, arg) {
    return Math.sqrt(eval(arg));
  });

  // Handle power operation
  expression = expression.replace(/(\d+)\^(\d+)/g, function (match, base, exponent) {
    return Math.pow(eval(base), eval(exponent));
  });

  // Handle trigonometric functions
  expression = expression.replace(/sin\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.sin(eval(arg)) : Math.sin(eval(arg) * (Math.PI / 180));
  });

  expression = expression.replace(/cos\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.cos(eval(arg)) : Math.cos(eval(arg) * (Math.PI / 180));
  });

  expression = expression.replace(/tan\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.tan(eval(arg)) : Math.tan(eval(arg) * (Math.PI / 180));
  });

  // Handle inverse trigonometric functions
  expression = expression.replace(/asin\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.asin(eval(arg)) : Math.asin(eval(arg)) * (180 / Math.PI);
  });

  expression = expression.replace(/acos\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.acos(eval(arg)) : Math.acos(eval(arg)) * (180 / Math.PI);
  });

  expression = expression.replace(/atan\(([^)]+)\)/g, function (match, arg) {
    return angleMode === 'rad' ? Math.atan(eval(arg)) : Math.atan(eval(arg)) * (180 / Math.PI);
  });

  // Evaluate the final expression
  try {
    document.getElementById('calc-display').value = eval(expression);
  } catch (error) {
    document.getElementById('calc-display').value = 'Error';
  }
}

// Function to calculate factorial
function factorial(num) {
  if (num < 0) return undefined;
  if (num === 0) return 1;
  let result = 1;
  for (let i = 1; i <= num; i++) {
    result *= i;
  }
  return result;
}

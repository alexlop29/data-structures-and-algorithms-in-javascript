/*
 Missing Digit
Have the function MissingDigit(str) take the str parameter, which will be a simple mathematical formula with three numbers,
a single operator (+, -, *, or /) and an equal sign (=) and return the digit that completes the equation.
In one of the numbers in the equation, there will be an x character, and your program should determine what digit is missing.
For example, if str is "3x + 12 = 46" then your program should output 4. The x character can appear in any of the three numbers and
all three numbers will be greater than or equal to 0 and less than or equal to 1000000.

Examples
Input: "4 - 2 = x"
Output: 2

Input: "1x0 * 12 = 1200"
Output: 0
*/

function MissingDigit(str){
  let [left, operator, right, equals, result] = str.split(" ")

  const calcHelper = (num1, num2, op) => {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  };

  const findMissingNumInString = (txt, num, op) => {
    let split = txt.split("");
    let missingIndex = split.indexOf("x");
    let value = 0;

    for (let i = 0; i <= 9; i++) {
      split[missingIndex] = i
      let joined = split.join("")
      let calculate = calcHelper(Number(joined), Number(num), op)
      if (calculate == Number(result)){
        value = i;
        break;
      }
    };

    return value;
  }

  let returned = 0;

  if (left.includes("x")){
    returned = left.length > 1 ? findMissingNumInString(left, right, operator) : calcHelper(Number(right), Number(result), operator)
  }
  else if (right.includes("x")){
    returned = right.length > 1 ? findMissingNumInString(right, left, operator) : calcHelper(Number(left), Number(result), operator)
  }
  else {
    returned = calcHelper(Number(left), Number(right), operator)
  }

  return String(returned);
}
   
// keep this function call here 
console.log(MissingDigit(readline()));

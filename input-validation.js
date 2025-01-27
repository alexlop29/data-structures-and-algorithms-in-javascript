/*
Your assignment is to write an id validator in your language of choice.
It should accept an array (unknown size) of formats, input string, and return a boolean. 
You cannot use regex or libraries.

The list of formats is retrieved from an API and is not known in advance. Here is an example of some valid formats:
1234567  // outputs to true
+1-123-456-7890 
123.456.789.ABC
1ABC234
1 AB 2345 C6D
*/

// algorithm involving hash map and sliding window
// loop through formats, develop a hashmap of sliding of consecutive chars
// e.g. 1234567 : sliding window of 7Nums
// e.g. 1ABC234: sliding window hash for this input : 1Num3Chars3Nums

// Create sliding window hash of input: 12345678 : 8Nums
// could be done in parallel - series of processes 

// check if input hash matches any computed format hash
// could be done in parallel

// store sliding window of formats as array - computedSlidingWindowOfFormats
// computedSlidingWindowOfFormats.includes(inputSlidingWindowHash)


/*
Example of inputs that would evaluate to false:
12345678 // eight consecutive digits 
+1+123+456+7890 // invalid due to plus signs ---> phone number
123+4567
(123)456-7890
1A BC234
*/

// data structure:
// class that handles multiple validations
// consecutive numbers extending eight chars
// validating phone number


// improve clean code - separate into validation functions
// function isSpecialChar(input){

// };

// function isNum(input){

// };

// function isStr(input){

// };

// format: array of valid formats
// input: string
function validate(formats, input){ // outputs boolean
    let foundMatch = false;
    let length = formats.length-1;
    let index = 0;

    while (index <= length){
      let format = formats[index];

      // check 0: check length
      if (input.length != format.length){
        index++;
        continue;
      };

      let splitInput = input.split("");
      splitInput.forEach((index, inputChar) => {
        // grab similar index char in format
        // check for -, (), . 

        let formatChar = format.charAt(index);

        // check 1: special character match
        if (formatChar.includes("-", "(", ")", ".") && !inputChar.includes("-", "(", ")", ".")){
            return; // skip - signifies mismatch
        }
        
        // check 2: numeric type
        if (typeof formatChar == "number" && typeof inputChar != "number"){
            return; // skip - signifies mismatch
        }

        // check 3: string type
        if((formatChar.charAt(0) >= 65 && formatChar.charAt(0) >= 90) && !(inputChar.charAt(0) >= 65 && inputChar.charAt(0) >= 90)){
            return; // skip signifies mismatch
        };

        foundMatch = true;
      })

      if (foundMatch) break;

      index++;
    }

    return foundMatch;
}

// tests:
// test 1: check output of isSpecialChar if input "-" : true
// test 2: checkoutput  of isSpecialChar if input "1" : false

// test 3: isNum ? input "1" return true
// test 4: isNum ? input "A" return false

// test 5: isStr ? input "A" return true
// test 6: isStr ? input "1" return false

// test 7: call to the function
console.log(validate(["1234567", "+1-123-456-7890", "123.456.789.ABC", "1ABC234", "1 AB 2345 C6D]"], "12345678"));
console.log(validate(["1234567", "+1-123-456-7890", "123.456.789.ABC", "1ABC234", "1 AB 2345 C6D]"], "1234567"));


// function isSpecialChar(input){

// };

// function isNum(input){

// };

// function isStr(input){

// };

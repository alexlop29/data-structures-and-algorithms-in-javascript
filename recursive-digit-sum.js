/*
We define super digit of an integer  using the following rules:
Given an integer, we need to find the super digit of the integer.

If  has only  digit, then its super digit is .
Otherwise, the super digit of  is equal to the super digit of the sum of the digits of .
For example, the super digit of  will be calculated as:
	super_digit(9875)   	9+8+7+5 = 29 
	super_digit(29) 	2 + 9 = 11
	super_digit(11)		1 + 1 = 2
	super_digit(2)		= 2  

Example
The number  is created by concatenating the string   times so the initial .

    superDigit(p) = superDigit(9875987598759875)
                  9+8+7+5+9+8+7+5+9+8+7+5+9+8+7+5 = 116
    superDigit(p) = superDigit(116)
                  1+1+6 = 8
    superDigit(p) = superDigit(8)
All of the digits of  sum to . The digits of  sum to .  is only one digit, so it is the super digit.

Function Description
Complete the function superDigit in the editor below. It must return the calculated super digit as an integer.
superDigit has the following parameter(s):
string n: a string representation of an integer
int k: the times to concatenate  to make 
Returns
int: the super digit of  repeated  times
Input Format
The first line contains two space separated integers,  and .
Constraints
*/

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n
 *  2. INTEGER k
 */
/*
Algorithm:
- Duplicate the string of n by k times.
- Split the string, add each of the digits. 
- If n is a single digit = return n
- If the result is between/equal 0 to 9, return the number
- If not call recursively using the new n and k=1 
*/
function superDigit(n, k) {
    let extendedN = n.repeat(k);
    console.log("extendedN", extendedN)
    
    let extendedNAsNum = Number(extendedN);
    
    // check 0: check if extendedNAsNum is a single digit
    if (extendedNAsNum >= 0 && extendedNAsNum <= 9) {
        return extendedNAsNum
    };
    
    let sum = extendedN.split("").reduce((partialSum, a) => partialSum + Number(a), 0);
    console.log("sum", sum);
    
    if (sum >= 0 && sum <= 9) {
        return sum
    };
    
    return superDigit(String(sum), 1);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = firstMultipleInput[0];

    const k = parseInt(firstMultipleInput[1], 10);

    const result = superDigit(n, k);

    ws.write(result + '\n');

    ws.end();
}

function flatten(input){
    if (!Array.isArray(input) || !input){
        throw new Error('Invalid Input Type');
    };
    return input.flat(Infinity);
};

test("Should return a flat array if the input contains a nested array", () => {
    let res = flatten([1, 2, [3, 4]]); 
    expect(res).toEqual([1, 2, 3, 4]);
});

test("Should return a flat array if the input contains a deeply nested array", () => {
    let res = flatten([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]);
    expect(res).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("Should return a flat array if a mixed type input array is provided", () => {
    let res = flatten([1, , 3, ["a", , "c"]]);
    expect(res).toEqual([1, 3, "a", "c"]);
});

test("Should return an empty array if an empty array is provided", () => {
    let res = flatten([]);
    expect(res).toEqual([]);
});

test("Should return a flat array if a flat array is provided", () => {
    let res = flatten([1, 2, 3, 4]);
    expect(res).toEqual([1, 2, 3, 4]);
});

test("Should throw error if an input string is provided", () => {
    expect(() => flatten("")).toThrow('Invalid Input Type');
});

test("Should throw error if a number input is provided", () => {
    expect(() => flatten(0)).toThrow('Invalid Input Type');
});

test("Should throw error if no input is provided", () => {
    expect(() => flatten()).toThrow('Invalid Input Type');
});

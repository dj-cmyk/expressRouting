const { mean, median, mode } = require("./app");


describe("math functions tests", function () {
    let numArray1 = [1, 2, 3, 4, 5]
    let numArray2 = [2, 2, 3, 3, 4, 4, 4]
    


    test("mean function with nums", function () {
      expect(mean(numArray1)).toEqual(3);
      expect(mean(numArray2)).toBeCloseTo(3.14); 
    });


    test("median function with nums", function () {
        expect(median(numArray1)).toEqual(3);
        expect(median(numArray2)).toEqual(3);
    });

    test("mode function", function () {
        expect(mode(numArray1)).toEqual(1);
        expect(mode(numArray2)).toEqual(4);
    })


});


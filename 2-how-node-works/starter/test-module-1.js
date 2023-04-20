// method 1: name and define a class before exporting it
class Calculator {
    add(a, b) {
        return a + b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
};

module.exports = Calculator

// // method 2: directly exporting the defination without naming the class
// module.exports = class {
//     add(a, b) {
//         return a + b;
//     }

//     multiply(a, b) {
//         return a * b;
//     }

//     divide(a, b) {
//         return a / b;
//     }
// };
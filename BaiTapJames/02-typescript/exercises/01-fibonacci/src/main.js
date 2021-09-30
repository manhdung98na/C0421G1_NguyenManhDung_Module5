function fibonacci(n) {
    if (n < 0) {
        return -1;
    }
    else if (n == 0 || n == 1) {
        return n;
    }
    else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
var sum = 0;
var i = 10;
for (var j = 1; j <= i; j++) {
    console.log(fibonacci(j));
    sum += fibonacci(j);
}
console.log("\nTổng của " + i + " số Fibonacci đầu tiên = " + sum);

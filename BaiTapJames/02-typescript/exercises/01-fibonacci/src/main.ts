function fibonacci(n: number): number {
    if (n < 0) {
        return -1;
    } else if (n == 0 || n == 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
let sum = 0;
let i = 10;
for (let j = 1; j <= i; j++){
    console.log(fibonacci(j));
    sum += fibonacci(j);
}
console.log("\nTổng của " + i + " số Fibonacci đầu tiên = " + sum);
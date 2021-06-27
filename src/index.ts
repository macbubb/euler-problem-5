const isPrime = (num: number): boolean => {
  let sqrt: number = Math.sqrt(num); //all factors of a number are <= it's square root, so don't need to check divisibility higher
  if (num === 1) return false;
  for (let j: number = 2; j <= sqrt; j++) {
    if (num % j === 0) {
      return false;
    }
  }
  return true;
};

const findPrimeFactors = (num: number): number[] => {
  //not prime, replace with prime factors
  let primeFactors: number[] = [];
  if (isPrime(num)) {
    //include case for prime numbers, number itself is the prime factor
    primeFactors.push(num);
    return primeFactors;
  }
  let sqrt: number = Math.sqrt(num); //all factors of a number are <= number's square root, this is the upper limit of possible factors
  for (let j: number = 2; j <= sqrt; j++) {
    if (num % j === 0) {
      //we have two factors, num / j and j
      //either both are prime, only num / j is prime, only j is prime, or neither are prime
      if (isPrime(num / j)) {
        //num / j is prime
        primeFactors.push(num / j); // add it to the list.
        num = j; // factor out num / j
        if (isPrime(j)) {
          // j is also prime
          primeFactors.push(j); // add j to the list
        } else {
          // j is not prime (num / j is)
          num = j; // factor out num / j
          j = 1; // start process over
          sqrt = Math.sqrt(num); // update upper limit of possible factors
        }
      } else if (isPrime(j)) {
        // num / j not prime, j is prime
        primeFactors.push(j); // add j to the list
        num = num / j; // factor out j
        j = 1; // start process over
        sqrt = Math.sqrt(num); // update upper limit of possible factors
      }
    }
  }
  primeFactors.sort((a, b) => a - b);
  return primeFactors;
};

//just want to practice writing a function type
let mathFunction: (num: number) => number;

const smallestMult = (num: number): number => {
  //key is the prime factor, value is its power
  interface factors {
    [key: number]: number;
  }
  var factorSuperset: factors = {}; //collect factors into an inclusive superset
  // for 1 - n get factor subsets and include in factor superset
  //check if digit repeats and keep count
  for (let i = 1; i <= num; i++) {
    var factorSubset: factors = {}; //each individual factor ie, 1 - n
    let term: number[] = findPrimeFactors(i); //gets array of prime factors, including repeats
    for (let j = 0; j < term.length; j++) {
      factorSubset[term[j]] = factorSubset[term[j]] + 1 || 1; //finds power of each prime factor
    }
    for (var key in factorSubset) {
      //if key does not exist in obj, add it
      if (key in factorSuperset) {
        if (factorSubset[key] > factorSuperset[key]) {
          factorSuperset[key] = factorSubset[key];
        }
      } else {
        factorSuperset[key] = factorSubset[key];
      }
      //if key does exist, check if the value is higher or lower, only add if higher
    }
  }
  let smallestCommonMultiple: number = 1;
  for (key in factorSuperset) {
    smallestCommonMultiple *= Math.pow(Number(key), factorSuperset[key]);
  }
  return smallestCommonMultiple;
};
function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}

function handleClick(): void {
  let n: number = Number(document.getElementById("n").value);
  let answer: number = smallestMult(n);
  let prettyAnswer: string = separator(answer);
  document.getElementById("result").innerHTML = `<h2>${prettyAnswer}</h2>`;
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleClick, false);

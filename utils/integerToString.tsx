export default function numberToWords(num:number): string {
  if (num === 0) return "zero";

  const belowTwenty = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];

  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const thousands = [
    "", "thousand", "million", "billion", "trillion", "quadrillion", 
    "quintillion", "sextillion", "septillion", "octillion", "nonillion"
  ];

  function convertChunk(n: number): string {
    if (n === 0) return "";
    else if (n < 20) return belowTwenty[n] + " ";
    else if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + belowTwenty[n % 10] : "") + " ";
    else return belowTwenty[Math.floor(n / 100)] + " hundred " + convertChunk(n % 100);
  }

  let word = "";
  let chunkIndex = 0;

  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      word = convertChunk(chunk) + (thousands[chunkIndex] ? thousands[chunkIndex] + " " : "") + word;
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }

  return word.trim().toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
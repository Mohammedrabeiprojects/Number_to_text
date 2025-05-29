var nums = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen"
];
var tens = [
  "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
];
var types = [
  "", "Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion",
  "Sextillion", "Septillion", "Octillion", "Nonillion", "Decillion", "Undecillion",
  "Duodecillion", "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion",
  "Septendecillion", "Octodecillion", "Novemdecillion", "Vigintillion", "Googol"
];
var number = "";

function convert(num) {
    if (num === "0") {
    number = "Zero";
    return;
  }
  if (num.length > 66 && num[0] !== "-") {
    number = "The number is too large!";
    return;
  }
  if (num.length > 67 && num[0] === "-") {
    number = "The number is too small!";
    return;
  }
  let minus = false;
  while (num[0] === "-" || num[0] === "+") {
    if (num[0] === "-") minus = true;
    num = num.slice(1);
  }
  num = num.replace(/^0+/, "");
  if (num === "") {
    number = "Zero";
    return;
  }
  let groups = [];
  while (num.length > 0) {
    groups.push(num.slice(-3));
    num = num.slice(0, -3);
  }
  let words = [];
  for (let i = 0; i < groups.length; i++) {
    let chunk = parseInt(groups[i], 10);
    if (chunk === 0) continue;   

    let parts = [];
    if (chunk >= 100) {
      let h = Math.floor(chunk / 100);
      parts.push(nums[h] + " Hundred");
      chunk %= 100;
    }
    if (chunk < 20 && chunk > 0) {
      parts.push(nums[chunk]);
    } else if (chunk >= 20) {
      let t = Math.floor(chunk / 10);
      let o = chunk % 10;
      parts.push(tens[t]);
      if (o) parts.push(nums[o]);
    }
    parts.push(types[i]);

    words.unshift(parts.join(" "));
  }

  number += (minus ? "Minus " : "") + words.join(" ").trim();
}

function enter() {
  number="";
  var inp = document.getElementById("number-input").value;
  let count=0;
  let can=true;
  let ind=-1;
  for(let i=0;i<inp.length;i++){
    let c=inp[i];
    if(inp[i]==='.'){
      count++;
      ind=i;
    }
    else if(c!='1' && c!='2' && c!='3'&& c!='4' && c!='5' && c!='6'&& c!='7'&& c!='8'&& c!='9' && c!='0' && c!='-' ){
      can=false;
      break;
    }
  }
  if(count>1 || !can){

      document.getElementById("output").innerText = "Enter a vaild number";
  }
  if(count){
    convert(inp.slice(0,ind));
    number+=" Point ";
    for(let i=ind+1;i<inp.length;i++){
    if (inp[i] === '0') {
    number += "Zero ";
    } else {
    number +=" "+ nums[parseInt(inp[i])]+" ";
  }
    }
    document.getElementById("output").innerText = number;
    return ; 
  }
  convert(inp);
  document.getElementById("output").innerText = number;
}

// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');
const reco = document.getElementById('reco');

const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 }

  ];

 var TransactionData = null;

/*
// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const deposit_item = document.createElement('li');

  deposit_item.classList.add('plus');
  deposit_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
    transaction.deposit  
  )}</span> 
  `;

  list.appendChild(deposit_item);

  const loan_item = document.createElement('li');

  loan_item.classList.add('minus');
  loan_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    transaction.loan  
  )}</span> 
  `;

  list.appendChild(loan_item);
}
*/

function addTransactionDOM(transaction) {
  const balance_item = document.createElement('li');

  if(transaction.deposit >= transaction.loan){
  balance_item.classList.add('plus');
  balance_item.innerHTML = `
  ${transaction.customername}-${transaction.bank}  <span> $ ${Math.abs(
    transaction.deposit - transaction.loan  
  )}</span> 
  `;}

  else{balance_item.classList.add('minus');
  balance_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
    transaction.deposit - transaction.loan  
  )}</span> 
  `;}

  list.appendChild(balance_item);

}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit);
  const loans = TransactionData.map(transaction => transaction.loan);
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const bal = total_deposit - total_loan;
  if(bal >= 0){
       balance.innerText = `$${bal}`;}
  else{balance.innerText = `-$${Math.abs(bal)}`;}
 
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";

  const data = [{name: 'D', val: total_deposit},
                {name: 'L', val: total_loan}
               ];

const svg = d3.select("svg"),
width = svg.attr("width"),
height = svg.attr("height"),
radius = Math.min(width, height) / 2;
g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const color = d3.scaleOrdinal([
'green', 'red'
]);

const pie = d3.pie().value(function(d) { 
return d.val; 
});

const path = d3.arc()
.outerRadius(radius - 10).innerRadius(0);

const label = d3.arc()
.outerRadius(radius).innerRadius(radius-150);


/*   if (error) {
throw error;
}
*/  
const arc = g.selectAll(".arc")
.data(pie(data))
.enter()
.append("g")
.attr("class", "arc");


arc.append("path")
.attr("d", path)
.attr("stroke", "white")
.attr("fill", function(d,i) { return color(i); });

console.log(arc);

arc.append("text")
.attr("transform", function(d) { 
return "translate(" + label.centroid(d) + ")"; 
})
.text(function(d) { return d.data.name+": $"+Math.abs(d.data.val)/1000+"K"; });


svg.append("g")
.attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
.append("text")
.text("Deposit(D) and Loan(L) Breakdown")
.style("fill","#5739ee")
.attr("class", "title");

}  //this is ternary operator for binary condition

function init() {
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll];
  TransactionData.forEach(addTransactionDOM);
  updateValues();
}

function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername == custname.value);  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

init();
form.addEventListener('submit', filterTransaction);

//b1.addEventListener('click',filterTransaction);


const price = 3.26;
const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

purchaseBtn.addEventListener("click", () => {
  if (Number(cashInput.value) < price) {
    alert("Customer does not have enough money to purchase the item");
    cashInput.value = "";
    return;
  } else if (Number(cashInput.value) === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    cashInput.value = "";
    return;
  }

  const cidObject = Object.fromEntries(cid);
  let change = Number(cashInput.value) - price;
  let reversedCid = [...cid].reverse();
  changeDue.textContent = "Status: OPEN ";
  let totalCID = parseFloat(
    Object.values(cidObject)
      .reduce((acc, val) => acc + val, 0)
      .toFixed(2)
  );

  let changeList = [];
  const currencyUnit = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.1,
    QUARTER: 0.25,
    ONE: 1,
    FIVE: 5,
    TEN: 10,
    TWENTY: 20,
    "ONE HUNDRED": 100,
  };
  const denoms = Object.values(currencyUnit).reverse();

  if (totalCID < change) {
    return (changeDue.textContent = "Status: INSUFFICIENT_FUNDS");
  }

  if (totalCID === change) {
    changeDue.textContent = "Status: CLOSED";
  }

  for (let i = 0; i <= reversedCid.length; i++) {
    if (change > denoms[i] && change > 0) {
      let count = 0;
      let total = reversedCid[i][1];
      while (total > 0 && change >= denoms[i]) {
        total -= denoms[i];
        change = parseFloat((change -= denoms[i]).toFixed(2));
        count++;
      }

      if (count > 0) {
        changeList.push([reversedCid[i][0], count * denoms[i]]);
      }
    }
  }

  if (change > 0) {
    return (changeDue.textContent = "Status: INSUFFICIENT_FUNDS");
  }
  changeList.map(
    (money) => (changeDue.textContent += `${money[0]}: $${money[1]} `)
  );
});

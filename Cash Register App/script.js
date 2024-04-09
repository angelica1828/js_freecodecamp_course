const price = 3.26;
const cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
const cidObject = Object.fromEntries(cid);
let sumOfValues = cid.reduce((acc, [, value]) => acc + value, 0);

const face_vals = {
    100: "ONE HUNDRED",
    20: "TWENTY",
    10: "TEN",
    5: "FIVE",
    1: "ONE",
    0.25: "QUARTER",
    0.1: "DIME",
    0.05: "NICKEL",
    0.01: "PENNY"
};

const counts = {
    "ONE HUNDRED": 0,
    "TWENTY": 0,
    "TEN": 0,
    "FIVE": 0,
    "ONE": 0,
    "QUARTER": 0,
    "DIME": 0,
    "NICKEL": 0,
    "PENNY": 0
};

const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

const checkPrice = () => {
    const cash = parseFloat(document.getElementById("cash").value);
    if (cash < price) {
        alert("Customer does not have enough money to purchase the item.");
        return;
    } else if (cash === price) {
        changeDue.textContent = "No change due - customer paid with exact cash";
        return;
    }

    let diff = (cash - price).toFixed(2);

    let fin = "Status: ";

    if (sumOfValues < diff) {
        fin = "Status: INSUFFICIENT_FUNDS";
    } else {
        sumOfValues -= diff
        for (const val of Object.keys(face_vals).map(parseFloat).sort((a, b) => b - a)) {
            while (diff >= val && cidObject[face_vals[val]] > 0) {
                counts[face_vals[val]] += val;
                counts[face_vals[val]] = parseFloat(counts[face_vals[val]].toFixed(2));
                diff -= val;
                diff = parseFloat(diff.toFixed(2));
                cidObject[face_vals[val]] -= val;
            }
        }
        if (diff > 0) {
            fin = "Status: INSUFFICIENT_FUNDS";
        } else {
            if (sumOfValues === 0) {
                fin += "CLOSED ";
            } else {
                fin += "OPEN ";
            }
            Object.entries(counts).forEach(([key, value]) => {
                if (value !== 0) {
                    fin += `${key}: $${value} `;
                }
            });
        }
    }

    changeDue.innerHTML = `<p>${fin}</p>`;
};

purchaseBtn.addEventListener("click", checkPrice);

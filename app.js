const readLine = require("readline");

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const accountA = {
  name: "John Doe",
  balance: 0,
  pin: "123456",
  cardNumber: "1234 5678 1234 5678",
  transactions: [],
};

const accountB = {
  name: "Jane Doe",
  balance: 0,
  pin: "654321",
  cardNumber: "5678 1234 5678 1234",
  transactions: [],
};

const accounts = [accountA, accountB];

function validateCardNumber(cardNumber) { 
  return accounts.find((account) => account.cardNumber === cardNumber);
}

function validatePin(cardNumber, pin) {
  account = validateCardNumber(cardNumber)
  if (account) {
    return account.pin === pin ? account : false;
  } else {
    return false;
  }
}


function checkBalance() { }
function deposit() { }
function viewTransactions() { }

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  let currentAccount;
  let choice;

  do {
    console.log("Menu ATM:");
    console.log("1. Cek Saldo");
    console.log("2. Setor Tunai");
    console.log("3. Riwayat Transaksi");
    console.log("4. Keluar");

    choice = await askQuestion("Masukkan pilihan Anda: ");

    switch (parseInt(choice)) {
      case 1:
        const cardNumber = await askQuestion("Masukkan nomor kartu: ");
        currentAccount = validateCardNumber(cardNumber);
        if (currentAccount) {
          console.log("=================");
          console.log("Selamat datang, ", currentAccount.name);
          console.log("-----------------");
          console.log("saldo anda saat ini", +checkBalance(currentAccount));
        } else console.log("nomor kartu tidak ditemukan");
        console.log("=================");
        break;
      default:
        console.log("Pilihan tidak valid");
    }
  } while (choice !== 4);
}

main();

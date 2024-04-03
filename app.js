const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const accountA = {
  name: 'John Doe',
  balance: 0,
  pin: '123456',
  cardNumber: '1234 5678 1234 5678',
  transactions: [],
};

const accountB = {
  name: 'Jane Doe',
  balance: 0,
  pin: '654321',
  cardNumber: '5678 1234 5678 1234',
  transactions: [],
};

const accounts = [accountA, accountB];

function validateCardNumber() {}
function validatePin() {}
function checkBalance() {}
function deposit() {}
function viewTransactions() {
  console.log("Riwayat Transaksi");

  if (currentAccount.transactions.length === 0) {
    console.log("Belum ada transaksi");

  } else {
    currentAccount.transactions.forEach((transactions, index) => {
      console.log(
       `${index + 1}. ${transactions.type}" Rp ${transactions.amount}`
      );
      
    });
  }

}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  do {
    console.log('Menu ATM:');
    console.log('1. Cek Saldo');
    console.log('2. Setor Tunai');
    console.log('3. Riwayat Transaksi');
    console.log('4. Keluar');

    choice = await askQuestion('Masukkan pilihan Anda: ');

    switch (parseInt(choice)) {
      case 1:
        break;
    }
  } while (choice !== 4);
}

main();

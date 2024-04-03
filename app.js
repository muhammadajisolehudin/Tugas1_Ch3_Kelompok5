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

//muhammad aji solehudin
function deposit(account, jumlah) {
  account.balance += jumlah;
  account.transactions.push({ type: 'deposit', amount: jumlah, date: new Date() });
  return `Deposit berhasil dilakukan. Saldo: ${account.balance}`;
}

function viewTransactions() {}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  //penampung akun aktif
  let active_account;
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
      
      case 2:
        if (!active_account) {
          console.log('Silakan masukkan nomor kartu:');
          const cardNumber = await askQuestion('Nomor Kartu: ');
          active_account = validateCardNumber(cardNumber);
          if (!active_account) {
            console.log('Nomor kartu tidak valid.');
          } else {
            const pin = await askQuestion('Masukkan PIN: ');
            if (!validatePin(active_account, pin)) {
              console.log('PIN salah.');
              active_account = undefined;
            }
          }
        }

        if (active_account) {
          const jumlah = parseFloat(await askQuestion('Masukkan jumlah uang yang ingin Anda setorkan: '));
          console.log(deposit(active_account, jumlah));
        }
        break;
    }
  } while (choice !== 4);
}

main();

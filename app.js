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
  let account = validateCardNumber(cardNumber)
  if (account) {
    return account.pin === pin ? account : false;
  } else {
    return false;
  }
}


function checkBalance(currentAccount) { 
  console.log(`Saldo Anda saat ini adalah: ${currentAccount.balance}`)
}


function deposit(currentAccount, jumlah) {
  currentAccount.balance += jumlah;
  currentAccount.transactions.push({ type: 'deposit', amount: jumlah, date: new Date() });
  return `Deposit berhasil dilakukan. Saldo: ${currentAccount.balance}`;
}

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
        

        if (!currentAccount) {
          const cardNumber = await askQuestion("Masukkan nomor kartu: ");
          currentAccount = validateCardNumber(cardNumber);
          console.log("=================");
          console.log("Selamat datang, ", currentAccount.name);
          console.log("-----------------");
          if (!currentAccount) {
            console.log("nomor kartu tidak ditemukan");
            console.log("=================");
          } else {
            const pin = await askQuestion('Masukkan PIN: ');
            if (!validatePin(currentAccount.cardNumber, pin)) {
              console.log('PIN salah.');
              currentAccount = undefined;
            }
          }
        }

        if (currentAccount) {
          console.log("=================");
          checkBalance(currentAccount);
        } 
        break;
      
      case 2:
        if (!currentAccount) {
          console.log('Silakan masukkan nomor kartu:');
          const cardNumber = await askQuestion('Nomor Kartu: ');
          currentAccount = validateCardNumber(cardNumber);
          if (!currentAccount) {
            console.log('Nomor kartu tidak valid.');
          } else {
            const pin = await askQuestion('Masukkan PIN: ');
            if (!validatePin(currentAccount, pin)) {
              console.log('PIN salah.');
              currentAccount = undefined;
            }
          }
        }

        if (currentAccount) {
          console.log("=================");
          const jumlah = parseFloat(await askQuestion('Masukkan jumlah uang yang ingin Anda setorkan: '));
          console.log(deposit(currentAccount, jumlah));
        }
        break;
        
      default:
        console.log("Pilihan tidak valid");
    }
  } while (choice !== 4);
}

main();
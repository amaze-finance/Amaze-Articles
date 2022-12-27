# Forking test

## Что такое форкинг тестирование

Локальное копирование любой блокчейн сети на любом блоке в прошлом с возможностью производить любые манипуляции, получать владение над любыми кошельками и тестировать любые гипетозы.

## Основные пункты такого тестирования

В конфиге добавляем следующий кусок кода

```java script
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/AtVUj7BSbemKccob5NbWlGufZdyIxrOW",
      },
      accounts: {
        count: 200,
        //accountsBalance: ethers.utils.parseEther('10000').toString(),
      }
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    }, 
```

В самих тестах при помощи подобной конструкции мы можем получать владение (отправлять транзакции от лица) абсолютно над любым адресом, даже над контрактом

```java script
    const user3_address = "put address here";
    await helpers.impersonateAccount(user3_address);
    const user3 = await ethers.getSigner(user3_address);
```

## Далее все тесты будут выглядеть аналогично тестам на локальном блокчейн

команды в терминал 

npx hardhat node --fork указываем url сети для форка
npx hardhat test --network localhost


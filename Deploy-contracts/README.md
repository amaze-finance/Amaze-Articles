## Deploy contracts

   Данный репозиторий показывает каким образом можно деплоить контракты в `blockchain` используюя фреймворк `hardhat`.
      
      В данном примере деплоился контракт Lock в тестовую сеть `goerli` с помощью скрипта `deploy.js`


## ***Разбор скрипта***
1. Данная строка получает контракт Lock, для этого после `getContractFactory` метода нужно указать имя контракта.

```java script
    const Lock = await ethers.getContractFactory("Lock");
```

2. Данная строка как раз таки деплоит контракт Lock и после метода `deploy`, нужно указать все аргументы передаваемые в конструктор контракта.
```java script
    const lock = await Lock.deploy(21600);
```
    
3. Данная строка позволяет подождать 5 confirmations от блокчейна, это время нужно для того чтобы байт код контракта был успешно получен блокчейном.
```java script
    await lock.deployTransaction.wait(5)
```
      Для того чтобы запустить данный скрипт нужно установить фреймворк hardhat и запустить в терминале скрипт :
      
      `npx hardhat run scripts/deploy.js --network goerli`
      
   

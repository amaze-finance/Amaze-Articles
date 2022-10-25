# Testing Factory

    Данная статья облегчит тестирование паттерна Фабрика, используя только hardhat и сопутсвующие библиотеки


## ***Принцип работы тестирования***
1. Создаем новый контракт используя функцию `deposit` контракта `router`
```javascript
    let TX = await router.deposit
```
   (в скобках указываем параметры вызова функции `deposit`)


2. Проверка что транзакция создания контракта прошла
```javascript
    let receipt = await TX.wait();
    console.log("...create Token action (gas spent: %s)...\n\n", receipt.gasUsed);
```
    
3. Получаем адрес нового контракта через метод контракта, который хранит адреса новых созданных контрактов (mapping)
```javascript
    let addresses = await router.tokens(mock.address);
```
      
4. Получаем новый контракт через метод `attach`, `Token` - это ABI всех создаваемых контрактов нашей фабрикой (получается путем деплоя первой версии шаблона контрактов для фабрики) 
```javascript
    const Mocktoken = await Token.attach(addresses);
```

5. Теперь имеем возможность полноценно использовать функции нового созданного контракта по имени `Mocktoken`
```javascript
    expect(await Mocktoken.balanceOf(user1.address)).to.equal(ether("50"));
```
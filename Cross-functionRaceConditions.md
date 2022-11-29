# Cross-function Race Conditions
Злоумышленник также может быть в состоянии осуществить подобную атаку, используя две различные функции, которые имеют одно и то же состояние.
``` solidity
// INSECURE
mapping (address => uint) private userBalances;

function transfer(address to, uint amount) {
    if (userBalances[msg.sender] >= amount) {
       userBalances[to] += amount;
       userBalances[msg.sender] -= amount;
    }
}

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    require(msg.sender.call.value(amountToWithdraw)()); // At this point, the caller's code is executed, and can call transfer()
    userBalances[msg.sender] = 0;
}
```
В данном случае злоумышленник вызывает `transfer()`, когда его код выполняется на внешнем вызове в `withdrawBalance`. Поскольку их баланс еще не установлен в 0, они могут перевести токены, даже если они уже получили вывод средств. Эта уязвимость также использовалась в атаке DAO.

Те же решения будут работать, с теми же предостережениями. Также обратите внимание, что в данном примере обе функции были частью одного контракта. Однако одна и та же ошибка может возникнуть в нескольких контрактах, если эти контракты имеют общее состояние.

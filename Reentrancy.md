### Reentrancy
Первая замеченная версия этой ошибки была связана с функциями, которые могли вызываться многократно, до завершения первого вызова функции. Это может привести к разрушительному взаимодействию различных вызовов функции.

``` solidity 
// INSECURE
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    require(msg.sender.call.value(amountToWithdraw)()); // At this point, the caller's code is executed, and can call withdrawBalance again
    userBalances[msg.sender] = 0;
}
```

Поскольку баланс пользователя не устанавливается на 0 до самого конца функции, второе (и последующие) вызовы все равно будут успешными и будут снимать баланс снова и снова. Очень похожая ошибка была одним из уязвимых мест в атаке DAO.
В приведенном примере лучшим способом избежать проблемы является использование `send()` вместо `call.value()()`. Это предотвратит выполнение любого внешнего кода.
Однако если вы не можете удалить внешний вызов, то следующий простейший способ предотвратить эту атаку - убедиться, что вы не вызываете внешнюю функцию, пока не выполните всю необходимую внутреннюю работу:

``` solidity
mapping (address => uint) private userBalances;

function withdrawBalance() public {
    uint amountToWithdraw = userBalances[msg.sender];
    userBalances[msg.sender] = 0;
    require(msg.sender.call.value(amountToWithdraw)()); // The user's balance is already 0, so future invocations won't withdraw anything
}
```

Обратите внимание, что если бы у вас была другая функция, вызывающая `withdrawBalance()`, она была бы потенциально подвержена той же атаке, поэтому вы должны рассматривать любую функцию, вызывающую недоверенный контракт, как недоверенную. Дальнейшее обсуждение возможных решений см. ниже.

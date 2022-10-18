**Call vs Delegatecall**

Функции **call** и **delegatecall**, их главное отличие в том, что последняя вообще не изменяет контекст *msg.*
```solidity
contract Called {
  event callEvent(address sender, address origin, address from);
  function callMe() public {
    emit callEvent(msg.sender, tx.origin, address(this));
  }
}

contract Caller {
  function makeCalls(address _contractAddress) public {   
    address(_contractAddress).call(abi.encodeWithSignature("callMe()"));
    address(_contractAddress).delegatecall(abi.encodeWithSignature("callMe()"));
  }
}
```
Когда контракт Caller выполнил функцию Called's *callMe()*, используя *call* .

При **call**:

*sender* - контракт Caller.
*origin* - счет, который отправил транзакцию для выполнения Caller.makeCalls.
*from* - это контракт Called.

*origin* - это всегда EOA (Externally Owned Account), *msg.sender* - это адрес, с которого вызывается определенная функция, а *this* (*from*, в логах) - это контракт, на который вы ссылаетесь.

Вызов в контракте другого контракта через *call*:

```solidity

import "../MetariumGames.sol";

contract TestContractCalls {
    MetariumGames metariumGames;

    constructor (address _metariumGames) public {
        metariumGames = MetariumGames(payable(_metariumGames));
    }

    function callRegisterWithReferrer(address _referrer) public payable {
        metariumGames.registerWithReferrer{value: msg.value}(_referrer);
    }

    function callBuyLevel(uint8 _level) public payable {
        metariumGames.buyLevel{value: msg.value}(_level);
    }
}
```

При **delegatecall**:

*sender* - это EOA.
*origin* - также EOA.
*from* - контракт Caller, вместо Called (контракт, который на самом деле испускает событие).

То есть, когда вызывается функция другого контракта с помощью *delegatecall*, она фактически наследует контекст выполнения контракта, который выполняет вызов, в данном случае Caller.
Контекст будет вести себя так, как будто вы скопировали и вставили функцию *callMe()* в контракт Caller.

Заключение
*call* и *delegatecall* - это гибкие, но и опасные способы взаимодействия с другими контрактами, должны использовать их с осторожностью. Они оба являются "слепыми" вызовами функции и могут подвергнуть контракт рискам безопасности.

Основное различие между ними заключается в том, что в то время как *call* просто выполняет функцию в контексте контракта, в котором она была определена, *delegatecall* наследует контекст выполнения, что означает, что функция будет вести себя так, как она была определена в контракте, который использует *delegatecall*.

# Structs in Solidity

   Мы можем обращаться с `struct` подобными типами значений, чтобы их удобно можно было использовать в `array` и `mapping`.


## ***Принцип работы с типом данных `struct`***
1. Структура `Account` - хранит параметры типа `uint`: `balance` и `dailylimit`
```solidity
    struct Account {
    uint balance;
    uint dailylimit;
}
```
2. Обращение к переменной в структуре происходит с помощью `.` и имени переменной структуры.

```solidity
    mapping (uint256 => Account) public accounts;
    accounts[1].balance = new_balance; 
}
```

3. Три способа изменения параметров структуры:

Первый способ

```solidity
    Instructor memory instructor = instructors[_address];
    instructor.age = _age;
    instructor.first_name = _first_name;
    instructor.last_name = _last_name;
    instructorAccounts.push(_address) — 1;
```

Второй способ

```solidity
    instructors[_address] = Instructor(
        {
            age: _age,
            first_name: _first_name,
            last_name: _last_name
        }
    );
```

Третий способ

```solidity
    instructors[_address] = Instructor(_age, _first_name, _last_name);
    instructorAccounts.push(_address) — 1;
```

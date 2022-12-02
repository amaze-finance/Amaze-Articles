### Timestamp Dependence

Временная метка блока может манипулироваться майнером, поэтому следует учитывать все прямые и косвенные способы использования временной метки. Номера блоков и среднее время блока можно использовать для оценки времени, но это не является доказательством будущего, так как время блока может измениться.
``` solidity
uint someVariable = now + 1;

if (now % 2 == 0) { // the now can be manipulated by the miner

}

if ((someVariable - 100) % 2 == 0) { // someVariable can be manipulated by the miner

}
```

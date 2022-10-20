# Текущее время

```javaScript
async function getLatestBlockTimestamp() {
    return (await ethers.provider.getBlock("latest")).timestamp || 0 // берет время последнего блока или возвращает 0
}
```
# Перемотка времени
Импортируем

```javaScript
import {network} from "hardhat"
```
Установить время следующего блока
```javaScript
await network.provider.send("evm_setNextBlockTimestamp", [timestamp]) // выставляет время в timestamp
await network.provider.send("evm_increaseTime", [TIME]) // прибавляет к текущему времени TIME
```
После того как время следующего блока выставлено, нужно смайнить блок (если его не смайнить, то время выставится при ближайшей отправленной транзакции)
```javaScript
await network.provider.send("evm_mine") // майним блок
```
Итого можно сократить до:
```javaScript
async function skipTimeTo(timestamp: number) {
    await network.provider.send("evm_setNextBlockTimestamp", [timestamp])
    await network.provider.send("evm_mine")
}
```

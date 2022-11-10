MerkleProof.sol из контрактов Openzeppelin - отличный способ для доказательства достоверности данных. Итак, давайте посмотрим, как он реализован:

`verifyCalldata` принимает само доказательство в виде массива *bytes32*, хэш корня Merkle и лист, который мы хотим проверить на включение. Обычно корнем являются данные, которые вы храните в смарт-контракте, а доказательством - данные, созданные кем-то вне цепочки, доказывающие контракту, что лист был частью исходного дерева.

Итак, теперь `processProofCalldata` будет перебирать каждый элемент массива доказательств. 

Мы начинаем с узла листа.
Затем на каждом шаге мы обновляем наш вычисленный хэш, хэшируя его со следующим элементом доказательства.
При хэшировании обоих хэшей вместе меньшее значение всегда будет первым.
Openzeppelin использует ассемблер с опкодом *keccak256* для более эффективного хэширования. В качестве альтернативы можно использовать Solidity: `keccak256(abi.encodePacked(a, b))`.
Мы возвращаем вычисленный хэш.

Затем в `verifyCalldata` мы просто проверяем, что вычисленный хэш совпадает с ожидаемым корневым хэшем.

``` solidity
function verifyCalldata(
    bytes32[] calldata proof,
    bytes32 root,
    bytes32 leaf
) internal pure returns (bool) {
    return processProofCalldata(proof, leaf) == root;
}

function processProofCalldata(
    bytes32[] calldata proof,
    bytes32 leaf,
) internal pure returns (bytes32) {
    bytes32 computedHash = leaf;
    for (uint256 i = 0; i < proof.length; i++) {
        computedHash = _hashPair(computedHash, proof[i]);
    }
    return computedHash;
}

function _hashPair(bytes32 a, bytes32 b)
    private
    pure
    returns(bytes32)
{
    return a < b ? _efficientHash(a, b) : _efficientHash(b, a);
}

function _efficientHash(bytes32 a, bytes32 b)
    private
    pure
    returns (bytes32 value)
{
    assembly {
        mstore(0x00, a)
        mstore(0x20, b)
        value := keccak256(0x00, 0x40)
    }
}
```

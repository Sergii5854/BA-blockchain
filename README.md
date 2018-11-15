# BlockChain

## Task
```
Фаза 1:
Реалізувати самі базові фічі блокчейну - створити блок, підкріпити його валідність базовим майнингом (proof of work), перевірити чи чейн валідний.
На 1 блок - 1 операція (транзакція).

Приклад інтерфейсу:
Chain.isValid - перевіря чи весь чейн валідний, в тому числі всі блоки
Chain.mineAndAddBlock(дані) - створює, майнить та додає новий блок в чейн

Можна одразу підлаштовувати код під задачу пересилки валюти бо це сама проста предметна область.

Фаза 2:
Робота з приватними та публічними ключами, підпис транзакцій сигнатурою, прорахування балансу для пуб. ключа.

В цьому випадку в метод mineAndAddBlock потрапляють не тільки дані, а й signature - сигнатура, що створена на основі прив. ключ
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

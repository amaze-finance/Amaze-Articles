# Что такое шардинг?
Шардинг – это стратегия масштабирования приложений. В рамках шардинга информация из общей базы данных делится на блоки и распределяется по разным серверам, которые и называются шардами. Процесс использования этой стратегии называется шардированием. Иногда можно встретить термин партиционирование – это часть шардинга. Так называется процесс разделения базы данных, перед выносом на отдельные сервера.

Шардинг данных разделяют на вертикальный и горизонтальный. Это связано с тем, что база данных изначально представляла собой таблицу. Если разделять таблицу на вертикальные столбцы (заголовок и все данные под ним), то это вертикальный шардинг. Если разделять таблицу по строкам (заголовки всех столбцов и части таблицы под ней), то это горизонтальный шардинг. В любом случае потом части таблицы (то есть базы данных) отправляются на разные сервера.

# Зачем применять шардинг?
Рано или поздно приложения, которые развиваются, сталкиваются с проблемой масштабирования. Это случается, когда текущий сервер базы данных уже не может так же быстро и эффективно справляться с нагрузкой и давать ответ на запросы приложения. Тогда базу данных и делят на части, отправляя на разные шарды. Также совместно с шардингом часто используют репликацию. В этом случае сервера (шарды) получают копии самих себя. Это повышает отказоустойчивость системы.

# Сложности реализации блокчейн-шардинга:
Не существует механизма, отслеживающего какая нода обрабатывает какую транзакцию. Нужен безопасный и эффективный механизм, который будет безопасно и быстро работать в блокчейне.

Не разработан алгоритм доверия между нодами, чтобы они могли доверять друг другу. В криптовалютном блокчейне ноды не имеют права просто доверять друг другу – они должны приходить к независимому консенсусу. Также нужно подтверждение того, что обе ноды закончили процесс обработки.

Эффективно применять шардинг можно в блокчейнах с алгоритмом proof-of-stake (полным или частичным), а сейчас с проблемой масштабирования сталкиваются в основном криптовалюты с алгоритмом proof-of-work.

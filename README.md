# GenesisTestTask
Genesis Test Task

[Task link](https://docs.google.com/document/d/1QTSccSVClOelzkwxrvPFZBcYCGx2rkDMolWw1Rz3gV8/edit)

Перед стартом проекта - вы можете запустить базу данных в docker-compose - дабы не возиться с ее настройкой и прописыванием прав и доступов.
(Проект тоже планировалось поместить в docker-compose - но там он собирается дольше - но если есть желание можете попробвать)

``docker-compose up``

``cd api/``

Установка зависимостей

``yarn install``

``yarn global add typescript typeorm``

Накатывание миграций

``yarn run typeorm migration:run``

Загрузка данных с провайдера

``node src/script/LoadData.js``

Начало работы

``yarn run start``


[Коллекция PostMan](https://www.getpostman.com/collections/87dbb5b37680deb4236b)

``date format - yyyy-mm-dd (2020-10-14)``

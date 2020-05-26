**# Node + Express + MongoDB template

Заготовка для создания проектов на связке Express + MongoDB

## System Requirements

    Docker and docker-compose
    
## Install docker

    sudo apt update
    sudo apt install docker.io docker-compose

## Порядок работы

1. Клонируем репозиторий с шаблоном в директорию с проектом

   ```git clone https://gitlab.qbex.io/sandbox/express-mongo-docker```

2. Переходим в директорию проекта
   
   ```cd express-mongo-docker```

4. Запускаем сервис Node + Express + MongoDB в фоновом режиме
   
   ```sudo docker-compose up -d```

После выполнения данной команды приложение будет доступно по адресу **localhost:9000**, а база данных по адресу **localhost:27017**

## Рабочие моменты

1. При внесении изменений в код приложения сервис api перезапускается автоматически
2. После того как были установлены/удалены npm пакеты нужно пересобрать контейнер api:
   
   ```docker-compose build api && docker-compose restart api```


## База данных

Для базы данных создаётся отдельный volume. Данные находящиеся в контейнере дублируются на жетский диск хоста.
Месторасположение базы данных можно узнать командой:

```docker volume inspect "${PWD##*/}"_db```

Путь к базе данных содержит значение по ключу **"Mountpoint"**

## Дополнительные возможности

1. migrate-mongo - пакет для создания миграций для MongoDB. 
   1. https://github.com/seppevs/migrate-mongo#readme
   2. http://isizov.ru/migratsii-mongodb/
2. mongoose-seed - пакет для создания сидов для MongoDB
   1. https://github.com/seanemmer/mongoose-seed#readme**

## Возможные трудности

1. При запуске сервиса через docker-compose express api доступно по порту **9000**, а MongoDB по порту **27017**. При старте сервиса возможна ошибка в случае если на хосте заняты данные порты - либо уже работает express приложение, либо установленная локально MongoDB. Есть два возможных решения данной проблемы:
   1. Остановить локально установленную MongoDB и все приложения которые слушают порт 9000
   2. Поменять порты в docker-compose.yml. Изменять нужно значение находящееся слева от двоеточия которое находится в секции **ports**
   
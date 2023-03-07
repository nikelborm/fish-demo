# Fish demo

## Requirements and initialization

If you don't have vs code, search for commands in `./project.code-workspace`

1. Install docker, docker-compose, buildx
2. Install node.js 16 with nvm. [NVM GitHub](https://github.com/nvm-sh/nvm)
3. Install yarn with `npm i -g yarn`
4. Call task in VS code: `Create new docker builder` (call only once when pulling project)
5. Call task in VS code: `Use docker builder` (call only once when pulling project)
6. Call task in VS code: `Install yarn dependencies` (call only once when pulling project)

## Development

If you plan to develop and use own fs

1. Call task in VS code for better typing support: `Mount types/shared in native fs`.
2. Call task in VS code: `Up dev`

If you want to develop inside a container

1. Call command in VS code: `Dev containers: Reopen in container`

## How to run psql

1. Call task in VS code: `psql dev`

## Endpoint to execute mock

<http://localhost/api/mock/execute?mockScriptName=mockReservoirAndAllInternals>

## sensor auth flow

один инстанс датчика -- один процесс, который держит один веб сокет канал до бэкенда

https://github.com/protobufjs/protobuf.js/issues/689

в первый раз мы руками генерим токен, подписанный ключом сервера, который содержит инфу
1. айди инстанса датчика
2. какой текстовый код параметра какому SensorParameterInstance id соответствует, чтобы когда датчик захотел отправить новую инфу, он сразу слал её по правильному SensorParameterInstance id
3. какой параметр какой тип данных имеет (чтобы сервер для проведения валидации значений этих параметров просто так не ходил бесполезно в бд)


TODO: нахуярить транзитивных mtm зависимостей во всё что связано с показаниями датчиков

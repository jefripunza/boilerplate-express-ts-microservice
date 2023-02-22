# :rocket: Boilerplate - Microservice

saya membuat standar ini bertujuan untuk mempercepat dan meningkatkan efisiensi aplikasi sehingga waktu dan kualitas aplikasi akan lebih meningkat

## :paperclip: Menu

-   :bulb: [Features](#bulb-features)
-   :hammer: [Project Setup](#hammer-project-setup)
-   :bug: [Known Bugs](https://github.com/jefripunza/boilerplate-express-ts-microservice/issues)

---

## :bulb: Features

| Package         | link                                                                        | deskripsi                                  |
| --------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| typescript      | [doc](https://www.typescriptlang.org/ "Typescript Homepage")                | bahasa yang digunakan                      |
| express.js      | [doc](https://expressjs.com/ "Express.js Homepage")                         | server yang digunakan                      |
| jwt             | [doc](https://jwt.io/ "JSON Web Token Homepage")                            | keamanan auth                              |
| swagger         | [doc](https://swagger.io/ "Swagger Homepage")                               | membuat dokumentasi endpoint (auto)        |
| node-cron       | [doc](https://www.npmjs.com/package/node-cron "Node Cron Homepage")         | membuat scheduler                          |
| knex.js         | [doc](https://knexjs.org/ "Knex.js Homepage")                               | orm atau query builder                     |
| redis           | [doc](https://redis.io/ "Redis Homepage")                                   | database cache                             |
| rabbit mq       | [doc](https://www.rabbitmq.com/ "RabbitMQ Homepage")                        | membuat antrian (queue)                    |
| husky           | [doc](https://www.npmjs.com/package/husky "Husky Homepage")                 | penjagaan code sebelum push git            |
| jest            | [doc](https://jestjs.io/ "Jest Homepage")                                   | framework untuk unit testing               |
| eslint          | [doc](https://eslint.org/ "Eslint Homepage")                                | analisa code untuk menghindari conflic     |
| axios           | [doc](https://axios-http.com/docs/intro "Axios Homepage")                   | untuk komunikasi antar service             |
| cookie-parser   | [doc](https://www.npmjs.com/package/cookie-parser "Cookie Parser Homepage") | management cookie antara client dan server |
| helmet          | [doc](https://www.npmjs.com/package/helmet "Helmet Homepage")               | menjaga segala keamanan (standar)          |
| joi             | [doc](https://joi.dev/ "Joi Homepage")                                      | data validator (penjagaan request data)    |
| morgan          | [doc](https://www.npmjs.com/package/morgan "Morgan Homepage")               | HTTP request logger middleware             |
| moment-timezone | [doc](https://momentjs.com/timezone/ "Moment Timezone Homepage")            | tampilkan tanggal di zona waktu server     |

<br/>

## :hammer: Project Setup

1. masuk ke dalam **VSCode** dan arahkan ke **folder project baru** yang kamu buat
2. clone repository `git clone https://github.com/jefripunza/boilerplate-express-ts-microservice.git .`

   **Note** : menggunakan **.** (titik) agar semua isi file masuk kedalam folder baru yang anda buat sebelumnya

3. install dependencies `npm install` or `yarn install` or `yarn`
4. pasang husky **(wajib)** `npm run prepare` or `yarn prepare`

   **Note** : husky digunakan untuk penjagaan kode sebelum di push ke git (seperti sonar)

5. jalan kan secara development `npm run dev` or `yarn dev`

<br/>

## 💫 License

-   Code and Contributions have **MIT License**

_Copyright (c) 2023 [Jefri Herdi Triyanto](http://github.com/jefripunza "My Github") ([@jefripunza](https://instagram.com/jefripunza "My Instagram"))_

cp .env.sample .env
createdb sticker-mania
npm install
knex migrate:latest
knex seed:run

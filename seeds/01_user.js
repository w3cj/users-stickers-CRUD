exports.seed = (knex, Promise) => {
    return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 3')
      .then(() => {
        const users = [
          {
            id: 1,
            email: 'berto.ort@gmail.com',
            password: 'pineapple',
            created_at: new Date()
          },
          {
            id: 2,
            email: 'hello@cjr.co.de',
            password: 'keyboard_cat',
            created_at: new Date()
          }
        ]
        return knex('user').insert(users)
      })
};

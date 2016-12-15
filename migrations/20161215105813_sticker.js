
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sticker', table => {
    table.increments();
    table.text('image_url').notNullable();
    table.text('description').notNullable();
    table.integer('quantity').notNullable().defaultTo(0);
    table.text('size');
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sticker');
};

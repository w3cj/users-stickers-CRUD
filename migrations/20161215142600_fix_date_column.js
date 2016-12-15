
exports.up = function(knex, Promise) {
  return knex.schema.table('user', table => {
    table.dropColumn('date');
    table.datetime('created_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', table => {
    table.dropColumn('created_at');
    table.datetime('date');
  });
};

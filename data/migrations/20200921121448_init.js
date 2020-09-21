
exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments('id');

      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 256).notNullable();
      tbl.string("email", 256).notNullable().unique().index();

      tbl.timestamp("created_at", {useTz: true}).defaultTo(knex.fn.now())
    })
    
    .createTable("favorites", tbl => {
        tbl.primary(["user_id", "track_id"])

        tbl.string("track_id", 64).notNullable()
        tbl.integer("user_id").notNullable()
          .references("users.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE")

        tbl.timestamp("created_at", {useTz: true}).defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('users');
};

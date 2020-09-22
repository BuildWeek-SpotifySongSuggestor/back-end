const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    update,
    remove,
    get,
};


function get(user_id) {
  return db('favorites')
    .where({ user_id: user_id });
}

function insert(track) {
  return db('favorites')
    .insert(track)
    .then(ids => {
      return get(ids[0]);
    });
}

function update(id, changes) {
  return db('favorites')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('favorites')
    .where({ id })
    .del();
}
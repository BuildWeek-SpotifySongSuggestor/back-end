const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    update,
    remove,
    get,
};


function get(id) {
  return db('favorites').where({ id }).first()
}

function insert(track) {
  return db('favorites')
    .insert(track)
    .then(ids => {
      return get(ids[0]);
    });
}

function update(track_id, changes) {
  return db('favorites')
    .where({ track_id })
    .update(changes)
}

function remove(track_id) {
  return db('favorites')
    .where({ track_id })
    .del();
}
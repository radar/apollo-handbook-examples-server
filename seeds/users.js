
exports.seed = function(knex) {
  knex('users').del();

  return knex('users').insert([
    {id: 1, username: 'badboy', suspension_reason: 'bad to the bone'},
    {id: 2, username: 'goodie-goodie'},
  ]);
};

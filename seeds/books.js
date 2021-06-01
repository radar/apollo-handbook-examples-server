
exports.seed = function(knex) {
  // Deletes ALL existing entries
  knex('books').del();

  return knex('books').insert([
    {id: 1, title: 'The Apollo Handbook'},
    {id: 2, title: 'Active Rails'},
    {id: 3, title: 'Learning React'}
  ]);
};

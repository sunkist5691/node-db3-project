// scheme-model

const db = require('../data/db-config')

module.exports = {
   find,
   findById,
   findSteps,
   add,
   addStep,
   update,
   remove
}

function find(){
   return db('schemes')
}

function findById(id){
   return db('schemes')
      .where({ id })
      .first()
}

function findSteps(id){
   return db('schemes as sc')
      // select everything schemes
      .join('steps as st', 'sc.id', 'st.scheme_id')
      // select denominator schemes and steps using id
      .select('sc.id', 'scheme_name', 'step_number', 'instructions')
      // render id, name, number, instructions only
      .where({ 'sc.id': id })
      // retrieve only selected id
}

function add(data){
   return db('schemes')
      .insert(data)
      .then(([id]) => {
         return findById(id)
      })
}

function addStep(data, schemeId){
   return db('steps')
      .insert(data)
      .then(() => {
         return findSteps(schemeId)
      })
      
}

function update(changes, id){
   return db('schemes')
      .where({ id }) // this is important to sort which specific item
      .update(changes)
      .then(() => {
         return findById(id)
      })
}

function remove(id){
   return db('schemes')
      .where({ id })
      .del()
}

/* 

{ 
   id: 17, 
   scheme_name: 'Find the Holy Grail', 
   step_number: 1, 
   instructions: 'quest'
}

*/
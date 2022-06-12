const knex= require('knex')

module.exports=knex({
    client:'postgres',
    connection:{
        host:'localhost',
        user:'postgres',
        password:'postgres',
        database:'postgres',
        port:'4321'
    }
})
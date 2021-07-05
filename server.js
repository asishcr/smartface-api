const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app =express();
const knex = require('knex')
const register = require('./controllers/register');
const login = require('./controllers/login');
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'aratheendran',
      password : '',
      database : 'smartface'
    }
  });

app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{
    res.send(database.users)
})

app.post('/login',(req,res)=> {login.loginHandler(req,res,db,bcrypt)})

app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})

app.put('/image',(req,res) =>{
    const {id} = req.body;
        db('users').where('id','=',id)
        .increment('entries',1)
        .returning('entries')
        .then(entries =>{
            res.json(entries[0])
        })
        .catch(err=>res.status(400).json(err))
    })

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    db.select('*').from('users').where({
        id:id
    })
    .then(user =>{
        if (user.length) {
            res.json(user[0])
        }
        else{
            res.status(400).json('not found')
        }
    })
    .catch(err=>res.status(400).json(err))
})

app.listen(3001,()=>{
    console.log('app is running on port 3001')
})



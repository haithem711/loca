//mongodb+srv://haithem:<password>@chira.zcooo.mongodb.net/<dbname>?retryWrites=true&w=majority
const express=require('express')
const app =express()
const bodyParser=require('body-parser')
const mongoose=require ('mongoose')
const auth=require('./routes/auth')
const user=require('./routes/user')
const annonce=require('./routes/annonce')
const contact=require('./routes/contact')
const port=process.env.PORT||5000
const {MONGOURI}=require('./config/keys')


//connect DB

mongoose.connect(MONGOURI,{useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
    if(err){console.log({error:'error connect to database'})}
    console.log('Database connected')
})
//middlwares
app.use(bodyParser.json())
app.use(('/api'),auth)
app.use(('/api'),user)
app.use(('/api'),annonce)
app.use(('/api'),contact)
//connect server


app.listen(port,(err)=>{
    if (err){console.log({error:'erro connect to server'})}
    console.log('server connected')
})

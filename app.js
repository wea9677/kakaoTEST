const express = require('express');
const passport = require('passport');
const authRouter = require('./routes/auth')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const PORT = 8080




const app = express();


app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


/**
 * 세션 세팅
 */
 const configureSession = require('./passport/session')
 configureSession(app)
 
 /**
  * passport 세팅
  */
 const configurePassport = require('./passport/kakaoStrategy')(app)
 configurePassport(passport)

 /**
 * Routing
 */

app.use('/auth', authRouter)








app.get('/', (req, res) => {
    res.status(200).render('index');
});







app.listen(PORT, function(){
    console.log('server on! http://localhost:'+ PORT);
  });
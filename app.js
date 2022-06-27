const express = require('express');

const passportConfig = require('passport');
const kakaoRouter = require('./routes/kakao');
const path = require('path');


const PORT = 8080




const app = express();
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use('/api', express.urlencoded({ extended: false }), [ 
    kakaoRouter ]);




app.get('/', (req, res) => {
    res.status(200).render('index');
});







app.listen(PORT, function(){
    console.log('server on! http://localhost:'+ PORT);
  });
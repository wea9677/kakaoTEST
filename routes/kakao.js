require('dotenv').config()
const express = require('express')
const User = require('../schemas/user')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middlewares/auth-middleware')
// const upload = require('../S3/s3')
// const Joi = require('joi')
// const user_validation = require('../vaildation/user.val')

router.get('/kakao', passport.authenticate('kakao'))

const kakaoCallback = (req, res, next) => {
    passport.authenticate(
        'kakao',
        { failureRedirect: '/' },
        (err, user, info) => {
            if (err) return next(err)
            console.log('콜백~~~')
            const userInfo = user
            const { userId } = user
            const token = jwt.sign({ userId }, process.env.MY_KEY)

            result = {
                token,
                userInfo,
            }
            console.log('카카오 콜백 함수 결과', result)
            res.send({ user: result })
        }
    )(req, res, next)
}

router.get('/oauth/callback/kakao', kakaoCallback)
module.exports = router;

//* 구글로 로그인하기 라우터 ***********************
// router.get(
//     '/google',
//     passport.authenticate('google', {
//         scope: ['profile'],
//         // access_Type: 'offline',
//         // approval_Prompt: 'force',
//     })
// )


// var express = require('express');
// var router = express.Router();
// const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token"
// const KAKAO_GRANT_TYPE="authorization_code"
// const KAKAO_CLIENT_id="2bef121601512c9fc2c5526ddc3dd920"
// const KAKAO_REDIRECT_URL="http://localhost:3000/oauth/callback/kakao"

// router.get('/kakao/code', function (req, res, next) {
//         let code = req.query.code;
//         try{
//             axios.post(
//                 `${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`
//                 , {
//                  headers: {
//                     'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
//                 }
//             }).then((result)=>{
//                 console.log(result.data['access_token'])
//                 // 토큰을 활용한 로직을 적어주면된다.
    
//             }).catch(e=> {
//                 console.log(e)
//                 res.send(e);
//             })
//         }catch(e){
//             console.log(e)
//             res.send(e);
//         }
// })
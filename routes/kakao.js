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

router.get('/callback/kakao', kakaoCallback)

//* 구글로 로그인하기 라우터 ***********************
// router.get(
//     '/google',
//     passport.authenticate('google', {
//         scope: ['profile'],
//         // access_Type: 'offline',
//         // approval_Prompt: 'force',
//     })
// )
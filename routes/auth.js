const express = require('express')
const passport = require('passport')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.get('/login/kakao', passport.authenticate('kakao'))
router.get('/login/kakao/callback',passport.authenticate('kakao',{
    failureRedirect : '/auth/login'}),(req,res)=>{
    console.log('callback login from kakao', req.user)    
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      req.logout()
      res.redirect('/')
    })
})



module.exports = router;
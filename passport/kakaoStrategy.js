const KakaoStrategy = require('passport-kakao').Strategy

module.exports = (app) => (passport) => {
   app.use(passport.initialize())
   app.use(passport.session())


  
  /**
   * Serialize
   */
   passport.serializeUser((user, done) => {
      console.log('serialize user', user)
      done(null, user) // user 객체가 deseriallizeUser로 전달
    })
  


  /**
   * Deserialize
   */
  passport.deserializeUser((user, done) => {
   console.log('deserialize user', user)
   done(null, user) // 여기서 전달되는 user 가 req.user
 })

/**
   * Kakao Strategy
   */
 passport.use(
   new KakaoStrategy(
     {
       clientID: process.env['KAKAO_CLIENT_ID'],
       
       callbackURL: process.env['KAKAO_CALL_BACK_URL'],
     },
     function (accessToken, refreshToken, profile, cb) {
       console.log('accessToken', accessToken)
       console.log('refreshToken', refreshToken)
       console.log('profile', profile)
       return cb(null, profile)
     }
   )
 )


}

import multer from "multer";
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import routes from "./routes";

import mainModel from './models/mainModel'

const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "instagram Clone";
    res.locals.routes = routes;
    //로그인 여부
    res.locals.isLogin = req.isAuthenticated()
    //로그인 유저 정보
    if(req.isAuthenticated()){
      res.locals.user = req.session.passport.user
    }
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect(routes.home);
    } else {
      next();
    }
};
  
export const onlyPrivate = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect(routes.home);
    }
};

export const uploadAvatar = multerAvatar.single("profile_img");

export const passportMiddleware = (req, res, next) => {
  const Strategy = LocalStrategy.Strategy
  const authData = req.body

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
      done(null, id);
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) =>{
    const hashPassword = crypto.createHash('sha512').update(`${email}@${password}`).digest('base64');

    mainModel.login(email)
    .then(([row]) => {
      const { idx,email,nickname,password } = row[0]
      // 비밀번호 확인
      if(hashPassword === password ){
        console.log('비밀번호 확인')
        return done(null, {idx,email,nickname});
      }else {
        console.log('비밀번호 틀림')
        return done(null, false, { message: '비밀번호가 틀렸습니다' })
      }
  })
  .catch((e) => {
      console.log(e)
  })
  }))
  next();
}
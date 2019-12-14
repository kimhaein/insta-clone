
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
      console.log(req.session.passport)
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

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id, done) {
      done(null, id);
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },(email, password, done) =>{
    const hashPassword = crypto.createHash('sha512').update(`${email}@${password}`).digest('base64');
    mainModel.login(email)
    .then(([row]) => {
      // 비밀번호 확인
      if(row.length > 0){
        console.log('기존유저')
        const { idx,email,nickname,password } = row[0]
        if(hashPassword === password ){
          console.log('로그인 성공')
          return done(null, {idx,email,nickname});
        }else {
          console.log('비밀번호 틀림')
          return done(null, false)
        }
      }else {
        console.log('비유저')
        return done(null, false)
      }
    })
    .catch((e) => {
      return done(e);
    })
  }))
  next();
}
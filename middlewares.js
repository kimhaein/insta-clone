
import multer from "multer";
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import routes from "./routes";

import mainModel from './models/mainModel'

const multerAvatar = multer({ dest: "uploads/avatars/" });
const multerContnent = multer({ dest: "uploads/contents/" });

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

// 비로그인 사용자만 접근 가능
export const onlyPublic = (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect(routes.HOME);
    } else {
      next();
    }
};

// 로그인 사용자만 접근 가능
export const onlyLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(routes.HOME);
  }
};

// 로그인한 당사자만 접근 가능
export const onlyPrivate = (req, res, next) => {
  const { id } = req.params
  const { user } = req.session.passport

  const email = req.body.email || req.query.email

  if (req.isAuthenticated() && (user.idx === +id || user.email === email)) {
    next();
  } else {
    res.redirect(routes.HOME);
  }
};

export const uploadAvatar = multerAvatar.single("profile_img");
export const uploadContent = multerContnent.single("content_img");

export const passportMiddleware = (req, res, next) => {
  const Strategy = LocalStrategy.Strategy

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
      done(null, user);
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
        const { idx,email,nickname,password,profile_img } = row[0]
        if(hashPassword === password ){
          return done(null, {idx,email,nickname,profile_img});
        }else {
          return done(null, false, req.flash('loginMessage', '아이디 혹은 비밀번호를 확인해주세요'))
        }
      }else {
        return done(null, false, req.flash('loginMessage', '아이디 혹은 비밀번호를 확인해주세요'))
      }
    })
    .catch((e) => {
      return done(e);
    })
  }))
  next();
}
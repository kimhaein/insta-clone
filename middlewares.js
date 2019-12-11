
import multer from "multer";
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import routes from "./routes";

import globalModel from './models/globalModel'

const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "instagram Clone";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const isAuth = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
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
    done(null, authData.email);
  });

  passport.deserializeUser(function (id, done) {
      done(null, authData);
  });

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) =>{
    const hashPassword = crypto.createHash('sha512').update(`${email}@${password}`).digest('base64');

    globalModel.login(email)
    .then(([row]) => {
      const { password } = row[0]
      // 비밀번호 확인
      if(hashPassword === password ){
        console.log('비밀번호 확인')
        return done(null, authData);
      }else {
        console.log('비밀번호 틀림')
        return done(null, false, { message: '비밀번호가 틀렸습니다' })
      }
  })
  .catch((e) => {
      console.log(e)
  })
    console.log(44,email,password)
      // if (username === authData.email) {
      //     if (password === authData.password) {
      //         return done(null, authData, {
      //             message: 'Welcome.'
      //         });
      //     } else {
      //         return done(null, false, {
      //             message: 'Incorrect password.'
      //         });
      //     }
      // } else {
      //     return done(null, false, {
      //         message: 'Incorrect username.'
      //     });
      // }
  }
  ));
  next();
}
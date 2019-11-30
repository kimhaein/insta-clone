
import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "instagram Clone";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
      res.redirect(routes.home);
    } else {
      next();
    }
};
  
export const onlyPrivate = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect(routes.home);
    }
};
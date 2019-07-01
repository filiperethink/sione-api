import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../modules/User/model';
import constants from '../config/constants';

const localOpts = {
  usernameField: 'email',
};

const localLogin = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false);
    }

    if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

// JWT Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localLogin);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });

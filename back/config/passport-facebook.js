const passport = require("passport");
const { facebookAppKey, facebookCode } = require("./config");

const { User } = require("../models/index");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: facebookAppKey,
      clientSecret: facebookCode,
      callbackURL: "http://localhost:3001/api/auth/facebook/callback",
    },
    function (_accessToken, _refreshToken, profile, done) {
      User.findOrCreate({ where: { provider_id: profile.id } })
        .then((user) => {
          if (user !== null) {
            done(null, user);
          } else {
            User.create({
              provider: profile.provider,
              provider_id: profile.id,
              userName: profile.displayName,
              userEmail: profile.emails[0].value,
              imgProfile: profile.photos[0].value,
              facebookLog: true,
            }).then(() => {
              res.send("CREADO");
            });
          }
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

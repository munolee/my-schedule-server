import passport from 'passport';
import passportLocal from 'passport-local';
import { MongoClient } from 'mongodb';

const LocalStrategy = passportLocal.Strategy;
const client = new MongoClient(process.env.MONGO_URI);

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false,
      },
      async (id, pw, done) => {
        try {
          const user = await client.db('schedule').collection('user');

          // 가입된 회원인지 아닌지 확인
          const exUser = await user.findOne({ id: id });
          // 만일 가입된 회원이면
          if (exUser) {
            if (pw === exUser.pw) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //
            }
          } else {
            // DB에 해당 id가 없다면, 회원 가입 한적이 없다.
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

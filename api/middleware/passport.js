// // const User = require("../models/users");
// // // const { SECRET } = require("../../");
// // const { Strategy, ExtractJwt } = require("passport-jwt");
// // const { SECRET } = require("../config/config");

// // const opts = {
// //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //   secretOrKey: SECRET
// // };

// // module.exports = passport => {
// //   passport.use(
// //     new Strategy(opts, async (payload, done) => {
// //       await User.findById(payload.user_id)
// //         .then(user => {
// //           if (user) {
// //             return done(null, user);
// //           }
// //           return done(null, false);
// //         })
// //         .catch(err => {
// //           return done(null, false);
// //         });
// //     })
// //   );
// // };


// const User = require("../models/users");
// const { SECRET } = require("../config/config");
// const { Strategy, ExtractJwt } = require("passport-jwt");

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: SECRET
// };

// console.log('opts token', opts)

// module.exports = passport => {
//   passport.use(
//     new Strategy(opts, async (payload, done) => {
//       await User.findById(payload.user_id)
//         .then(user => {
//           if (user) {
//             return done(null, user);
//             // return  console.log('user token', user)
            
//           }
//           return done(null, false);
//         })
//         .catch(err => {
//           return done(null, false);
//           // return  console.log('user token err', err)
//         });
//     })
//   );
// };

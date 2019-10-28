// module.exports = {
//   mongoURI: process.env.MONGO_URI,
//   secretOrKey: process.env.SECRET_OR_KEY
// };

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  awsSecretAccess: process.env.AWS_SECRET_ACCESS,
  awsAccessKey: process.env.AWS_ACCESS_KEY
};
module.exports = {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/btp_db',
    SECRET_KEY: 'secret',
    PORT: process.env.PORT || 5000
  };
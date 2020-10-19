module.exports = {
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/btp_db',
    PORT: process.env.PORT || 5000,
    SECRET_KEY: 'secret',
    newsApiKey: 'e72f2023fa894d99944fb610c2fc31dd'
  };
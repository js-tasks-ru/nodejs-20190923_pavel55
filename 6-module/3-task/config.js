module.exports = {
  mongodb: {
    uri: (process.env.NODE_ENV === 'test'
      ? 'mongodb://localhost:27017/6-module-3-task'
      : 'mongodb://localhost:27017/local'),
  },
};

'use strict';

module.exports = (Post) => {
  const getAllPosts = async (skip, limit) => Post.find({ skip, limit });

  Post.getAllPosts = getAllPosts;

  Post.remoteMethod('getAllPosts', {
    accepts: [
      {
        arg: 'skip',
        type: 'number',
        required: true,
      },
      {
        arg: 'limit',
        type: 'number',
        required: true,
      },
    ],
    returns: {
      type: 'array',
      root: true,
    },
    http: {
      path: '/getAllPosts',
      verb: 'get',
    },
  });
};

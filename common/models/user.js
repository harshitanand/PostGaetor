'use strict';

module.exports = (User) => {
  const modifyUserRole = async (data) => {
    const { email, roleName } = data;
    if (!email) return { message: 'email not provided' };

    const [user, role] = await Promise.all([User.findOne({ email }), Role.create({ name: roleName })]);

    await role.principals.create({ principalType: RoleMapping.USER, principalId: user.id });
    return 'success';
  };

  User.modifyRole = modifyUserRole;

  User.remoteMethod('modifyRole', {
    description: 'Modify User Role',
    accepts: [
      {
        arg: 'data',
        type: 'object',
        required: 'true',
      },
    ],
    returns: {
      arg: 'message',
      type: 'string',
      root: true,
    },
    http: {
      verb: 'post',
      path: '/modifyRole',
    },
  });
};

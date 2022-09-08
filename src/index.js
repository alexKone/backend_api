'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const { toEntityResponse } = strapi.plugin("graphql").service("format").returnTypes;
    const extensionService = strapi.plugin('graphql').service('extension');
    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendInputType({
          type: 'UsersPermissionsRegisterInput',
          definition(t) {
            t.string('gender')
            t.date('birthdate')
          }
        }),
        nexus.extendType({
          type: 'UsersPermissionsMe',
          definition(t) {
            t.field('profile', {
              type: 'ProfileEntityResponse',
              resolve: async (root, args) => {
                const userData = await strapi.db.query('plugin::users-permissions.user').findOne({
                  select: [],
                  where: { id: root.id },
                  populate: { profile: true }
                });
                return toEntityResponse(userData.profile, {
                  args,
                  resourceUID: 'api::profile.profile'
                });
              }
            })
          }
        })
      ]
    }))
  },

  bootstrap(/*{ strapi }*/) {}
};

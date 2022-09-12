module.exports = {
  async afterCreate(event) {
    return await strapi.entityService.create('api::profile.profile', {
      data: {
        birthdate: new Date(event.params.data.birthdate).toISOString(),
        gender: event.params.data.gender,
        firstname: event.params.data.firstname || '',
        lastname: event.params.data.lastname || '',
        // address: address.id,
        user: event.result.id
      }
    });
  },
  afterUpdate(event) {
    console.log('afterUpdate');
  }
}

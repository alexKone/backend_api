module.exports = {
  async afterCreate(event) {
    const profile = await strapi.entityService.create('api::profile.profile', {
      data: {
        birthdate: new Date(event.params.data.birthdate).toISOString(),
        gender: event.params.data.gender,
        // address: address.id,
        user: event.result.id
      }
    });
  },
  afterUpdate(event) {
    console.log('afterUpdate');
  }
}

import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    starred: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    history: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    user: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    stared: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    history: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});

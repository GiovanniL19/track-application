export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    toStations: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    fromStations: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    starredJourneys: {
      serialize: 'ids',
      deserialize: 'ids'
    },
    journeyHistory: {
      serialize: 'ids',
      deserialize: 'ids'
    }
  }
});

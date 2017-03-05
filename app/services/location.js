import Ember from 'ember';

export default Ember.Service.extend({
  geolocation: Ember.inject.service(),
  longitude: null,
  latitude: null,
  fromStation: null,
  toStation: null,
  showResults: true,

  getLocation: function() {
    let controller = this;
    //If not on device
    this.get('geolocation').getLocation().then(function (geo) {
      controller.set("longitude", geo.coords.longitude);
      controller.set("latitude", geo.coords.latitude);
    });

    //If on device
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
    function onSuccess(position) {
      controller.set("longitude", position.coords.longitude);
      controller.set("latitude", position.coords.latitude);
    };

    function onError(error) {
      console.log(error);
    }
  }
});

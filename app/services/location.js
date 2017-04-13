import Ember from 'ember';

export default Ember.Service.extend({
  geolocation: Ember.inject.service(),
  longitude: null,
  latitude: null,
  fromStation: null,
  toStation: null,
  showResults: true,
  done: false,

  init() {
    this._super(...arguments);
  },

  getLocation: function() {
    this.set("done", false);
    //If not on device
    this.get('geolocation').getLocation().then(function (geo) {
      this.set("longitude", geo.coords.longitude);
      this.set("latitude", geo.coords.latitude);
      this.set("done", true);
    }.bind(this));

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      try {
        let controller = this;
        //If on device
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy: true});
        function onSuccess(position) {
          controller.set("longitude", position.coords.longitude);
          controller.set("latitude", position.coords.latitude);
          controller.set("done", true);
        }

        function onError(error) {
          console.log(error);
        }
      }catch(ignored){}
    }
  }
});

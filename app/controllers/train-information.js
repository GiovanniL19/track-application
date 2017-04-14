import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  train: Ember.inject.service(),
  actions:{
    buyTicket(){
      window.open("http://ojp.nationalrail.co.uk/service/timesandfares/"+this.get("train.userOriginCRS")+"/"+this.get("train.userDestinationCRS")+"/today/"+moment(new Date()).format("HHmm")+"/dep");
    },
    back(){
      history.back();
    }
  }
});

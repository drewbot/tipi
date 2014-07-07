App = Ember.Application.create();

// App Adapter 
///////////////// Should understand that new model instances should save to the host url

// App.ApplicationAdapter = DS.RESTAdapter.extend({
//   host: 'http://tiny-pizza-server.herokuapp.com/collections/ember-practice'
// });

/////////// Attempting to change _id to id /////////

// App.ApplicationSerializer = DS.RESTSerializer.extend({
//   primaryKey: "_id"
// });

/////////// Attempting to change _id to id /////////
App.Adapter = DS.RESTAdapter.extend({
  host: 'http://tiny-pizza-server.herokuapp.com/collections/ember-practice',
  serializer: DS.RESTSerializer.extend({
    primaryKey: function (type){
      return '_id';
   }
  })
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'App.Adapter'
});
//////////////////////////////////////////////////////

/// Routers

App.Router.map(function(){
	this.resource('new');
	this.resource('draft', {path: ':draft_id'});
	this.resource('queue');
});

/// Routes

App.Route = Ember.Route.extend({
	model: function(){
		return $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/ember-practice')
	}
});

App.DraftRoute = Ember.Route.extend({
	model: function(params){
		return $.getJSON('http://tiny-pizza-server.herokuapp.com/collections/ember-practice/'+params.draft_id+'')
	}
});

/// Models

var attr = DS.attr;

App.Project = DS.Model.extend({
  property_id: attr('number'),
  title: attr('string'),
  description: attr('string'),
  body: attr('string'),
  saved: attr('boolean'),
  isCompleted: DS.attr('boolean')
  
})

App.User = DS.Model.extend({
    email: DS.attr('string'),
    name: DS.attr('string'),
});


/////////// New Controller ///////////////////////////

App.NewController = Ember.ObjectController.extend({
 
 actions :{
    save : function(){
        var title = $('#title').val();
        var description = $('#description').val();
        var body = $('#body').val();
        var submittedOn = new Date();
        var store = this.get('store');
        var project = store.createRecord('project',{ // I think that "store" may be messing me up here
            title : title,
            description : description,
            body : body,
            submittedOn : submittedOn
        });
        project.save();
        this.transitionToRoute('draft');
    }
 }
});

/////////// Draft Controller ///////////////////////////

App.DraftController = Ember.ObjectController.extend({
	isEditing: false,

	actions: {
		edit: function(){
			this.set('isEditing', true);
		},

		doneEditing: function(){
			this.set('isEditing', false);
		}
	}
})

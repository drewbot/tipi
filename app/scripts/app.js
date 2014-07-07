App = Ember.Application.create();

// App Adapter 
///////////////// Should understand that new model instances should save to the host url

// App.ApplicationAdapter = DS.RESTAdapter.extend({
//   host: 'http://tiny-pizza-server.herokuapp.com/collections/ember-practice'
// });

// ///////// Attempting to change _id to id /////////

App.ApplicationSerializer = DS.RESTSerializer.extend({
  primaryKey: "_id"
});

// App.adapter is being used below instead of App.ApplicationAdapter and 
// App.ApplicationSerializer above. Not sure if it will effect adversely when
// working correctly because both throw the same errors and don't do what they're supposed to

/////////// Attempting to change _id to id /////////

DS.RESTAdapter.reopen({
  host: 'http://tiny-pizza-server.herokuapp.com',
  namespace: 'ember-collections'
});

App.Adapter = DS.RESTAdapter;

App.ApplicationStore = DS.Store.extend({
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
		return $.getJSON('http://tiny-pizza-server.herokuapp.com/ember-collections/projects')
	}
	// model: function() {
	//     return this.store.find('project'); // Error while loading route: Error: No model was found for '0'
	// }
	// model: function() {
	//     return this.store.find('projects'); // Error while loading route: Error: No model was found for 'projects'
	// }
});

App.DraftRoute = Ember.Route.extend({
	model: function(params){
		return $.getJSON('http://tiny-pizza-server.herokuapp.com/ember-collections/projects/'+params.draft_id+'')
	}
});

/// Models

var attr = DS.attr;

App.Project = DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  body: attr('string'),
  submittedOn: attr('number'),
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
        var project = this.store.createRecord('project',{ // I think that "store" may be messing me up here
            title : title,
            description : description,
            body : body,
            submittedOn : submittedOn
        });
        project.save();
        this.transitionToRoute('index');
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
		},

		completeDraft: function(){
			var project = this.get('model');
			project.set('isComplete', true);
		},

		removeProject: function() {
		    var project = this.get('model');
		    project.deleteRecord();
		    project.save();
		}
	}
})

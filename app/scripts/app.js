App = Ember.Application.create();

// // App Adapter 

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase("https://sizzling-fire-4203.firebaseio.com")
  });

App.ApplicationSerializer = DS.FirebaseSerializer.extend();

/// Routers

App.Router.map(function(){
	this.resource('login');
	this.resource('app', function(){
		this.resource('new');
		this.resource('review', function(){
			this.resource('draft', {path: ':draft_id'});
		});
		this.resource('queue', function(){
			this.resource('projects');
		});
	});
});

/// Routes

App.Route = Ember.Route.extend({
    model: function(params) {
      return this.store.findAll("project");
    }
});

App.DraftRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find("project", params.draft_id);
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
        var project = this.store.createRecord('project',{
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

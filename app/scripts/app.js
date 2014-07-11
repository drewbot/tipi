// TIPI

// Create Ember Application

App = Ember.Application.create();

// App Adapter 

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase("https://sizzling-fire-4203.firebaseio.com")
  });

App.ApplicationSerializer = DS.FirebaseSerializer.extend();

// Routers

App.Router.map(function(){
	this.resource('login');
	this.resource('app', function(){
		this.resource('dashboard');
		this.resource('new');
		this.resource('draft', {path: 'review/:draft_id'});
		//  Keeping this around just to be able to view actions
		this.resource('queue', {path: 'ready/:queue_id'});
		this.resource('proposal', {path: 'review/:proposal_id'});
		this.resource('contract', {path: 'review/:contract_id'});	
		this.resource('brief', {path: 'review/:brief_id'});
	});

});

// Routes

// Index redirect
App.IndexRoute = Ember.Route.extend({
	redirect: function() {
	    this.transitionTo('login');
    }
});

// This defines project as the model for every route. I may need to change
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

//  Keeping this around just to be able to view actions
App.QueueRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find("project", params.queue_id);
    }
});

App.ProposalRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find("project", params.proposal_id);
    }
});

App.ContractRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find("project", params.contract_id);
    }
});

App.BriefRoute = Ember.Route.extend({
    model: function(params) {
      return this.store.find("project", params.brief_id);
    }
});

// Models

// Project
var attr = DS.attr;

App.Project = DS.Model.extend({
  title: attr('string'),
  clientName: attr('string'),
  clientEmail: attr('string'),
  description: attr('string'),
  body: attr('string'),
  submittedOn: attr('number'),
  savedOn: attr('number'),
  isCompleted: DS.attr('boolean')
  
})

// User
App.User = DS.Model.extend({
    email: DS.attr('string'),
    name: DS.attr('string'),
});


/////////// New Controller ///////////////////////////

App.NewController = Ember.ObjectController.extend({
 
 actions :{
    save : function(){
        var title = $('#title').val();
        var clientName = $('#client-name').val();
        var clientEmail = $('#client-email').val();
        var description = $('#description').val();
        var body = $('#body').val();
        var submittedOn = new Date();
        var store = this.get('store');
        var project = this.store.createRecord('project',{
            title : title,
            clientName : clientName,
			clientEmail : clientEmail,
            description : description,
            body : body,
            submittedOn : submittedOn
        });
        project.save();
        this.transitionToRoute('dashboard');
    }
 }
});

/////////// Draft Controller ///////////////////////////

App.DraftController = Ember.ObjectController.extend({
	isEditing: false,

	init: function(){
		// Trying to get the model id and set it as a url extension for print usage
		var draftId = this.get('model.id');
		console.log('tipiapp.com/#/app/' + draftId);
	},

	actions: {
		edit: function(){
			this.set('isEditing', true);
		},

		doneEditing: function(){
			this.set('isEditing', false);
			var title = $('#title').val();
	        var description = $('#description').val();
	        var body = $('#body').val();
			var project = this.get('model',{
				title : title,
	            description : description,
	            body : body
			});
			project.set('savedOn', new Date());
		    project.save();
		    this.transitionToRoute('dashboard');
		},

		removeProject: function() {
		    var project = this.get('model');
		    project.deleteRecord();
		    project.save();
		    this.transitionToRoute('dashboard');
		},

		isCompleted: function(){
			var project = this.get('model');
		    project.set('isCompleted', true);
		    project.set('savedOn', new Date());
		    project.save();
		    this.transitionToRoute('dashboard');
		}
	}
})

App.AppController = Ember.ArrayController.extend({

	actions:{

		showDrafts :function(){
			$('.draft-container').toggleClass('show-drafts');
		},

		showQueue :function(){
			$('.queue-container').toggleClass('show-drafts');
		},

		showDocs :function(){
			$('.queue-docs').toggleClass('show-drafts');
		}
	}
});



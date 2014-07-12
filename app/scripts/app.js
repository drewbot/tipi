//                      _____   _    ____   _                        
//       \/       \/   |_   _| | |  |  _ \ | |     \/       \/
//       /\       /\     | |   | |  |  __/ | |     /\       /\
//      /  \     /  \    | |   | |  | |    | |    /  \     /  \
//_____/    \___/    \___| |___| |__| |____| |___/    \___/    \______

///////////////////////////////////////////////////////////////////////
////////////////////// Create Ember Application ///////////////////////
///////////////////////////////////////////////////////////////////////

App = Ember.Application.create({
	// ready: function() {
 //    this.register('main:auth', App.AuthController);
 //    this.inject('route', 'auth', 'main:auth');
 //    this.inject('controller', 'auth', 'main:auth');
 //  }
});

// App Adapter 

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: new Firebase("https://sizzling-fire-4203.firebaseio.com")
  });

App.ApplicationSerializer = DS.FirebaseSerializer.extend();

///////////////////////////////////////////////////////////////////////
//////////////////// Routers //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

App.Router.map(function(){
	this.resource('login');
	this.resource('app', function(){
		this.resource('dashboard');
		this.resource('new');
		this.resource('draft', {path: 'review/:draft_id'});
		this.resource('proposal', {path: 'review/:proposal_id'});
		this.resource('contract', {path: 'review/:contract_id'});	
		this.resource('brief', {path: 'review/:brief_id'});
	});

});

///////////////////////////////////////////////////////////////////////
//////////////////// Routes ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////////
//////////////////// Models ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// Project
var attr = DS.attr;

App.Project = DS.Model.extend({
	title: attr('string'),

	userName: attr('string'),
	userAddress: attr('string'),
	userPhone: attr('number'),
	userEmail: attr('string'),

	date: attr('number'),
	clientName: attr('string'),
	clientTitle: attr('string'),
	clientCo: attr('string'),
	clientEmail: attr('string'),

	projectType: attr('string'),
	personal: DS.attr('boolean'),
	professional: DS.attr('boolean'),
	description: attr('string'),
	technology: attr('string'),

	delivery: attr('string'),
	examples: attr('string'),
	hasCopy: DS.attr('boolean'),
	hasArt: DS.attr('boolean'),

	startDate: attr('number'),
	completionDate: attr('number'),
	estimatedHours: attr('number'),
	hourlyRate: attr('number'),

	submittedOn: attr('number'),
	savedOn: attr('number'),
	isCompleted: DS.attr('boolean')
})

// User
App.User = DS.Model.extend({
    // email: DS.attr('string'),
    // name: DS.attr('string'),
});

///////////////////////////////////////////////////////////////////////
//////////////////// Controllers //////////////////////////////////////
///////////////////////////////////////////////////////////////////////

// New Controller
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

// Draft Controller
App.DraftController = Ember.ObjectController.extend({
	isEditing: false,

	init: function(){
		// Trying to get the model id and set it as a url extension for send usage
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

// App Controller (logged in)
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

///////////////////////////////////////////////////////////////////////
//////////////////// User Authentication //////////////////////////////
///////////////////////////////////////////////////////////////////////


// var dbRoot = "https://sizzling-fire-4203.firebaseio.com"
// var dbRef = new Firebase(dbRoot);

// var ideasPath = dbRoot + "/ideas";
// var usersPath = dbRoot + "/users";


// // Login Controller
// App.LoginRoute = Ember.Route.extend({
//   actions: {
//     login: function() {
//       this.get('auth').login();
//     },

//     logout: function() {
//       this.get('auth').logout();
//     }
//   }
// });

// App.AuthController = Ember.Controller.extend({
//   authed: false,
//   currentUser: null,

//   init: function() {
//     this.authClient = new FirebaseSimpleLogin(dbRef, function(error, githubUser) {
//       if (error) {
//         alert('Authentication failed: ' + error);
//       } else if (githubUser) {
//         this.set('authed', true);
//         var userRef = new Firebase(usersPath + '/' + githubUser.username);
//         var controller = this;
//         var properties = {
//           id: githubUser.username,
//           name: githubUser.username,
//           displayName: githubUser.displayName,
//           avatarUrl: githubUser.avatar_url,
//         };
//         userRef.once('value', function(snapshot) {
//           if (!snapshot.val().votesLeft) {
//             properties.votesLeft = 10;
//           } else {
//             properties.votesLeft = snapshot.val().votesLeft;
//           }
//           var user = App.User.create({ ref: userRef });
//           user.setProperties(properties);
//           controller.set('currentUser', user);
//         });
//       } else {
//         this.set('authed', false);
//       }
//     }.bind(this));
//   },

//   login: function() {
//     this.authClient.login('github');
//   },

//   logout: function() {
//     this.authClient.logout();
//   }

// });
App = Ember.Application.create();

/// Routers

App.Router.map(function(){
	this.resource('new');
	this.resource('draft', {path: ':draft_id'});
	this.resource('queue');
});

/////////// Attempting to change _id to id /////////
App.Adapter = DS.RESTAdapter.extend({
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

/////////////
// Fixed data
/////////////

// App.DraftsRoute = Ember.Route.extend({
// 	model: function(){
// 		return drafts;
// 	}
// });

// App.DraftRoute = Ember.Route.extend({
// 	model: function(params){
// 		return drafts.findBy('id', params.draft_id);
// 	}
// });

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

/////////////
// Fixed data
/////////////

// var drafts = [{
// 	id: '1',
// 	title: "Project 1",
// 	description: "Website",
// 	body: "Ooh lalala, this is the way that we rock when we're doing our thing"
// }, {
// 	id: '2',
// 	title: "Project 2",
// 	description: "logo",
// 	body: "Ooh lalala, this is the natural high that the refugees bring"
// }, {
// 	id: '3',
// 	title: "Project 3",
// 	description: "Web App",
// 	body: "Ooh lala lala lala lalalalala sweet thing"
// }]
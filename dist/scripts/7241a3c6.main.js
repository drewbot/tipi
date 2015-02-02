App=Ember.Application.create({}),App.ApplicationAdapter=DS.FirebaseAdapter.extend({firebase:new Firebase("https://sizzling-fire-4203.firebaseio.com")}),App.ApplicationSerializer=DS.FirebaseSerializer.extend(),Ember.Handlebars.registerBoundHelper("currentDate",function(){return moment().format("LL")}),App.Router.map(function(){this.resource("login"),this.resource("app",function(){this.resource("dashboard"),this.resource("new"),this.resource("draft",{path:":draft_id/review"}),this.resource("proposal",{path:":proposal_id/proposal"}),this.resource("contract",{path:":contract_id/contract"}),this.resource("brief",{path:":brief_id/brief"})})}),App.IndexRoute=Ember.Route.extend({redirect:function(){this.transitionTo("dashboard")}}),App.LoginRoute=Ember.Route.extend({}),App.AppRoute=Ember.Route.extend({beforeModel:function(){this.authClient=new window.FirebaseSimpleLogin(new window.Firebase("https://sizzling-fire-4203.firebaseio.com"),function(a,b){a?alert("authentication failed"+a):b?console.log("welcome"+b):this.transitionTo("login")}.bind(this))},model:function(){return this.store.findAll("project")},actions:{logout:function(){this.authClient.logout()}}}),App.NewRoute=Ember.Route.extend({model:function(){return this.store.findAll("project")}}),App.DashboardRoute=Ember.Route.extend({model:function(){return this.store.find("user")}}),App.DraftRoute=Ember.Route.extend({model:function(a){return this.store.find("project",a.draft_id)}}),App.ProposalRoute=Ember.Route.extend({model:function(a){return this.store.find("project",a.proposal_id)}}),App.ContractRoute=Ember.Route.extend({model:function(a){return this.store.find("project",a.contract_id)}}),App.BriefRoute=Ember.Route.extend({model:function(a){return this.store.find("project",a.brief_id)}});var attr=DS.attr;App.User=DS.Model.extend({userName:attr("string"),userAddress:attr("string"),userPhone:attr("number"),userEmail:attr("string"),hourlyRate:attr("number")}),App.Project=DS.Model.extend({title:attr("string"),userName:attr("string"),userAddress:attr("string"),userPhone:attr("string"),userEmail:attr("string"),date:attr("number"),clientName:attr("string"),clientTitle:attr("string"),clientCo:attr("string"),clientEmail:attr("string"),projectType:attr("string"),personal:DS.attr("boolean"),professional:DS.attr("boolean"),description:attr("string"),technology:attr("string"),delivery:attr("string"),examples:attr("string"),hasCopy:DS.attr("boolean"),hasArt:DS.attr("boolean"),startDate:attr("string"),completionDate:attr("string"),hourlyRate:attr("number"),estimatedHours:attr("number"),totalCost:attr("number"),deposit:attr("number"),submittedOn:attr("number"),savedOn:attr("number"),isCompleted:DS.attr("boolean")}),Ember.TextField.reopen({classNames:["all-text-inputs"]}),App.LoginController=Ember.Controller.extend({init:function(){this.authClient=new window.FirebaseSimpleLogin(new window.Firebase("https://sizzling-fire-4203.firebaseio.com"),function(a,b){a?alert("authentication failed"+a):b&&(console.log("YAYA"),this.transitionToRoute("/app/dashboard"))}.bind(this))},actions:{login:function(a,b){var a=$("#login-email").val(),b=$("#login-password").val();this.authClient.login("password",{email:a,password:b})},createUser:function(){var a=this,b=$("#login-email").val(),c=$("#login-password").val();this.authClient.createUser(b,c,function(d,e){d?console.log("Didn't work"+d):e&&a.send("login",b,c)})}}}),App.AppController=Ember.ArrayController.extend({itemController:"project",actions:{showDrafts:function(){$(".draft-drop").toggleClass("show-drafts")},showQueue:function(){$(".queue-drop").toggleClass("show-drafts")},closeNav:function(){$(".nav").toggleClass("move-right"),$(".header-left").toggleClass("move-right")}}}),App.ProjectController=Ember.ObjectController.extend({isSelected:!1,actions:{showDocs:function(){this.toggleProperty("isSelected")}}}),App.DashboardController=Ember.ObjectController.extend({isEditing:!1,actions:{edit:function(){this.set("isEditing",!0)},doneEditing:function(){this.set("isEditing",!1),project.save()}}}),App.NewController=Ember.ObjectController.extend({actions:{save:function(){var a=$("#title").val(),b=$("#user-name").val(),c=$("#user-address").val(),d=$("#user-phone").val(),e=$("#user-email").val(),f=$("#client-name").val(),g=$("#client-title").val(),h=$("#client-co").val(),i=$("#client-email").val(),j=$("#project-type").val(),k=this.get("isPro"),l=this.get("isPersonal"),m=$("#description").val(),n=$("#technology").val(),o=$("#delivery").val(),p=$("#examples").val(),q=this.get("getCopy"),r=this.get("getArt"),s=$("#start-date").val(),t=$("#completion-date").val(),u=$("#hourly-rate").val(),v=$("#estimated-hours").val(),w=function(){return u*v},x=w(),y=function(){return x/5},z=y(),A=new Date,B=(this.get("store"),this.store.createRecord("project",{title:a,userName:b,userAddress:c,userPhone:d,userEmail:e,clientName:f,clientTitle:g,clientCo:h,clientEmail:i,projectType:j,personal:l,professional:k,description:m,technology:n,delivery:o,examples:p,hasCopy:q,hasArt:r,startDate:s,completionDate:t,estimatedHours:v,hourlyRate:u,totalCost:x,deposit:z,submittedOn:A}));B.save(),this.set("isPro",!1),this.set("isPersonal",!1),this.set("getCopy",!1),this.set("getArt",!1),this.transitionToRoute("dashboard")}}}),App.computed=App.computed||{},App.computed.mailto=function(a){return function(){return"mailto:"+this.get(a)}.property(a)},App.DraftController=Ember.ObjectController.extend({mailtoContactEmail:App.computed.mailto("clientEmail"),isEditing:!1,init:function(){},actions:{edit:function(){this.set("isEditing",!0)},doneEditing:function(){this.set("isEditing",!1);var a=$("#title").val(),b=$("#user-name").val(),c=$("#user-address").val(),d=$("#user-phone").val(),e=$("#user-email").val(),f=$("#client-name").val(),g=$("#client-title").val(),h=$("#client-co").val(),i=$("#client-email").val(),j=$("#project-type").val(),k=this.get("isPro"),l=this.get("isPersonal"),m=$("#description").val(),n=$("#technology").val(),o=$("#delivery").val(),p=$("#examples").val(),q=this.get("getCopy"),r=this.get("getArt"),s=$("#start-date").val(),t=$("#completion-date").val(),u=$("#hourly-rate").val(),v=$("#estimated-hours").val(),w=function(){return u*v},x=w(),y=function(){return x/5},z=y(),A=this.get("model",{title:a,userName:b,userAddress:c,userPhone:d,userEmail:e,clientName:f,clientTitle:g,clientCo:h,clientEmail:i,projectType:j,personal:l,professional:k,description:m,technology:n,delivery:o,examples:p,hasCopy:q,hasArt:r,startDate:s,completionDate:t,estimatedHours:v,hourlyRate:u,totalCost:x,deposit:z});A.set("savedOn",new Date),A.set("totalCost",x),A.set("deposit",z),A.save()},cancel:function(){this.set("isEditing",!1)},setCopyAsFalse:function(){var a=this.get("model");a.set("hasCopy",!1),a.save()},isCompleted:function(){var a=this.get("model");a.set("isCompleted",!0),a.set("savedOn",new Date),a.save(),id=a.get("id"),this.transitionToRoute("dashboard")},removeProject:function(){var a=this.get("model");a.deleteRecord(),a.save(),this.transitionToRoute("dashboard")}}}),App.ProposalController=Ember.ObjectController.extend({mailtoContactEmail:App.computed.mailto("clientEmail"),actions:{printContent:function(){var a=document.body.innerHTML,b=document.getElementById("proposal-container").innerHTML;document.body.innerHTML=b,window.print(),document.body.innerHTML=a},isIncomplete:function(){var a=this.get("model");a.set("isCompleted",!1),a.set("savedOn",new Date),a.save(),this.transitionToRoute("dashboard")},removeProject:function(){var a=this.get("model");a.deleteRecord(),a.save(),this.transitionToRoute("dashboard")}}}),App.ContractController=Ember.ObjectController.extend({actions:{printContent:function(){var a=document.body.innerHTML,b=document.getElementById("contract-container").innerHTML;document.body.innerHTML=b,window.print(),document.body.innerHTML=a},isIncomplete:function(){var a=this.get("model");a.set("isCompleted",!1),a.set("savedOn",new Date),a.save(),this.transitionToRoute("dashboard")},removeProject:function(){var a=this.get("model");a.deleteRecord(),a.save(),this.transitionToRoute("dashboard")}}}),App.BriefController=Ember.ObjectController.extend({actions:{printContent:function(){var a=document.body.innerHTML,b=document.getElementById("brief-container").innerHTML;document.body.innerHTML=b,window.print(),document.body.innerHTML=a},isIncomplete:function(){var a=this.get("model");a.set("isCompleted",!1),a.set("savedOn",new Date),a.save(),this.transitionToRoute("dashboard")},removeProject:function(){var a=this.get("model");a.deleteRecord(),a.save(),this.transitionToRoute("dashboard")}}}),App.AppView=Ember.View.extend({classNames:["body-container"],templateName:"app"}),$(".header-left").hover(function(){$(this).find(".header-logo").remove(),$(this).append($('<img src="images/tipi-logo-hover.png" class="header-logo">'))},function(){$(this).find(".header-logo").remove(),$(this).append($('<img src="images/tipi-logo.png" class="header-logo">'))});
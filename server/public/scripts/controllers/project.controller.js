app.controller('ProjectController', function ($http, ProjectService) {
    console.log('ProjectController works')
    var self = this;

    self.projectList = ProjectService.projectList;

    self.addProject = function (project) {
        ProjectService.addProject(project);
    }
 

})
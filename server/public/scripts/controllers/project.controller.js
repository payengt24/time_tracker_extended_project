app.controller('ProjectController', function ($http, ProjectService) {
    console.log('ProjectController works')
    var self = this;

    self.projectList = ProjectService.projectList;

    self.addProject = function (project) {
        ProjectService.addProject(project);

    }
 

    ProjectService.getAllProject();


    self.deleteProject = function (project) {
        console.log('Am I in the deleteProject for the controller?')
        ProjectService.deleteProject(project);
    }

    self.saveProject = function (project) {
        console.log(project);
        ProjectService.saveProject(project);
    }

    self.editMode = function (project) {
        console.log('reached editMode in controller');
        ProjectService.editMode(project);
    }

    self.cancelEditMode = function (project) {
        console.log('reached cancelEditMode in controller');
        ProjectService.cancelEditMode(project);
    }

})
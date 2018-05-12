app.controller('ProjectController', function ($http, ProjectService) {
    console.log('ProjectController works')
    var self = this;

    self.projectList = ProjectService.projectList;

    self.addProject = function (project) {
        ProjectService.addProject(project);

    }

      //toggle project edit to false
    self.editMode = function (project) {
        project.edit = true;
    }

    self.cancelEditMode = function (project) {
        project.edit = false;
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
})
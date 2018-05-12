app.service('ProjectService', function ($http) {
    console.log('ProjectService is loaded')

    var self = this;
    self.projectList = {list: [] };
 
//--POST to add project to database
    self.addProject = function (project) {
        console.log(project);
        $http({
            method: 'POST',
            url: '/project/addProject',
            data: project
        })
            .then(function (response) {
                console.log(response);
                self.getAllProject();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

//--GET all project    
    self.getAllProject = function () {
        console.log('getAllProject');
        $http({
            method: 'GET',
            url: '/project/getProject'
        })
            .then(function (response) {
                console.log('my response', response.data);
                self.projectList.list = response.data;
            })
            .catch(function (error) {
                console.log('Error on GET ProjectService', error)
            });
    }


    
    self.deleteProject = function (project) {
        return $http.delete('/project/' + project.id).then(function(response){
            self.getAllProject();
        }).catch(function(err){
            console.log('Error deleting message', err)
        })
    }

    self.saveProject = function (project) {
        console.log('Project to save/PUT', project)
        $http({
            method: 'PUT',
            url: '/project/saveProject',
            data: project
        })
            .then(function (response) {
                self.edit = false
                console.log('response from put', response);
                self.getAllProject();
            })
            .catch(function (error) {
                console.log('error on PUT for project service', error);
            });
    }


  //toggle project edit to false
    self.editMode = function (project) {
        project.edit = true;
    }

    self.cancelEditMode = function (project) {
        project.edit = false;
    }

})
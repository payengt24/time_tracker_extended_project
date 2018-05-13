app.service('ProjectService', function ($http) {
    console.log('ProjectService is loaded')

    var self = this;
    self.projectList = { list: [] };

    self.hour = { list: [] };



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

        return $http({
            method: 'GET',
            url: '/project/getProject'
        })
            .then(function (response) {
                console.log('my response', response.data);
                self.projectList.list = response.data;
                return response.data;
            })
            .catch(function (error) {
                console.log('Error on GET ProjectService', error)
            });
    }

    // //request to GET Hours so it can be place in Project
    // self.getHour = function () {
    //     console.log('getting hours');
    //     $http({
    //         method: 'GET',
    //         url: '/entry/getHour'
    //     })
    //         .then(function (response) {
    //             console.log('my response', response.data);
    //             self.hour.list = response.data;
    //         })
    //         .catch(function (error) {
    //             console.log('Error on GET hour ProjectService', error)
    //         });
    // }



    self.deleteProject = function (project) {
        return $http.delete('/project/' + project.id).then(function (response) {
            Swal("Deleted!", "Your Project has been deleted.", "success");
            self.getAllProject();
        }).catch(function (err) {
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
                response.config.data.edit = false
                console.log('response from put', response);
                self.getAllProject();
            })
            .catch(function (error) {
                console.log('error on PUT for ProjectService', error);
            });
    }
})
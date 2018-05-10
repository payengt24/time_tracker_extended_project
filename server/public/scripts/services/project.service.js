app.service('ProjectService', function ($http) {
    console.log('ProjectService is loaded')

    var self = this;
    self.projectList = {list: [] };
 

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

})
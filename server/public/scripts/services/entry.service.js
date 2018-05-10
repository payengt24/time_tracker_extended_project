app.service('EntryService', function ($http) {
    console.log('EntryService is loaded')

    var self = this;
    self.projectList = {list: [] };

    self.addEntry = function (entry) {
        console.log("adding entry", entry);
        $http({
            method: 'POST',
            url: '/entry/addEntry',
            data: entry
        })
            .then(function (response) {
                console.log(response);
                self.getAllEntry();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    self.getAllEntry = function () {
        console.log('getAllEntry');
        $http({
            method: 'GET',
            url: '/entry/getEntry'
        })
            .then(function (response) {
                console.log('my response', response.data);
                // self.projectList.list = response.data;
            })
            .catch(function (error) {
                console.log('Error on GET EntryService', error)
            });
    }

    self.getProject = function (){
        console.log('getting project for select');
        $http({
            method: 'GET',
            url: '/entry/getProject'
        })
            .then(function (response) {
                console.log('my response', response.data);
                self.projectList.list = response.data;
            })
            .catch(function (error) {
                console.log('Error on GET EntryService', error)
            });
    }

})
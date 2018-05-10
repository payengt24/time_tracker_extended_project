app.service('EntryService', function ($http) {
    console.log('EntryService is loaded')

    var self = this;
    self.projectList = {list: [] };

    // POST to add entry to database
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

    //request to GET Project so it can be place in ENTRY selector
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

    self.getAllEntry = function () {
        console.log('getAllEntry');
        $http({
            method: 'GET',
            url: '/entry/getEntry'
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
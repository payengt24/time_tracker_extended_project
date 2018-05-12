app.service('EntryService', function ($http) {
    console.log('EntryService is loaded')

    var self = this;
    self.project = { list: [] };
    self.history = { list: [] };

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
    self.getProject = function () {
        console.log('getting project for select');
        $http({
            method: 'GET',
            url: '/entry/getProject'
        })
            .then(function (response) {
                console.log('my response', response.data);
                self.project.list = response.data;
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
                console.log('my response for getAllEntry in service', response.data);
                self.history.list = response.data;
            })
            .catch(function (error) {
                console.log('Error on GET EntryService', error)
            });
    }


    self.deleteEntry = function (entry) {
        return $http.delete('/entry/' + entry.id).then(function (response) {
            self.getAllEntry();
        }).catch(function (err) {
            console.log('Error deleting message', err)
        })
    }

    self.saveHistory = function (entry) {
        console.log('History to save/PUT', entry)
        $http({
            method: 'PUT',
            url: '/entry/saveHistory',
            data: entry
        })
            .then(function (response) {
                self.edit = false
                console.log('response from put', response);
                self.getAllEntry();
            })
            .catch(function (error) {
                console.log('error on PUT for history service', error);
            });
    }

    //toggle history edit to false
    self.editMode = function (history) {
        history.edit = true;
    }

    self.cancelEditMode = function (history) {
        history.edit = false;
    }

})
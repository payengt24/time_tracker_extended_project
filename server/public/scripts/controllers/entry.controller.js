app.controller('EntryController', function ($http, $mdDialog, EntryService) {
    console.log('EntryController works')
    var self = this;

    self.project = EntryService.project;
    self.history = EntryService.history;


    self.sortType     = 'Entry'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order

    //POST to add entry

    self.addEntry = function (entry) {
        console.log(entry);
        // entry.hour = entry.startTime.split('T')[1].split('.')[0] - entry.endTime.split('T')[1].split('.')[0];
        entry.hour = timeDifference(entry.startTime, entry.endTime);
        console.log(entry);
        EntryService.addEntry(entry);
    }
    //get time Difference
    function timeDifference(startTime, endTime) {
        var startTimeHours = startTime.getHours();
        var endTimeHours = endTime.getHours();
        var endTimeMinutes = endTime.getMinutes();
        var startTimeMinutes = startTime.getMinutes();
        var endTimeHours = endTime.getHours();
        var endTimeMinutes = endTime.getMinutes();
        var hours = endTimeHours - startTimeHours;
        var minutes = endTimeMinutes - startTimeMinutes;

        minutes = ((minutes / 60) * 100).toFixed(0);
        var timeDiff = hours + "." + minutes;
        console.log("hours: ", hours);
        console.log("minutes: ", minutes);
        console.log("timeDiffer: ", timeDiff);
        return timeDiff;
    }

    //----Time/Date-----

    // var d = new Date(),
    //     h = d.getHours(),
    //     m = d.getMinutes();
    // if (h < 10) h = '0' + h;
    // if (m < 10) m = '0' + m;

    // set the default time to now
    // self.startTime = h + ':' + m;

    // set the default date to now
    self.entry = {
        date: new Date(),
        // startTime: d
    }
    //-----end Time/Date-----

    //calling function to get projects so it can be place on the entry page selector
    EntryService.getProject();



    //calling function to get all entries
    EntryService.getAllEntry();


    self.deleteEntry = function (entry) {
        console.log('Am I in the deleteEntry for the controller?')
        EntryService.deleteEntry(entry);
    }

    // .split('T')[1].split('.')[0]



    self.saveHistory = function (entry) {
        entry.hour = timeDifference(entry.startTime, entry.endTime);
        console.log(entry);
        EntryService.saveHistory(entry);
    }

    self.editMode = function (entry) {
        console.log('reached editMode in controller');
        // var startTime = new Date();
        // startTime.hour = entry.startTime.split('T')[1].split('.')[0].split(':')[0];
        // startTime.minutes = entry.startTime.split('T')[1].split('.')[0].split(':')[1];
        // entry.startTime = startTime;

        entry.edit = true;
    }

    self.cancelEditMode = function (entry) {
        console.log('reached cancelEditMode in controller');
        entry.edit = false;
    }










})
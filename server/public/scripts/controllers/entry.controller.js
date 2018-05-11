app.controller('EntryController', function ($http, EntryService) {
    console.log('EntryController works')
    var self = this;

    self.project = EntryService.project;
    self.history = EntryService.history;
 
//POST to add entry

    self.addEntry = function (entry) {
        EntryService.addEntry(entry);
    }
 //----Time/Date-----
    var d = new Date(),        
        h = d.getHours(),
        m = d.getMinutes();
    if(h < 10) h = '0' + h; 
    if(m < 10) m = '0' + m; 

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










})
app.controller('EntryController', function ($http, EntryService) {
    console.log('EntryController works')
    var self = this;

    self.projectList = EntryService.projectList;
 
    self.addEntry = function (entry) {
        EntryService.addEntry(entry);
    }
 
    //var 
    var d = new Date(),        
        h = d.getHours(),
        m = d.getMinutes();
    if(h < 10) h = '0' + h; 
    if(m < 10) m = '0' + m; 

    // set the default time to now
    self.startTime = h + ':' + m;
    
    // set the default date to now
    self.entry = {
        date: new Date()
    }

    EntryService.getProject();

})
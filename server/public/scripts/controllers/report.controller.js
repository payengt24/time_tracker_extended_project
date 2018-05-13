app.controller('ReportController', function (ProjectService) {
    console.log('ReportController works')
    var self = this;

    self.data = [];
    self.labels = [];
    
    self.projectList = ProjectService.projectList;
    ProjectService.getAllProject()
        .then(function () {
            console.log('data has return');
            // console.log('project list', project.list);
            // self.projectList = projectList;
            self.loadProjectName();
            self.loadProjectHours();
            // console.log('label list', self.labels);

            // console.log(projectList);
            
        })

    console.log("project list in report: ", self.projectList);

    // self.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    // self.series = ['Series A', 'Series B'];


    self.loadProjectName = function () {
        console.log("loading projectName into label", self.projectList.list);
        for (var i = 0; i < self.projectList.list.length; i++) {
            console.log("pushing to list: ", self.projectList.list[i]['project_name']);
            self.labels.push(self.projectList.list[i]['project_name']);
        }
    }

    var project = self.projectList;


    // self.data = [
    //   [65, 59, 80, 81, 56, 55, 40],
    //   [28, 48, 40, 19, 86, 27, 90]
    // ];


    self.loadProjectHours = function () {
        console.log('loadProjectHours into data');
        for (var i = 0; i < self.projectList.list.length; i++) {
            console.log("pushing to list: ", self.projectList.list[i]['totalhour']);
            self.data.push(self.projectList.list[i]['totalhour']);
        }
    }




})
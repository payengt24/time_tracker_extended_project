app.controller('ProjectController', function (ProjectService, EntryService) {
    console.log('ProjectController works')
    var self = this;

    self.projectList = ProjectService.projectList;

    self.entryService = EntryService;

    self.sortType = 'project'; // set the default sort type
    self.sortReverse = false;  // set the default sort order

    self.addProject = function (project) {
        ProjectService.addProject(project);

    }

    //toggle project edit to false
    self.editMode = function (project) {
        project.edit = true;
    }

    self.cancelEditMode = function (project) {
        project.edit = false;
    }



    ProjectService.getAllProject();
    // ProjectService.getHour();


    self.deleteProject = function (project) {
        console.log('Am I in the deleteProject for the controller?');
        Swal({
            title: 'Are you sure?',
            text: 'You will not be able to recover this project once deleted!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.value) {
                ProjectService.deleteProject(project);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal(
                    'Cancelled',
                    'Your project is safe :)',
                    'error'
                )
            }
        });
    }

    self.saveProject = function (project) {
        console.log(project);
        ProjectService.saveProject(project);
    }

    self.getAllEntryData = function () {
        self.entryService.getAllEntry();
    }

})


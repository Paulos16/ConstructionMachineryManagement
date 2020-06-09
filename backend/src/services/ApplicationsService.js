const db = require('../application/Database');

module.exports = function() {

  this.addApplication = function(application) {

    const applications = db.get('applications').value()
    db.set('applicationsCount', db.get('applicationsCount').value()+1).write();

    const applicationsCount = db.get('applicationsCount').value()
    application.IdWniosek = applicationsCount;
    
    applications.push(application);
    db.write();

    return application;
  }
  
}
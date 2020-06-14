const db = require('../application/Database');

module.exports = function() {

  this.addApplication = function(application) {

    const applications = db.get('applications').value()
    db.set('applicationsCount', db.get('applicationsCount').value()+1)
      .write();

    const applicationsCount = db.get('applicationsCount').value();
    application.IdWniosek = applicationsCount;
    
    applications.push(application);
    db.write();

    return application;
  }

  this.getApplications = function() {

    const applications = db.get('applications')
      .value();

    return applications;
  }

  this.setApplicationApproval = function(applicationId, approval) {

    const application = db.get('applications')
      .find((a) => a.IdWniosek === applicationId)
      .first()
      .value();
    
    if(application === undefined) {
      return null;
    }

    application.CzyPoprawny = approval;
    db.write();

    return application;
  }

  this.setApplicationStatus = function(applicationId, status) {

    const application = db.get('applications')
      .find((a) => a.IdWniosek === applicationId)
      .first()
      .value();
    
    if(application === undefined) {
      return null;
    }

    application.Status = status;
    db.write();

    return application;
  }
  
}
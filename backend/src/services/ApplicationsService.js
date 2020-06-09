const db = require('../application/Database');

module.exports = function() {

  this.addApplication = function(application) {

    const applications = db.get('applications').value()
    db.get('applicationsCount')
      .assign(db.get('applicationsCount').value()+1)
      .write();

    const applicationsCount = db.get('applicationsCount').value()
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
      .value();
    
    if(application === undefined) {
      return null;
    }

    application.CzyPoprawny = approval;
    db.write();

    return application;
  }
  
}
const db = require('../application/Database');


module.exports = function() {

  this.getOverviews = function() {

    const overviews = db.get('overviews')
      .value();

    return overviews;
  }

  this.addOverview = function(overview) {

    const overviews = db.get('overviews').value()
    db.set('overviewsCount', db.get('overviewsCount').value()+1)
      .write();

    const overviewsCount = db.get('overviewsCount').value()
    overview.IdPrzeglad = overviewsCount;
    
    overviews.push(overview);
    db.write();

    return overview;
  }

  this.addOverviewTask = function(overviewTask) {

    const overviewTasks = db.get('overviewTasks').value()
    db.set('overviewTasksCount', db.get('overviewTasksCount').value()+1)
      .write();

    const overviewTasksCount = db.get('overviewTasksCount').value()
    overviewTask.IdZleceniaPrzegladu = overviewTasksCount;
    
    overviewTasks.push(overviewTask);
    db.write();

    return overviewTask;
  }

  this.getOverviewTasks = function() {

    const overviewTasks = db.get('overviewTasks')
      .value()

    return overviewTasks;
  }

  this.addCorrectOverview = function(overviewId, document) {

    const overview = db.get('overviews')
      .find((o) => o.IdPrzeglad === overviewId)
      .value();
    
    overview.DokumentPrzegladu = document;
    overview.CzyZrobiony = true;
    
    db.write();

    return overview;
  }
  
}

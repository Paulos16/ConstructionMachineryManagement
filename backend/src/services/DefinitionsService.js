const db = require('../application/Database');


module.exports = function() {

  this.getDefinitions = function() {

    const definitions = db.get('definitions')
      .value();

    return definitions;
  }

  this.addDefinitionTask = function(definitionTask) {

    const definitionTasks = db.get('definitionTask').value()
    db.set('definitionTaskCount', db.get('definitionTaskCount').value()+1)
      .write();

    const definitionTasksCount = db.get('definitionTaskCount').value()
    definitionTask.IdZlecenieDefinicji = definitionTasksCount;
    
    definitionTasks.push(definitionTask);
    db.write();

    return definitionTask;
  }

  this.getDefinitionTask = function() {

    const definitionTasks = db.get('definitionTask')
    .value();

    return definitionTasks;
  }

  this.addDefinition = function(definition) {

    const definitions = db.get('definitions').value()
    db.set('definitionsCount', db.get('definitionsCount').value()+1)
      .write();

    const definitionsCount = db.get('definitionsCount').value()
    definition.IdDefinicja = definitionsCount;
    
    definitions.push(definition);
    db.write();

    return definition;
  }

  this.addDefinitionDocument = function(machineType, document) {

    const definition = db.get('definitions')
      .filter((def) => def.IdRodzajMaszyny === machineType)
      .first()
      .value()
    
    if(definition === undefined) {
      return null;
    }
    
    definition.DokumentDefinicji = document
    db.write();

    return definition;
  }
  
}

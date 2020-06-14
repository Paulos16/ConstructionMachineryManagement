const UserRoleEnum = require('../application/UserRoleEnum');

module.exports.getMockedDatabaseData = function() {
  return {
    users: [
      {
        id: '1',
        username: 'wniodawca',
        password: '$2b$10$yxJsoHQ6EH8F7xgH.GP9eOo.eEKyfTy56flGHFxhsZIms.FIxfgGG',
        role: UserRoleEnum.APPLICANT
      },
      {
        id: '2',
        username: 'biurek',
        password: '$2b$10$6nOjS31ayGthurvu4zCxAOYFUvEpuDrGskN7.q/s2DKGGEReg55da',
        role: UserRoleEnum.OFFICE
      },
      {
        id: '3',
        username: 'gadzet',
        password: '$2b$10$A3iYfbtoKVroWP357n2qNOrlhfFvCgx6reCX7m3w5ajgHW3CYP86G',
        role: UserRoleEnum.INSPECTOR
      },
    ],
    userCount: 3,
    applications: [],
    applicationsCount: 0,
    machineTypes: [
      {
        IdRodzajMaszyny: 1,
        Nazwa: 'Koparka DOG'
      },
      {
        IdRodzajMaszyny: 2,
        Nazwa: 'Betoniarka BET'
      }
    ],
    machineTypesCount: 2,
    machines: [
      {
        IdMaszyna: 1,
        Rejestracja: 'Betty1',
        CzyZdatna: null,
        TerminWaznosciPrzegladu: '2020-01-01',
        IdRodzajMaszyny: 2,
        IdWniosek: null
      }
    ],
    machinesCount: 1,
    definitions: [
      {
        IdDefinicja: 1,
        DokumentDefinicji: 'Badanie komory obrotowej; pomiar napięcia akumulatora.',
        IdRodzajMaszyny: 2
      }
    ],
    definitionsCount: 1,
    definitionTask: [],
    definitionTaskCount: 0,
    overviews: [],
    overviewsCount: 0,
    overviewTasks: [],
    overviewTasksCount: 0
  };
}

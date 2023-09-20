const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadAircraftSoftwareSetModel () {
  const payload = {
    componentName: 'loadaircraftsoftwareset',
    header: _nav.dataLoaderSubpagesHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load Aircraft Software Set',
    detailsHeader: 'Software Set Details',
    headerLeft: 'Target/LRU',
    headerRight: 'Data/Software',
    softwareSetSelectLabel: 'Select Aircraft <br>Software Set',
    databasesOptionsSelectLabel: 'Loading of Databases <br>and Documents/Tables',
    databasesOptionsList: [
      { label: 'Load New else Reload Installed', id: 0, selected: true }
    ],
    data: {
      items: [
        { label: '1B0-304B-LR-APM-CFG',
          id: 0,
          selected: true,
          data: [
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']},
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']}
          ]
        },
        { label: '1B0-304B-AB-CDE-FGH',
          id: 1,
          selected: false,
          data: [
            {itemName: 'item1', status: 'Error', data: ['abcd', 'efg']}
          ]
        }
      ]
    }
  }

  return payload
}

module.exports = ViewDataLoadAircraftSoftwareSetModel

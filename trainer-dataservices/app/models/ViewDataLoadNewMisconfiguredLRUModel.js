const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadNewMisconfiguredLRUModel () {
  const payload = {
    componentName: 'loadnewmisconfiguredlru',
    header: _nav.dataLoaderSubpagesHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Misconfigured LRU',
    detailsHeader: 'LRU Details',
    headerLeft: 'Target/LRU',
    headerRight: 'Data/Software',
    startLoadTxt: 'Initializing LRUs Please wait',
    data: {
      items: []
    }
  }

  return payload
}

module.exports = ViewDataLoadNewMisconfiguredLRUModel

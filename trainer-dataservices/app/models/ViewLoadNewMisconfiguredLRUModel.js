const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewLoadNewMisconfiguredLRUModel () {
  const payload = {
    componentName: 'loadnewmisconfiguredlru',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Misconfigured LRU',
    detailsHeader: 'LRU Details',
    headerLeft: 'Target/LRU',
    headerRight: 'Data/Software',
    startLoadTxt: 'Initializing LRUs Please wait',
    data: []
  }

  return payload
}

module.exports = ViewLoadNewMisconfiguredLRUModel

const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadModel () {
  const payload = {
    componentName: 'dataload',
    header: _nav.dataLoaderHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Databases',
    detailsHeader: 'Database Details',
    headerLeft: 'Database',
    headerRight: 'Target/LRU',
    data: {
      items:[
      ]
    }
  }

  return payload
}

module.exports = ViewDataLoadModel

const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewDataLoadNewDocumentsTablesModel () {
  const payload = {
    componentName: 'loadnewdocumentstables',
    header: _nav.dataLoaderSubpagesHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Documents & Tables',
    detailsHeader: 'Documents & Tables Details',
    headerLeft: 'Document/Table',
    headerRight: 'Target/LRU',
    data: {
      items: []
    }
  }

  return payload
}

module.exports = ViewDataLoadNewDocumentsTablesModel

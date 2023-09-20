const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewLoadNewDocumentsTablesModel () {
  const payload = {
    componentName: 'loadnewdocumentstables',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Load New Documents & Tables',
    detailsHeader: 'Documents & Tables Details',
    headerLeft: 'Document/Table',
    headerRight: 'Target/LRU',
    data: []
  }

  return payload
}

module.exports = ViewLoadNewDocumentsTablesModel

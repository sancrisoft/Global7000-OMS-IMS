const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewInfoMgmtMenuModel () {
  const payload = {
    componentName: 'infomgmtmenu',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      items: [
        { label: 'Manage Files', enabled: 1, target: 'manageFiles' },
        { label: 'Backup Media Sets', enabled: 1, target: 'backupMediaSets' },
        { label: 'Restore Media Sets', enabled: 1, target: 'restoreMediaSets' }
      ]
    }
  }

  return payload
}

module.exports = ViewInfoMgmtMenuModel

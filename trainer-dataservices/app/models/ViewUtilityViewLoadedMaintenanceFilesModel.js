const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

const ViewUtilityViewLoadedMaintenanceFilesModel = ({

  payload: {
    title: 'View Loaded Maintenance Files',
    parentComponentName: 'utilityfunctions',
    componentName: 'viewloadedmaintenancefiles',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    viewComboLabel: 'View',
    viewCombo: [
      {label: 'Diagnostic Tables', id: 0, key: 'diagnostic', selected: 1},
      {label: 'Test & Rigging Files', id: 1, key: 'test/rigging', selected: 0},
      {label: 'User ACMS Tables', id: 2, key: 'acms', selected: 0}
    ],
    sortComboLabel: 'Sort by',
    sortCombo: [
      {label: 'File name (Alphabetically)', id: 0, key: 'fileName', selected: 1},
      {label: 'Date & Time', id: 2, key: 'dateDesc', selected: 0}
    ],
    data: {
      items: [
        { filename: 'mnt/ro_omseq/eqdb', type: '0', size: '60284', date: 'Apr 30 2018 1:58 PM' },
        { filename: 'mnt/ro_omst_d/iodb', type: '0', size: '53909', date: 'Apr 30 2018 1:58 PM' },
        { filename: 'mnt/ro_omstar/tardb', type: '0', size: '4253', date: 'Apr 30 2018 1:58 PM' },
        { filename: 'tmp/lruidb', type: '0', size: '17', date: 'Apr 30 2018 1:58 PM' },

        { filename: 'mnt/ro_omstar/imatardb', type: '1', size: '10073', date: 'Apr 30 2018 1:58 PM' },

        // { filename: 'tmp/acms', type: '2', size: '2388', date: 'Apr 30 2018 1:58 PM' },
        // { filename: 'tmp/acms/B', type: '2', size: '11698', date: 'Jan 01 2018 0:00 PM' }
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve) {
      resolve(self.payload)
    })
  }

})

module.exports = ViewUtilityViewLoadedMaintenanceFilesModel

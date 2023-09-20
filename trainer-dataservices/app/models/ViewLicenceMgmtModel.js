const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewLicenceMgmtModel () {
  const payload = {
    componentName: 'licencemgmt',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      activationNo: '03HTGL',
      licences: [
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'disabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'disabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'},
        {typeNo: '5678', type: 'Configure Wireless Lan', partNo: '1234', status: 'enabled'}
      ]
    }
  }

  return payload
}

module.exports = ViewLicenceMgmtModel

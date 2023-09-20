const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')

function ViewReloadDataSoftwareModel () {
  const payload = {
    componentName: 'reloaddatasoftware',
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    title: 'Reload Data Software',
    detailsHeader: 'Data & Software Details',
    errorsHeader: 'Load Error Summary',
    headerLeft: 'Data/Software',
    headerRight: 'Target/LRU',
    startLoadTxt: 'Initializing LRUs Please wait',
    data: [
      {itemName: 'item1', id: '0', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item2', id: '1', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item3', id: '2', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item4', id: '3', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item5', id: '4', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item6', id: '5', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item7', id: '6', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item8', id: '7', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item9', id: '8', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item10', id: '9', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item11', id: '10', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item12', id: '11', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item13', id: '12', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item14', id: '13', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item15', id: '14', selected: false, status: 'Error', data: ['abcd', 'efg']},
      {itemName: 'item16', id: '15', selected: false, status: 'Error', data: ['abcd', 'efg']}
    ],
    errors: [
      {itemName: 'item1', type: 'DCM L_DCM_A', error: 'An error occured'},
      {itemName: 'item2', type: 'targetLRU', error: 'Target not responsing'}
    ]
  }

  return payload
}

module.exports = ViewReloadDataSoftwareModel

const sqlite3 = require('sqlite3').verbose()
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewUtilityChangeAcftLifeCycleDataModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Change Aircraft Life Cycle Data',
    parentComponentName: 'utilityfunctions',
    componentName: 'acftlifecycledata',
    header: _nav.utilMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    sortedData: [],
    parameterGroupComboLabel: 'Parameter Group',
    parameterGroupCombo: [
    ],
    data: {
      parameters: [
      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data.parameters = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function () {
    let self = this

    const dbFile = self._config.privateDataPath + '/' + self._config.dataFileName

    return new Promise(function (resolve, reject) {
      let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })
      let sql = "SELECT * , (select count(*) FROM scnLifeCycleDatas  WHERE scenarioID ='" + self._config.defaultScenarioId + "' ) as count FROM scnLifeCycleDatas WHERE scenarioID  = '" + self._config.defaultScenarioId + "' ;"

      db.all(sql, [], (err, result) => {
        if (err) {
          return console.error(err.message)
        }
        resolve(result)

        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })
      })
    })
  },

  formatPayload: function () {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload().then(function (result) {
        let formatted = []
        for (let i in result) {
          formatted.push(
            {
              id: i,
              name: result[i]['name'],
              value: result[i]['value'],
              type: '0',
              uom: 'HRS'
            }
          )
        }
        resolve(formatted)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }

})

module.exports = ViewUtilityChangeAcftLifeCycleDataModel

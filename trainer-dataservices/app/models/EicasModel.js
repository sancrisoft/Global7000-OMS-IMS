const _ = require('lodash')
const sqlite3 = require('sqlite3').verbose()
const ConstantsModel = require('./ConstantsModel.js')
const config = require('../config/config.js')

const EicasModel = ({
  info: false,
  _config: Object.assign(config, {}),

  getEICAS: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)

    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
        if (_.isFunction(p_options.reduceCallback)) {
          result = p_options.reduceCallback(result)
        }

        resolve(result)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (p_options) {
    let self = this

    const dbFile = self._config.privateDataPath + '/' + self._config.dataFileName

    return new Promise(function (resolve, reject) {
      let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })

      let sql = ' SELECT Equation.EQID as eqid, FDECategoryDesc as category, FDECategory.FDECategoryID as order_id ,date_time, ' +
        ' Equation.`EqDesc` as name, occurences, status, scenarioID, scnFdes.id as id ' +
        ' FROM scnFdes ' +
        ' INNER JOIN Equation ON scnFdes.eqid = Equation.EQID ' +
        ' INNER JOIN FDEEquation on  FDEEquation.EqID = Equation.EQID ' +
        ' INNER JOIN FDECategory on  FDECategory.`FDECategoryID` = FDEEquation.`FDECategoryID` ' +
        ' WHERE scenarioID  = ' + (p_options.id || self._config.defaultScenarioId) +
        ' AND scnFdes.status LIKE "Active" ' +
        ' ORDER BY order_id ASC '

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

  formatPayload: function (p_options) {
    let self = this
    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(async function (result) {
        let formatted = []

        for (let i in result) {

          switch(result[i]['order_id']) {
            case 1:
              color = 'red'
              break
            case 2:
              color = 'yellow'
              break
            case 3:
              color = 'cyan'
              break
            case 4:
              color = 'cyan'
              break
            default:
              color = 'white'
          }
          if(result[i]['order_id'] !== 4){
            formatted.push(
              {
                label: result[i]['name'],
                color: color,
                blink: false
              }
            )
          }
        }

        resolve(formatted)

      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getEICASLRU: function () {
    return  [
      { label: 'RUDDER DEGRADED', color: 'yellow', blink: false },
      { label: 'MAINT MODE ACTIVE', color: 'cyan', blink: true },
      { label: 'INFO', color: 'cyan', blink: false }
    ]
  }
})

module.exports = EicasModel

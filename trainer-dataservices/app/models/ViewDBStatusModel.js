const sqlite3 = require('sqlite3').verbose()
const _nav = require('../models/HeaderNavModel.js')
const _eicas = require('../models/EicasModel.js')
const config = require('../config/config.js')

const ViewDBStatusModel = ({

  _config: Object.assign(config, {}),

  payload: {
    componentName: 'dbstatus',
    pageCounter: true,
    header: _nav.defaultMenuHeader(),
    eicasMessages: _eicas.getEICAS(),
    data: {
      statuses: [

      ]
    }
  },

  returnPayload: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload().then(function (result) {
        self.payload.data.statuses = result
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

      let sql = ' SELECT ' +
        ' CASE ' +
        " WHEN ((todayMinus != 0 AND DATETIME('now') >= datetime('now','-'||todayMinus||' DAY')) AND (todayPlus != 0 AND DATETIME('now') <= datetime('now','+'||todayPlus||' DAY') )) " +
        " THEN 'CURRENT' ELSE statusPartNo  " +
        ' END AS status, ' +
        ' CASE ' +
        " WHEN todayMinus = 0 THEN '' ELSE date('now','-'||todayMinus||' DAY')  " +
        ' END AS begin,  ' +
        ' CASE  ' +
        " WHEN todayPlus = 0 THEN '' ELSE date('now','+'||todayPlus||' DAY')  " +
        ' END AS end,  ' +
        ' statusPartNo ,  ' +
        ' identifier,  ' +
        ' cycleInfo,  ' +
        ' IMSdbstatus.database as name ,  ' +
        ' todayMinus as beginAS3, ' +
        ' todayPlus as endAS3 , ' +
        ' (SELECT count(*) FROM IMSdbstatus) as count  ' +
        ' FROM IMSdbstatus '

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
          let status =
            (result[i]['statusPartNo'] === 'Current' ||
              result[i]['statusPartNo'] === 'Not Current' ||
              result[i]['statusPartNo'] === 'Invalid'
            ) ? result[i]['statusPartNo']
              : 'Not Current'
          console.log(result[i]['cycleInfo'])
          formatted.push(
            {
              db: result[i]['name'],
              id: i,
              status: status.toUpperCase(),
              begin: result[i]['begin'] || '---',
              end: result[i]['end'] || '---',
              // begin: '01NOV2016',
              // end: '01NOV2016',
              details: [
                { label: 'Identifier', value: result[i]['identifier'] },
                { label: 'Cycle Information',
                  value: result[i]['cycleInfo'] // TODO: FORMAT THE CORRECT VALUES
                },
                { label: 'Coverage Region', value: 'World' }
              ]
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

module.exports = ViewDBStatusModel

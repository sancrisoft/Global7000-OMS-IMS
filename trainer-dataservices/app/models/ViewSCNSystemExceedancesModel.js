const sqlite3 = require('sqlite3').verbose()
const config = require('../config/config.js')
const CoreUtil = require('../utils/CoreUtil.js')
const SqlUtil = require('../utils/SqlUtil.js')

const ViewSCNSystemExceedancesModel = ({

  _config: Object.assign(config, {}),

  payload: {
    title: 'Scenario Builder',
    componentName: 'scnsystemexceedances',
    data: {
    }
  },

  returnPayload: function (p_options) {
    let self = this

    return new Promise(function (resolve, reject) {
      self.formatPayload(p_options).then(function (result) {
        self.payload.data = result
        resolve(self.payload)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  },

  getPayload: function (p_options) {
    let self = this
    // if (req.query.editor) {
    this._config.editMode = true
    // }

    let formData = p_options.data

    const dbFile = self._config.privateDataPath + '/' + self._config.dataFileName

    return new Promise(function (resolve, reject) {
      let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.log(err)
          reject(err)
        }
      })
      console.log(formData)
      let sql
      if (CoreUtil.isEquivalentString(formData.scn_Id, self._config.defaultScenarioId)) {
        sql = 'SELECT 0'
      } else if (formData.id) {
        sql = 'DELETE FROM scnSystemExceedances '

        if (p_options.action === 'edit') {
          sql = 'UPDATE scnSystemExceedances SET ' +
            'name = ""' +
            'acm_exceedance_ID = ' + SqlUtil.defaultTo(formData.cas, 'NULL') + ',' +
            'peak = ' + SqlUtil.defaultTo(formData.peak, 'NULL') + ',' +
            'duration = ' + SqlUtil.defaultTo(formData.duration, 'NULL') + ',' +
            'flightLeg = ' + SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' +
            'flightPhase = ' + SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' +
            'flightLegCounter = \'\', ' +
            'threshold = ' + SqlUtil.defaultTo(formData.threshold, 'NULL') + ',' +
            'date_time = ' + SqlUtil.defaultTo(formData.date, 'NULL') + ' '
        }

        sql += ' WHERE id = ' + formData.id
      } else {
        sql = 'INSERT INTO scnSystemExceedances ' +
          '(scenarioID, ' +
          'acm_exceedance_ID, ' +
          'peak, ' +
          'duration, ' +
          'flightLeg, ' +
          'flightPhase, ' +
          'flightLegCounter, ' +
          'threshold, ' +
          'date_time) ' +
          ' VALUES ' +
          '(' + SqlUtil.defaultTo(formData.scn_Id, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.cas, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.peak, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.duration, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightLeg, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.flightPhase, 'NULL') + ',' +
          '\'\',' +
          SqlUtil.defaultTo(formData.threshold, 'NULL') + ',' +
          SqlUtil.defaultTo(formData.date, 'NULL') +
          ') '
      }

      db.run(sql, [], function (err) {
        if (err) {
          return console.error(err.message)
        }

        // Return properties inherent to run(). (REF 7d475829-b0f7-4b7e-a4d0-ec35f3ab41ac)
        resolve({
          lastId: this.lastID,
          changes: this.changes
        })

        db.close((err) => {
          if (err) {
            console.log(err)
            reject(err)
          }
        })
      })
    })
  },

  formatPayload: function (p_options = {}) {
    p_options = Object.assign({ data: {}, store: {} }, p_options)
    if (p_options.id) {
      p_options.data.scn_Id = p_options.id
    }

    let self = this

    return new Promise(function (resolve, reject) {
      self.getPayload(p_options).then(function (result) {
        let formatted = {
          status: 'OK',
          lastId: result.lastId
        }

        resolve(formatted)
      }, function (err) {
        console.log(err)
        reject(err)
      })
    })
  }
})

module.exports = ViewSCNSystemExceedancesModel

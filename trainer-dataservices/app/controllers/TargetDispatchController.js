const config = require('../config/config.js')
const _eicas = require('../models/EicasModel.js')

const ViewMaintMenuModel = require('../models/ViewMaintMenuModel.js')
const ViewFlightDeckEffectsModel = require('../models/ViewFlightDeckEffectsModel.js')
const ViewFlightDeckEffectsSummaryModel = require('../models/ViewFlightDeckEffectsSummaryModel.js');
const ViewFaultMessagesModel = require('../models/ViewFaultMessagesModel.js')
const ViewFaultMessagesSummaryModel = require('../models/ViewFaultMessagesSummaryModel.js')
const ViewServiceMessagesModel = require('../models/ViewServiceMessagesModel.js')
const ViewServiceMessagesSummaryModel = require('../models/ViewServiceMessagesSummaryModel.js')
const ViewSystemExceedancesModel = require('../models/ViewSystemExceedancesModel.js')
const ViewSystemExceedancesSummaryModel = require('../models/ViewSystemExceedancesSummaryModel.js');
const ViewSystemTrendsModel = require('../models/ViewSystemTrendsModel.js')
const ViewSystemTrendsSummaryModel = require('../models/ViewSystemTrendsSummaryModel.js');
const ViewAircraftLifeCycleModel = require('../models/ViewAircraftLifeCycleModel.js')
const ViewSystemParametersModel = require('../models/ViewSystemParametersModel.js')
const ViewLruSysOperationsModel = require('../models/ViewLruSysOperationsModel.js')
const ViewLruSysDataReaderModel = require('../models/ViewLruSysDataReaderModel.js')
const ViewLruSysGenericPagingStatusModel = require('../models/ViewLruSysGenericPagingStatusModel.js')
const ViewLruSysGenericTestModel = require('../models/ViewLruSysGenericTestModel.js')
const ViewLruSysMaintenanaceReportsModel = require('../models/ViewLruSysMaintenanaceReportsModel.js')
const ViewSystemConfigurationModel = require('../models/ViewSystemConfigurationModel')
const ViewMaintReportsModel = require('../models/ViewMaintReportsModel')

const ViewUtilityFunctionsModel = require('../models/ViewUtilityFunctionsModel')
const ViewUtilityAutomaticallyInitiatedReportsModel = require('../models/ViewUtilityAutomaticallyInitiatedReportsModel')
const ViewUtilityChangeAcftLifeCycleDataModel = require('../models/ViewUtilityChangeAcftLifeCycleDataModel')
const ViewUtilityChangeAcftTailNumberModel = require('../models/ViewUtilityChangeAcftTailNumberModel')
const ViewUtilityDeleteMaintenanceFilesModel = require('../models/ViewUtilityDeleteMaintenanceFilesModel')
const ViewUtilityDeleteStoredMaintenanceFilesModel = require('../models/ViewUtilityDeleteStoredMaintenanceFilesModel')
const ViewUtilityIMAPartNumberXCheckModel = require('../models/ViewUtilityIMAPartNumberXCheckModel')
const ViewUtilityViewLoadedMaintenanceFilesModel = require('../models/ViewUtilityViewLoadedMaintenanceFilesModel')


const ViewInfoMgmtMenuModel = require('../models/ViewInfoMgmtMenuModel.js')
const ViewLicenceMgmtModel = require('../models/ViewLicenceMgmtModel.js')
const ViewConfigWirelessLanModel = require('../models/ViewConfigWirelessLanModel.js')
const viewManageWirelessLanConnectionModel = require('../models/ViewManageWirelessLanConnectionModel.js')
const ViewManageFilesModel = require('../models/ViewManageFilesModel.js')
const ViewBackupMediasetsModel = require('../models/ViewBackupMediasetsModel.js')
const ViewRestoreMediasetsModel = require('../models/ViewRestoreMediasetsModel.js')
const ViewManageCellularDeviceModel = require('../models/ViewManageCellularDeviceModel.js')
const ViewDataLoadMenuModel = require('../models/ViewDataLoadMenuModel.js')
const ViewDataLoadNewDocumentsTablesModel = require('../models/ViewDataLoadNewDocumentsTablesModel.js')
const ViewDataLoadNewMisconfiguredLRUModel = require('../models/ViewDataLoadNewMisconfiguredLRUModel.js')
const ViewDataLoadAircraftSoftwareSetModel = require('../models/ViewDataLoadAircraftSoftwareSetModel.js')
const ViewDataLoadReloadDataSoftwareModel = require('../models/ViewDataLoadReloadDataSoftwareModel.js')
const ViewDataLoadReloadLRUModel = require('../models/ViewDataLoadReloadLRUModel.js')
const ViewDataLoadModel = require('../models/ViewDataLoadModel.js')
const ViewDataLoadPerformFieldServiceDataLoadModel = require('../models/ViewDataLoadPerformFieldServiceDataLoadModel.js')
const ViewDBStatusModel = require('../models/ViewDBStatusModel.js')

const ViewScenarioBuilderModel = require('../models/ViewScenarioBuilderModel')
const ViewSCNFlightDeckEffectsModel = require('../models/ViewSCNFlightDeckEffectsModel')
const ViewSCNFaultMessagesModel = require('../models/ViewSCNFaultMessagesModel')
const ViewSCNServiceMessagesModel = require('../models/ViewSCNServiceMessagesModel')
const ViewSCNSystemExceedancesModel = require('../models/ViewSCNSystemExceedancesModel')
const ViewSCNSystemTrendsModel = require('../models/ViewSCNSystemTrendsModel')

const LruModule = require('../modules/LruModule')


const TargetDispatchController = ({

  _config: Object.assign(config, {}),

  /**
   * method to push the payload as a stringifyed JSON
   *
   * @param req
   * @param res
   */
  send: function (req, res) {
    let self = module.exports

    let params = {}

    switch (req.method) {
      case 'GET':
        params = req.query
        break
      case 'POST':
        params = req.body
        break
    }

    let target = params.target || ''

    let p_scnOptions = {
      action: params.action || '',
      id: params.scenario || self._config.defaultScenarioId,
      data: Object.assign({}, params.data, params.id ? {id : params.id} : {}),
      store: {},
      eicas: []
    }

    _eicas.getEICAS(p_scnOptions).then(function (result) {
      p_scnOptions.eicas = result
    }, function (err) {
      console.log(err)
    })

    switch (target.toLowerCase()) {
      case 'maintmenu':
        ViewMaintMenuModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'flightdeckeffects':
        ViewFlightDeckEffectsModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'flightdeckeffectssummary':
        ViewFlightDeckEffectsSummaryModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'faultmessages':
        ViewFaultMessagesModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'faultmessagessummary':
        ViewFaultMessagesSummaryModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'servicesmessages':
        ViewServiceMessagesModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'servicesmessagessummary':
        ViewServiceMessagesSummaryModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemexceedances':
        ViewSystemExceedancesModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemexceedancessummary':
        ViewSystemExceedancesSummaryModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'aircraftlifecycle':
        ViewAircraftLifeCycleModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemtrends':
        ViewSystemTrendsModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemtrendssummary':
        ViewSystemTrendsSummaryModel.returnPayload(p_scnOptions).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemparameters':
        ViewSystemParametersModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'lrusysoperations':
        ViewLruSysOperationsModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'lrusysdatareader':
        ViewLruSysDataReaderModel.returnPayload(req).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'lrusysgenericpagingstatus':
        ViewLruSysGenericPagingStatusModel.returnPayload(req).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'lrusysgenerictest':
        ViewLruSysGenericTestModel.returnPayload(req).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'lrusysmaintreports':
        ViewLruSysMaintenanaceReportsModel.returnPayload(req).then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'systemconfig':
        ViewSystemConfigurationModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'maintreports':
        ViewMaintReportsModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'utilityfunctions':
        ViewUtilityFunctionsModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'changeautomaticallyinitiatedreports':
        ViewUtilityAutomaticallyInitiatedReportsModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'acftlifecycledata':
        ViewUtilityChangeAcftLifeCycleDataModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'changeacfttailnumber':
        ViewUtilityChangeAcftTailNumberModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'deletemaintenancefiles':
        ViewUtilityDeleteMaintenanceFilesModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'deletestoredmaintenancedata':
        ViewUtilityDeleteStoredMaintenanceFilesModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'imapartnumbercrosscheckdetails':
        ViewUtilityIMAPartNumberXCheckModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'viewloadedmaintenancefiles':
        ViewUtilityViewLoadedMaintenanceFilesModel.returnPayload().then(function (result) {
          result.eicasMessages = p_scnOptions.eicas
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'infomgmtmenu':
        res.json(ViewInfoMgmtMenuModel())
        break
      case 'licencemgmt':
        res.json(ViewLicenceMgmtModel())
        break
      case 'configurewirelesslan':
        res.json(ViewConfigWirelessLanModel())
        break
      case 'managewirelesslanconnection':
        res.json(viewManageWirelessLanConnectionModel())
        break
      case 'managefiles':
        ViewManageFilesModel.returnPayload(req).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'backupmediasets':
        ViewBackupMediasetsModel.returnPayload(req).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'restoremediasets':
        ViewRestoreMediasetsModel.returnPayload(req).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'managecellulardevice':
        res.json(ViewManageCellularDeviceModel())
        break
      case 'dataloadmenu':
        res.json(ViewDataLoadMenuModel())
        break
      case 'loadnewdocumentstables':
        res.json(ViewDataLoadNewDocumentsTablesModel())
        break
      case 'loadnewmisconfiguredlru':
        res.json(ViewDataLoadNewMisconfiguredLRUModel())
        break
      case 'loadaircraftsoftwareset':
        res.json(ViewDataLoadAircraftSoftwareSetModel())
        break
      case 'reloaddatasoftware':
        res.json(ViewDataLoadReloadDataSoftwareModel())
        break
      case 'reloadlru':
        res.json(ViewDataLoadReloadLRUModel())
        break
      case 'dataload':
        res.json(ViewDataLoadModel())
        break
      case 'performfieldservicedataload':
        res.json(ViewDataLoadPerformFieldServiceDataLoadModel())
        break
      case 'dbstatus':
        ViewDBStatusModel.returnPayload().then(function (result) {

          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnbuilder':
        ViewScenarioBuilderModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnfde':
        ViewSCNFlightDeckEffectsModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnfaultmessages':
        ViewSCNFaultMessagesModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnservicemessages':
        ViewSCNServiceMessagesModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnsystemexceedances':
        ViewSCNSystemExceedancesModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnsystemtrends':
        ViewSCNSystemTrendsModel.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      case 'scnlrudata':
        LruModule.returnPayload(p_scnOptions).then(function (result) {
          res.json(result)
        }, function (err) {
          console.log(err)
          res.json(err)
        })
        break
      default:
        res.json({})
    }
  }
})

module.exports = TargetDispatchController

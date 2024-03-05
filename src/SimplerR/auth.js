
import { entity } from 'simpler-state'


export const CategorieLengthSet = entity(null)

export const ProjectLogoSet= entity(false)
export const SearchClientSet = entity(null)
export const ProductiveSheetId = entity(null)
export const WiringQuantitySheetId = entity(null)
export const LightQuantitySheetId = entity(null)
export const FireQuantitySheetId = entity(null)
export const ProductiveNameActive = entity(false)
export const UpdateSheetData = entity(false)
export const EntityShowProductiveEye = entity(null)
export const SheetUploadSucessCurrentData = entity(null)

export const ProjectObjectData = entity(null)
export const ViewZoneData = entity(false)
export const ViewSubZoneData = entity(false)

export const ProductivitySheetData = entity(null)
export const QuantityTOAchivedData = entity(null)

export const CurrentQuantityTOAchivedData = entity(null)


export const EmployeeChangeData = entity(null)
export const EquipmentAllData = entity(null)

export const ClientDataFreze = entity(null)
export const ProjectDataFreze = entity(null)


export const MyJobcardActivityCoard = entity(false)

export const MyjobCardAfterPtachApi = entity(false)
export const MyjobCardAfterPtachApiData = entity(false)
export const JobCardEmplyeData = entity(false)
export const JobCardEquipmentData = entity(false)
export const QuantityToBeAchived = entity(null)
export const CumilativeQuntity = entity(null)
export const CumilativeQuntityChange = entity(null)
export const ExceCuteDate = entity(new Date().toISOString().split('T')[0])





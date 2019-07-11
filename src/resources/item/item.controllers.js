import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

//TODO=== Export for Route
export default crudControllers(Item)

//! Can Overwrite with
// export default {
//     ...crudControllers(Item),
//     getOne(){
        
//     }
// }
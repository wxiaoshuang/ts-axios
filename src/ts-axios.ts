import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
function createAxiosInstance(): AxiosInstance {
  let instance = new Axios()
  let to = Axios.prototype.request.bind(instance)
  extend(to, instance)
  return to as AxiosInstance
}
const axios = createAxiosInstance()
export default axios

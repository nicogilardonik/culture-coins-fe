import axios from 'axios'


function createRequest(){
  //let baseURL = 'http://culture-coins-dev-be.us-east-1.elasticbeanstalk.com:3000/api/';
  console.log('process.env', process.env);
  console.log('process.env.VUE_BE_URL', process.env.VUE_BE_URL);
  let baseURL = process.env.VUE_APP_BE_URL
  
  let axiosObj = axios.create({
    baseURL,
    timeout: 10000,
  });

  return axiosObj
}


let axiosInstance = createRequest();


function armarUrl(controller, action, params) {
  
  let url =  '/' + controller
  if (action) url += '/' + action
  if (params) {
    if (Array.isArray(params)) {
      params.forEach((p) => (url += '/' + p))
    } else {
      url += '/' + params
    }
  }
  return url
}

// axiosInstance.interceptors.request.use(async reqConfig => {
//   //antes del request para cada request
//   //let access_token = AuthServices.getTokenFromStore();
//   let access_token = await fbAuth.currentUser.getIdToken();

//   if (access_token && access_token.length > 0) { //si existe un token
//     reqConfig.headers.Authorization = `Bearer ${access_token}`;
//   }
//   else{
//     //store.commit('auth/logout');
//     AuthServices.logout();
//   }
  
//   //reqConfig.baseURL = url;  
//   return reqConfig;
// });


class Api {
  async invokeApi(method, subPath, body) { 
    let url = armarUrl(subPath)
    let mensajeErrorGenerico =
      'Ocurrió un error inesperado, intente nuevamente más tarde'

    // Establecer configuraciones predeterminadas
    let requestConfig = {
      method,
      url,
      data: body,
    }

    // Si el cuerpo NO es FormData, establecemos el encabezado 'Content-Type' a 'application/json'
    if (!(body instanceof FormData)) {
      requestConfig.headers = {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }
  
    let response = null
    let errorInfo = null;
    try {
      response = await axiosInstance.request(requestConfig);

      if (response){
        if(response.data && response.data.ok) {
          // Se recibió una respuesta correcta de la API
          return response.data.data
        } else {
          errorInfo = this.getErrorInfo(response);
        }
      }

    } catch (error) {
      if(error.response && error.response.data){
        errorInfo = this.getErrorInfo(error.response.data); //Intento obtener el error de la API
      }
      if(!errorInfo){
        if (error.name && error.name == 'AxiosError') {
          errorInfo = { ok: false, error: error.message, errorCode: error.code }
        }
      }
    }
    
    //Si llega acá debería haber algún error
    if(!errorInfo){
      errorInfo = {
        ok: false
      }
    }

    errorInfo.errorType = "API";
    if(!errorInfo.error) errorInfo.Error = mensajeErrorGenerico;
    if(!errorInfo.errorCode) errorInfo.errorCode = 'ERR_UNKNOWN';

    throw errorInfo;
  }

  getErrorInfo(responseData){
    let result;
    if(responseData && responseData.error){
      result = {
        error: responseData.error,
        debug: responseData.debug ?? undefined
      }
    }
    return result;
  }

  async get(subPath) {
    return await this.invokeApi('get', subPath)
  }

  async post(subPath, body) {
    return await this.invokeApi('post', subPath, body)
  }

  async delete(subPath) {
    return await this.invokeApi('delete', subPath)
  }

  async put(subPath, body) {
    return await this.invokeApi('put', subPath, body)
  }
}

export default new Api()

import store from "@/store";

class ErrorHandler {
    async handleError(error) {
      console.log(error);
        store.commit("addError", {
          title: 'Error',
          errorSeverity: error.errorSeverity,
          errorType: error.errorType,
          errorCode: error.errorCode,
          message: error.message ? error.message :'Ocurrió un error'
        });
    }
}
  
export default new ErrorHandler()
export class Recognition {
    constructor(message, userToEmail, userFromEmail, category, subCategory) {
      this.message = message,
      this.userToEmail = userToEmail,//"banchero510@gmail.com" RECIBE
      this.userFromEmail = userFromEmail,
      //this.userToNickName = userToNickName,//"Joaquin" RECIBE
      //this.userFromNickName = userFromNickName//"Nicolas" LOGUEADO
      this.category = category,
      this.subCategory = subCategory
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   

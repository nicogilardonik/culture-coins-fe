export class Recognition {
    constructor(message, category, subCategory) {
      this.message = message,
      this.userToEmail = "banchero510@gmail.com",
      this.userToNickName = "Joaquin",
      this.userFromNickName = "Nicolas"
      this.category = category,
      this.subCategory = subCategory
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   

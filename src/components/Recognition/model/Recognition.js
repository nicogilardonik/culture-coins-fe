export class Recognition {
    constructor(message, category, subCategory) {
      this.userTo = "nicolas",
      this.userFrom = "joaquin",
      this.message = message,
      this.category = category,
      this.subCategory = subCategory
    }
  
    static fromJSON(json) {
      return new Recognition(json)
    }
  }


   

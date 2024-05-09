export const createBookSchema = {
  title: {
    exists: true,
    notEmpty: true,
    isString: true
  },
  author: {
    exists: true,
    notEmpty: true,
    isString: true
  },
  pages: {
    exists: true,
    notEmpty: true,
    isNumeric: true,
    custom: {
        options: (value : number) =>{
            if(value<=0){
                throw new Error('Pages have to be over 0')
            }
            return true
        }
    }
  }
}

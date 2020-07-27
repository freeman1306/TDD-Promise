function noop() {}


class customPromise{
    constructor(executor) {
        this.queue = []
        this.errorHandler = noop
        this.finallyHandler = noop

       try {
           executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
       } catch(e) {
            this.errorHandler(e)
       } finally {
            this.finallyHandler()
       }
   }

   onResolve(data) {
        this.queue.forEach(callback => {
           data = callback(data)
        })
   }

   onReject(error) {
        this.errorHandler(error)
   }

   then(fn){
        this.queue.push(fn)
       return this
   }

   catch(fn){
        this.errorHandler = fn
       return this
   }

   finally(fn){
        this.finallyHandler = fn
       return this
   }
}

const promise = new customPromise((resolve, reject) => {

    setTimeout(() => {
        resolve('NgRx')
    }, 150)
} )

promise
    .then(course => { course.toUpperCase()})
    .then(title => console.log('customPromise', title) )
    .catch(err => console.log('Error', err))
    .finally(() => {console.log('Finally')})

module.exports = customPromise

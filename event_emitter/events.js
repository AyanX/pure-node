
module.exports =  class EventEmitter {
    masterObject = {  }

    emit(event_name, ...args) {
        if(!this.masterObject[event_name] ){
            return undefined
        }
        this.masterObject[event_name].forEach(fn => {
            return fn(...args)
        });




        return this
    }
    on(event_name, fn) {
        this.masterObject[event_name] = this.masterObject[event_name] || []
       this.masterObject[event_name].push(fn)
       return this

    }
}


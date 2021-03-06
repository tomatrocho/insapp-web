class EventListController {
  constructor(Association, Event, association) {
    'ngInject'

    this._Association = Association
    this._Event = Event
    this._association = association

    this.isAllSetUp = (this._association.profileuploaded && this._association.profileuploaded !== '')

    this.runQuery()
  }
    
  runQuery() {
    this.loading = true

    this._Event
      .query({
        association: this._association.ID
      })
      .then(
        (res) => {
          this.list = res

          let allPastEvents = []
          let allEvents = []

          for (const event of this.list) {
            if (new Date(event.dateEnd).getTime() >= new Date().getTime()) {
              allEvents.push(event)
            } else {
              allPastEvents.push(event)
            }

            allEvents.sort((a, b) => {
              return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
            })
            allPastEvents.sort((a, b) => {
              return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
            })
          }

          this.events = allEvents
          this.pastEvents = allPastEvents

          this.loading = false
        }
      )
  }
}

export default EventListController

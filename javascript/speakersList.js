let SpeakersList = class {
  constructor(speakersJSON) {
    this.listeners = [];

    this.speakers = speakersJSON.map(json => new Speaker(json))
    this.speakers.forEach(speaker => speaker.addChangeListener(this))
  }

  getSpeaker(identifier) {
    return this.speakers.filter(speaker => speaker.identifier() == parseInt(identifier))[0]
  }

  addChangeListener(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener.modelChanged())
  }

  modelChanged() {
    this.notifyListeners()
  }
}

let FormView = class {
  constructor(speakerList) {
    this.speakerList = speakerList
    this.initialiseSpeakerDropdown()
    this.updateFormForSpeaker(this.speakerList.speakers[0])

    this._setupUIListeners()
    this.speakerList.addChangeListener(this)
  }

  _setupUIListeners() {
    this._speakerDropdown().addEventListener("change", (event) => {
      var id = event.target.selectedOptions[0].getAttribute("identifier")
      var speaker = this.speakerList.getSpeaker(id)
      this.updateFormForSpeaker(speaker)
    });

    for (let step = 0; step < this._ids().length; step++) {
      let id = this._ids()[step]
      document.getElementById(id).addEventListener("keyup", (event) => {
        var value = event.target.value
        var modelAttributeName = event.target.getAttribute("model-attribute-name")

        this._currentSpeaker().set(modelAttributeName, value)
      })
    }
  }

  initialiseSpeakerDropdown() {
    let dropdown = this._speakerDropdown()

    this.speakerList.speakers.forEach(function(speaker, index) {
      var optionHTML = "<option identifier=\"" + speaker.identifier() + "\""
      optionHTML += ">"
      optionHTML += speaker.name()
      optionHTML += "</option>"

      dropdown.innerHTML += optionHTML
    })
  }

  updateFormForSpeaker(speaker) {
    for (let step = 0; step < this._ids().length; step++) {
      var id = this._ids()[step]
      this._setFormValue(id, eval(`speaker.${id}()`))
    }
  }

  _setFormValue(id, value) {
    document.getElementById(id).value = value
  }

  _speakerDropdown() {
    return document.getElementById("speakers-dropdown")
  }

  _currentSpeaker() {
    var selectedOption = this._speakerDropdown().selectedOptions[0]
    var id = parseInt(selectedOption.getAttribute("identifier"))
    return this.speakerList.getSpeaker(id)
  }

  _ids() {
    return  [
      "name",
      "twitter",
      "nameX",
      "nameY",
      "nameFontAndSize",
      "twitterX",
      "twitterY",
      "twitterFontAndSize",
      "overlayX",
      "overlayY",
      "overlayWidth",
      "overlayHeight"
    ]
  }

  modelChanged() {
    var options = this._speakerDropdown().children
    this.speakerList.speakers.forEach(function(speaker) {
      var identifier = speaker.identifier()
      var option = Array.from(options).filter(option => speaker.identifier() == parseInt(option.getAttribute("identifier")))[0]
      option.text = speaker.name()
    })
  }

}

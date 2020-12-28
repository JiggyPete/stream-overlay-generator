let Speaker = class {
  constructor(speakerJSON) {
    this.listener = null;
    this.json = speakerJSON

    this.idValue = this.json["id"]

    this.nameValue = this.json["name"]["text"]
    this.nameXValue = this.json["name"]["x"]
    this.nameYValue = this.json["name"]["y"]
    this.nameFontAndSizeValue = this.json["name"]["font-and-size"]

    this.twitterValue = this.json["twitter"]["text"]
    this.twitterXValue = this.json["twitter"]["x"]
    this.twitterYValue = this.json["twitter"]["y"]
    this.twitterFontAndSizeValue = this.json["twitter"]["font-and-size"]

    this.overlayXValue = this.json["overlay"]["x"]
    this.overlayYValue = this.json["overlay"]["y"]
    this.overlayWidthValue = this.json["overlay"]["width"]
    this.overlayHeightValue = this.json["overlay"]["height"]
  }

  identifier() {
    return this.idValue
  }

  name() {
    return this.nameValue
  }

  set(attributeName, value) {
    eval(`this.${attributeName} = "${value}"`)
    this.notifyListeners()
  }

  nameX() {
    return this.nameXValue
  }

  nameY() {
    return this.nameYValue
  }

  nameFontAndSize() {
    return this.nameFontAndSizeValue
  }

  twitter() {
    return this.twitterValue
  }

  twitterX() {
    return this.twitterXValue
  }

  twitterY() {
    return this.twitterYValue
  }

  twitterFontAndSize() {
    return this.twitterFontAndSizeValue
  }

  overlayX() {
    return this.overlayXValue
  }

  overlayY() {
    return this.overlayYValue
  }

  // overlayWidth() {
  //   return this.overlayWidthValue
  // }

  // overlayHeight() {
  //   return this.overlayHeightValue
  // }

  addChangeListener(listener) {
    this.listener = listener;
  }

  notifyListeners() {
    if(this.listener == null) {
      return
    }

    this.listener.modelChanged()
  }
}

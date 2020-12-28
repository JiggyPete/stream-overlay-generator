TextColour = "#303030"

let OverlaysView = class {
  constructor(speakersList) {
    this.speakersList = speakersList
    this.speakersList.addChangeListener(this)

    this._drawOverlays()
  }

  modelChanged() {
    this._drawOverlays()
  }

  _clearBackground(canvas, context) {
    context.globalAlpha = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
  }

  _drawOverlays() {
    var canvas = document.getElementsByTagName("canvas")[0]
    var context = canvas.getContext("2d");

    this._clearBackground(canvas, context)
    this.speakersList.speakers.forEach(speaker => this._drawOverlay(speaker, context))
  }

  _drawOverlay(speaker, context) {
    this._drawOverlayImage(speaker, context)
    context.fillStyle = TextColour


    setTimeout(function() {
      context.font = speaker.nameFontAndSize();
      context.fillStyle = TextColour
      context.fillText(speaker.name(), speaker.nameX(), speaker.nameY());

      context.font = speaker.twitterFontAndSize();
      context.fillText(speaker.twitter(), speaker.twitterX(), speaker.twitterY());

    }, 100)
  }

  _drawOverlayImage(speaker, context) {
    var img = new Image();
    img.onload = function(){
        context.imageSmoothingEnabled = true;
        // context.drawImage(img, speaker.overlayX(), speaker.overlayY(), speaker.overlayWidth(), speaker.overlayHeight());
        context.drawImage(img, speaker.overlayX(), speaker.overlayY(),);
    }
    img.src = "/images/overlay.png"
  }

  _drawName(speaker, context) {
    context.font = speaker.nameFontAndSize();
    context.letterSpacing = "100px"
    context.fillStyle ="#303030"

    context.fillText(speaker.name(), speaker.nameX(), speaker.nameY());
  }

  _drawTwitter(speaker, context) {
    context.font = speaker.twitterFontAndSize();
    context.letterSpacing = "100px"
    context.fillStyle ="#303030"

    context.fillText(speaker.twitter(), speaker.twitterX(), speaker.twitterY());
  }

  _drawNameAndTwitter(speaker, context) {
    this._drawName(speaker, context)
    this._drawTwitter(speaker, context)
  }

}

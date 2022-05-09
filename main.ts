let positionX = 0
let width = 0
basic.showIcon(IconNames.No)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Yes)
let facelist = ["Velata", "Margot", "Ernst"]
let numberFaces = facelist.length
basic.showString("" + (numberFaces))
basic.pause(500)
basic.clearScreen()
basic.forever(function () {
    huskylens.request()
    if (width != huskylens.readBox_s(Content3.width)) {
        width = huskylens.readBox_s(Content3.width)
        if (width > 0) {
            huskylens.writeOSD("width: " + convertToText(width), 20, 30)
        } else {
            huskylens.writeOSD("width: ---", 20, 30)
        }
    }
    if (positionX != huskylens.readBox_s(Content3.xCenter)) {
        positionX = huskylens.readBox_s(Content3.xCenter)
        if (width > 0) {
            huskylens.writeOSD("X: " + convertToText(positionX), 180, 30)
        } else {
            huskylens.writeOSD("X: ---", 180, 30)
        }
    }
})

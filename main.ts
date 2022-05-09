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
    }
    if (positionX != huskylens.readBox_s(Content3.xCenter)) {
        positionX = huskylens.readBox_s(Content3.xCenter)
    }
    if (width > 0) {
        huskylens.writeOSD("width: " + convertToText(width) + ", X: " + convertToText(positionX), 150, 30)
    } else {
        huskylens.clearOSD()
    }
})

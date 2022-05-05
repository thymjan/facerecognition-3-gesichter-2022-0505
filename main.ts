let recognizedID = 0
basic.showIcon(IconNames.No)
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_FACE_RECOGNITION)
basic.showIcon(IconNames.Yes)
let facelist = ["Velata", "Margot", "Ernst"]
let numberFaces = facelist.length
basic.showString("" + (numberFaces))
basic.forever(function () {
    huskylens.request()
    recognizedID = huskylens.readBox_s(Content3.ID)
    if (recognizedID >= 0 && recognizedID <= numberFaces) {
        huskylens.writeOSD("Hier ist", 129, 17)
        huskylens.writeOSD(facelist[recognizedID - 1], 100, 207)
        basic.showIcon(IconNames.Happy)
    } else {
        huskylens.clearOSD()
        basic.showIcon(IconNames.Sad)
    }
})

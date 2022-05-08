let actualID = 0
let recognizedID = 0
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
    recognizedID = huskylens.readBox_s(Content3.ID)
    if (actualID != recognizedID) {
        if (recognizedID >= 0 && recognizedID <= numberFaces) {
            huskylens.writeOSD(facelist[recognizedID - 1], 100, 207)
            motors.dualMotorPower(Motor.AB, 50)
            basic.setLedColor(0x00ff00)
        } else {
            huskylens.clearOSD()
            motors.dualMotorPower(Motor.AB, 0)
            basic.setLedColor(0xff0000)
        }
        actualID = recognizedID
    }
})

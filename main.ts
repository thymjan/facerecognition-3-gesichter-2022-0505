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
let NewX = 0
let OldX = 0
let XL = 50
let XR = 50
let Grundgeschwindigkeit = 75
basic.forever(function () {
    huskylens.request()
    NewX = huskylens.readBox_s(Content3.xCenter)
    recognizedID = huskylens.readBox_s(Content3.ID)
    if (OldX != NewX && recognizedID > 0) {
        if (Grundgeschwindigkeit < 75) {
            Grundgeschwindigkeit += 1
        }
        XL = Grundgeschwindigkeit + Math.map(NewX, 0, 320, -25, 25)
        XR = Grundgeschwindigkeit - Math.map(NewX, 0, 320, -25, 25)
        motors.dualMotorPower(Motor.A, XR)
        motors.dualMotorPower(Motor.B, XL)
        OldX = NewX
    } else if (recognizedID < 0) {
        if (Grundgeschwindigkeit >= 1) {
            Grundgeschwindigkeit += -1
            XL = Grundgeschwindigkeit
            XR = Grundgeschwindigkeit
            motors.dualMotorPower(Motor.A, XR)
            motors.dualMotorPower(Motor.B, XL)
        }
    }
})

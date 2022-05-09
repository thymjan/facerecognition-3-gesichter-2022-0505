function steuereMotoren (links: number, rechts: number, fahr: number) {
    motors.dualMotorPower(Motor.A, 30 * fahr + 25 * links)
    motors.dualMotorPower(Motor.B, 30 * fahr + 25 * rechts)
}
let Rechtskurve = 0
let Linkskurve = 0
let positionX = 0
let Fahren = 0
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
/**
 * In welche Richtung fahren?
 */
basic.forever(function () {
    huskylens.request()
    if (width != huskylens.readBox_s(Content3.width)) {
        width = huskylens.readBox_s(Content3.width)
        if (width > 0) {
            huskylens.writeOSD("width: " + convertToText(width), 20, 30)
            if (width < 138) {
                Fahren = 1
            } else {
                Fahren = 0
            }
        } else {
            huskylens.writeOSD("width: ---", 20, 30)
        }
    }
    if (positionX != huskylens.readBox_s(Content3.xCenter)) {
        positionX = huskylens.readBox_s(Content3.xCenter)
        if (positionX > 0) {
            huskylens.writeOSD("X: " + convertToText(positionX), 180, 30)
            if (positionX < 160) {
                Linkskurve = 1
                Rechtskurve = 0
            } else if (positionX > 160) {
                Linkskurve = 0
                Rechtskurve = 1
            } else {
                Linkskurve = 0
                Rechtskurve = 0
            }
            steuereMotoren(Linkskurve, Rechtskurve, Fahren)
        } else {
            huskylens.writeOSD("X: ---", 180, 30)
        }
    }
})

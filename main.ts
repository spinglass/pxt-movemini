
enum IndicatorSide {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="both"
    Both,
}

enum TurnDirection {
    //% block="left"
    Left,
    //% block="right"
    Right,
}

//% color=190 weight=100 icon="\uf013" block=":Move Mini"
//% groups=['Lights', 'Movement', 'Setup']
namespace movemini {

    let leds = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
    let turnFactor = 220

    //% group="Setup"
    //% block
    export function testLeds(): void {
        leds.clear();
        leds.setPixelColor(0, neopixel.colors(NeoPixelColors.Red));
        leds.setPixelColor(1, neopixel.colors(NeoPixelColors.Yellow));
        leds.setPixelColor(2, neopixel.colors(NeoPixelColors.Green));
        leds.setPixelColor(3, neopixel.colors(NeoPixelColors.Blue));
        leds.setPixelColor(4, neopixel.colors(NeoPixelColors.Purple));
        leds.show();

        for (let i = 0; i < 20; ++i) {
            basic.pause(100);
            leds.rotate();
            leds.show();
        }
        basic.pause(100);
        clearLights();
    }

    //% group="Setup"
    //% block
    //% brightness.min=0 brightness.max=100
    export function setBrightness(brightness: number): void {
        leds.setBrightness(2.55 * brightness)
    }

    //% group="Setup"
    //% block
    //% factor.min=100 factor.max=500, factor.defl=200
    export function setTurnFactor(factor: number): void {
        turnFactor = factor
    }

    //% group="Lights"
    //%block
    export function clearLights(): void {
        leds.clear();
        leds.show();
    }

    //% group="Lights"
    //% block
    export function showHeadlights(): void {
        leds.clear();
        leds.range(1, 3).showColor(neopixel.colors(NeoPixelColors.Green));
    }

    //% group="Lights"
    //% block
    export function showBrakelights(): void {
        leds.clear();
        leds.range(1, 3).showColor(neopixel.colors(NeoPixelColors.Red));
        basic.pause(500);
        leds.clear();
        leds.show();
    }

    //% group="Lights"
    //% block
    export function showReverseLights(): void {
        leds.clear();
        leds.setPixelColor(1, neopixel.colors(NeoPixelColors.White));
        leds.setPixelColor(3, neopixel.colors(NeoPixelColors.White));
        leds.show();
    }

    //% group="Lights"
    //% block
    //% count.min=1 count.max=10, count.defl=1
    export function showIndicator(side: IndicatorSide, count: number): void {

        // Side is based on forwards travel direction of the :Move
        leds.clear();

        for (let i = 0; i < count; ++i) {
            if (side == IndicatorSide.Left || side == IndicatorSide.Both) {
                leds.setPixelColor(4, neopixel.colors(NeoPixelColors.Orange));
            }
            if (side == IndicatorSide.Right || side == IndicatorSide.Both) {
                leds.setPixelColor(0, neopixel.colors(NeoPixelColors.Orange));
            }
            leds.show();
            basic.pause(250);
            leds.clear();
            leds.show();

            if (i + 1 < count) {
                basic.pause(250);
            }
        }
    }

    function stop(): void {
        pins.servoWritePin(AnalogPin.P1, 90)
        pins.servoWritePin(AnalogPin.P2, 90)
    }

    //% group="Movement"
    //% block
    //% seconds.min=1 seconds.max=10, seconds.defl=1
    export function forwards(seconds: number): void {
        pins.servoWritePin(AnalogPin.P1, 0);
        pins.servoWritePin(AnalogPin.P2, 180);
        basic.pause(1000 * seconds);
        stop();
    }

    //% group="Movement"
    //% block
    //% seconds.min=1 seconds.max=10, seconds.defl=1
    export function backwards(seconds: number): void {
        pins.servoWritePin(AnalogPin.P1, 180);
        pins.servoWritePin(AnalogPin.P2, 0);
        basic.pause(1000 * seconds);
        stop();
    }

    //% group="Movement"
    //% block
    //% count.min=1 count.max=4, count.defl=1
    export function turn(dir: TurnDirection, count: number): void {
        if (dir == TurnDirection.Left) {
            pins.servoWritePin(AnalogPin.P1, 45);
            pins.servoWritePin(AnalogPin.P2, 45);
        } else {
            pins.servoWritePin(AnalogPin.P1, 135);
            pins.servoWritePin(AnalogPin.P2, 135);
        }
        basic.pause((90 * 1000 * count) / turnFactor);
        stop();
    }
}
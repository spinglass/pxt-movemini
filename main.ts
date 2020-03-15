
enum Side {
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="both"
    Both,
}

//% color=190 weight=100 icon="\uf013" block=":Move Mini"
namespace movemini {

    let leds = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)

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

        showHeadlights();
        basic.pause(250);
        showBrakelights();
        basic.pause(250);
        showIndicator(Side.Left, 2);
        basic.pause(250);
        showIndicator(Side.Right, 2);
        basic.pause(250);
        showIndicator(Side.Both, 2);
        clearLights();
    }

    //% block
    //% brightness.min=0 brightness.max=100
    export function setBrightness(brightness: number): void {
        leds.setBrightness(2.55 * brightness)
    }

    //%block
    export function clearLights(): void {
        leds.clear();
        leds.show();
    }

    //% block
    export function showHeadlights(): void {
        leds.clear();
        leds.range(1, 3).showColor(neopixel.colors(NeoPixelColors.Green));
    }

    //% block
    export function showBrakelights(): void {
        leds.clear();
        leds.range(1, 3).showColor(neopixel.colors(NeoPixelColors.Red));
    }

    //% block
    //% count.min=1 count.max=10, count.defl=1
    export function showIndicator(side: Side, count: number): void {

        // Side is based on forwards travel direction of the :Move
        leds.clear();

        for (let i = 0; i < count; ++i) {
            if (side == Side.Left || side == Side.Both) {
                leds.setPixelColor(4, neopixel.colors(NeoPixelColors.Orange));
            }
            if (side == Side.Right || side == Side.Both) {
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
}
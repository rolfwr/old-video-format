import { readHeader, headerSize, paletteSize } from "./eg1986Header";
import { updateFrame } from "./eg1986DeltaFrame";
import { getBit } from "./bits";

export class HamVideo {
  dw: DataView;
  onePlaneByteSize: number;
  swapChain: [Uint8ClampedArray, Uint8ClampedArray] | null;
  palettePos: number;
  firstFramePos: number;

  frameNumber = 0;
  nextDeltaFramePos: number;
  readonly header: {
    frames: number;
    width: number;
    height: number;
  }

  constructor(private data: Uint8ClampedArray) {
    let pos = 0;
    this.dw = new DataView(data.buffer, 0);
    this.header = readHeader(this.dw, 0);
    pos += headerSize;

    this.palettePos = pos;
    pos += paletteSize;
  


    const pixelCount = this.header.width * this.header.height;
    this.onePlaneByteSize = Math.ceil(pixelCount / 8);
    const planesSize = this.onePlaneByteSize * 6;
    this.firstFramePos = pos;
    let planes = data.slice(pos, pos + planesSize);
    this.swapChain = [planes, new Uint8ClampedArray(planes)];
    this.nextDeltaFramePos = pos + planesSize;
  }

  getPalette() {
    return this.data.slice(this.palettePos, this.palettePos + paletteSize);
  }


  readHamFrameBuffer() {
    if (this.frameNumber == 0) {
      const planesSize = this.onePlaneByteSize * 6;
      let afterPlanes = this.firstFramePos + planesSize;
      let planes = this.data.slice(this.firstFramePos, this.firstFramePos + planesSize);
      this.swapChain = [planes, new Uint8ClampedArray(planes)];
      this.nextDeltaFramePos = afterPlanes;
      ++this.frameNumber;
      return this.swapChain[0];
    }

    let pos = this.nextDeltaFramePos;
    this.nextDeltaFramePos += 4 + this.dw.getUint32(pos);
    pos += 4;

    if (this.swapChain === null) {
      throw new Error('Expected swapChain');
    }

    const nextPlanes = this.swapChain[1];
    updateFrame(nextPlanes, this.data, this.onePlaneByteSize, pos);
    this.swapChain.reverse();

    this.frameNumber = (this.frameNumber + 1) % (this.header.frames);
    return nextPlanes;
  }

  readFramePixels() {
    const hamFrame = this.readHamFrameBuffer();
    const pixelCount = this.header.width * this.header.height;
    return hamBitplanesToPixels(this.getPalette(), hamFrame, pixelCount);
  }
}

// TODO: Consider unifying with hamDecompress()
function hamBitplanesToPixels(palette: Uint8ClampedArray, bitplanes: Uint8ClampedArray, pixelCount: number) {
  let r = 0;
  let g = 0;
  let b = 0;
  let j = 0;
  const output = new Uint8ClampedArray(pixelCount * 4);
  for (let i = 0; i < pixelCount; ++i) {
    const v0 = getBit(bitplanes, pixelCount * 0 + i) ? 1 : 0;
    const v1 = getBit(bitplanes, pixelCount * 1 + i) ? 1 : 0;
    const v2 = getBit(bitplanes, pixelCount * 2 + i) ? 1 : 0;
    const v3 = getBit(bitplanes, pixelCount * 3 + i) ? 1 : 0;
    const val = (v3 << 3) | (v2 << 2) | (v1 << 1) | v0;
  
    const c0 = getBit(bitplanes, pixelCount * 4 + i) ? 1 : 0;
    const c1 = getBit(bitplanes, pixelCount * 5 + i) ? 1 : 0;
    const code = (c1 << 1) | c0;

    switch (code) {
      case 0:
        const palOff = val * 3;
        r = palette[palOff]
        g = palette[palOff + 1];
        b = palette[palOff + 2];
        break;
      case 1:
        b = val;
        break;
      case 2:
        r = val;
        break;
      case 3:
        g = val;
        break;
    }

    output[j++] = crt4BitToSrgb(r);
    output[j++] = crt4BitToSrgb(g);
    output[j++] = crt4BitToSrgb(b);
    output[j++] = 0xff;

  }
  return output;
}

export function crt4BitToSrgb(value: number) {
  const averageCrtGamma = 2.5;
  const linear = Math.pow(value / 15, averageCrtGamma);
  if (linear <= 0.0031308) {
    return Math.round(linear * 12.92 * 255);
  }
  return Math.round((1.055 * Math.pow(linear, 1/2.4) - 0.055) * 255);
}

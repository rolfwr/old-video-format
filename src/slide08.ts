import { chunkBitplanes } from "./lib/bitplanes";
import { normalize } from "./lib/normalize";
import { bitmapOffset, headerSize, paletteSize, readHeader } from "./lib/eg1986Header";
import { updateFrame } from "./lib/eg1986DeltaFrame";
import { hamDecompress } from "./lib/holdAndModify";
import { fetchBytes } from "./lib/fetchBytes";
import { srgbToPixels } from "./lib/srgbToPixels";
import { showPixels } from "./lib/showPixels";
import { showJson } from "./lib/showJson";
import { byteToGrayScalePixels } from "./lib/byteToGrayScalePixels";

export const title = 'Dekode videorammer';

export async function slide08(parent: HTMLElement) {
  const videoUrl = 'data/movie.data';
  const data = await fetchBytes(videoUrl);

  const dw = new DataView(data.buffer);
  let pos = 0;

  const header = readHeader(dw, pos);
  pos += headerSize;

  const palette = data.slice(pos, pos + paletteSize);
  pos += paletteSize;

  const pixelCount = header.width * header.height;
  const onePlaneByteSize = Math.ceil(pixelCount / 8);
  const planesSize = onePlaneByteSize * 6;

  const bitplanes = data.slice(pos);
  pos += planesSize;


  showPixels(parent, srgbToPixels(normalize(palette)));


  const values0 = chunkBitplanes(bitplanes, pixelCount, 0, 4);
  const codes0 = chunkBitplanes(bitplanes, pixelCount, 4, 2);
  showPixels(parent, byteToGrayScalePixels(normalize(values0)), header.width);
  showPixels(parent, byteToGrayScalePixels(normalize(codes0)), header.width);

  showPixels(
    parent,
    srgbToPixels(normalize(hamDecompress(values0, codes0, palette))),
    header.width
  );

  showJson(
    parent,
    { pixelCount, onePlaneByteSize, planesSize, bitmapOffset, pos, len: data.length }
  );

  const copy = new Uint8ClampedArray(bitplanes.length);
  copy.set(bitplanes);
  const buffers = [bitplanes, copy];

  for (let i = 0; i < header.frames; ++i) {
    const buf = buffers[i % 2];
    const deltaSize = dw.getUint32(pos);
    pos += 4;

    updateFrame(buf, data, onePlaneByteSize, pos);
    pos += deltaSize;

    const values1 = chunkBitplanes(buf, pixelCount, 0, 4);
    const codes1 = chunkBitplanes(buf, pixelCount, 4, 2);
    showPixels(
      parent, 
      srgbToPixels(
        normalize(
          hamDecompress(values1, codes1, palette)
        )
      ),
      header.width
    );
  }
}


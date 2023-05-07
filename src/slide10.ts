import { showJson } from "./lib/showJson";
import { showHex } from "./lib/showHex";
import { indicateError } from "./lib/stripes";
import { createFFmpeg } from "@ffmpeg/ffmpeg";

export const title = 'Koding av MP4-video';

export async function slide10(parent: HTMLElement) {

  const len = 4 * 400 * 300;
  const srgba = new Uint8Array(len);
  // Create green opaque frame by setting G and A channels
  for (let i = 1; i < len; i += 2) {
    srgba[i] = 0xFF;
  }

  const mod = await import('@ffmpeg/core/dist/ffmpeg-core.js?url');
  const corePath = mod.default;

  const ffmpeg = createFFmpeg({
    corePath,
    log: true
  });
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'frames.rgba', srgba);
  await ffmpeg.run(
    '-f',
    'rawvideo',
    '-r',
    '25',
    '-s',
    '400x300',
    '-pix_fmt',
    'rgba',
    '-i',
    'frames.rgba',
    '-pix_fmt',
    'yuv420p',
    'encoded.mp4'
  );
  const encoded = ffmpeg.FS('readFile', 'encoded.mp4');

  showHex(parent, encoded);

  const videoUrl = URL.createObjectURL(new Blob(
    [encoded.buffer],
    { type: 'video/mp4' }
  ));
  showJson(parent, videoUrl);

  const video = parent.ownerDocument.createElement('video')
  video.onerror = indicateError;
  video.src = videoUrl;
  parent.appendChild(video);
}

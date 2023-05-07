import { fetchBytes } from "./lib/fetchBytes";
import { showJson } from "./lib/showJson";

export const title = 'Omkoding til MP4-video';

export async function slide11(parent: HTMLElement) {

  const data = await fetchBytes('data/movie.data');
  showJson(parent, { originalLength: data.byteLength});

  /*
  const hamVideo = new HamVideo(data);

  const rawFrameLength = hamVideo.header.width * hamVideo.header.height * 4;
  const rawVideoLength =  rawFrameLength * hamVideo.header.frames;

  const rawVideoBytes = new Uint8Array(rawVideoLength);

  for (let i = 0; i < hamVideo.header.frames; ++i) {
    const pixels = hamVideo.readFramePixels();
    rawVideoBytes.set(pixels, rawFrameLength * i);
  }

  showJson(parent, { rawVideoLength, originalCompression: rawVideoLength / data.byteLength });
  */

  /*
  const mod = await import('@ffmpeg/core/dist/ffmpeg-core.js?url');
  const corePath = mod.default;

  const ffmpeg = createFFmpeg({ corePath, log: true });
  await ffmpeg.load();
  ffmpeg.FS('writeFile', 'frames.rgba', rawVideoBytes);
  await ffmpeg.run(
    '-f',
    'rawvideo',
    '-r',
    '25',
    '-s',
    hamVideo.header.width + 'x' + hamVideo.header.height,
    '-pix_fmt',
    'rgba',
    '-i',
    'frames.rgba',
    '-pix_fmt',
    'yuv420p',
    'encoded.mp4'
  );
  const encoded = ffmpeg.FS('readFile', 'encoded.mp4');
  showJson(parent, { transcodedLength: encoded.byteLength, newCompression: rawVideoLength / encoded.byteLength });
  */

  /*
  const videoUrl = URL.createObjectURL(new Blob(
    [encoded.buffer],
    { type: 'video/mp4' }
  ));

  const video = parent.ownerDocument.createElement('video')
  video.onerror = indicateError;
  video.src = videoUrl;
  video.controls = true;
  video.loop = true;
  parent.appendChild(video);
  */
}

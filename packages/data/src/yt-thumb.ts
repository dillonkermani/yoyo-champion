// YouTube thumbnail URL helper. Today this points at the public YouTube CDN.
// When we migrate to our own CDN, change buildUrl() in one place.

export type YtThumbSize = 'default' | 'hq' | 'sd' | 'max';

const FILE_BY_SIZE: Record<YtThumbSize, string> = {
  default: 'default',
  hq: 'hqdefault',
  sd: 'sddefault',
  max: 'maxresdefault',
};

export function ytThumb(videoId: string, size: YtThumbSize = 'hq'): string {
  return `https://i.ytimg.com/vi/${videoId}/${FILE_BY_SIZE[size]}.jpg`;
}

export interface YtThumbnailSet {
  default: string;
  hq: string;
  sd: string;
  max: string;
}

export function ytThumbSet(videoId: string): YtThumbnailSet {
  return {
    default: ytThumb(videoId, 'default'),
    hq: ytThumb(videoId, 'hq'),
    sd: ytThumb(videoId, 'sd'),
    max: ytThumb(videoId, 'max'),
  };
}

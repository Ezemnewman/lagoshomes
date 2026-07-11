import Icon from "./Icon";

/**
 * Main image + 2-thumbnail row, with a video play button overlay on the
 * main image and a "+N Photos" overlay on the last thumbnail. Takes a
 * `photos` array and `videoUrl` so a listing without a video just omits
 * the play button, and the photo count is computed instead of hardcoded.
 */
export default function PropertyGallery({ photos, videoUrl, totalPhotoCount }) {
  const [mainPhoto, ...restPhotos] = photos;
  const remainingCount = totalPhotoCount ? totalPhotoCount - photos.length : 0;

  return (
    <section className="space-y-4">
      <div className="relative group aspect-[16/9] overflow-hidden rounded-xl bg-surface-container property-shadow">
        <img src={mainPhoto.url} alt={mainPhoto.alt} className="w-full h-full object-cover" />

        {videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all duration-300">
            <button className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full flex items-center gap-3 shadow-xl hover:scale-105 transition-transform">
              <Icon name="play_circle" className="text-primary" filled />
              <span className="font-headline-sm text-primary">Play Video</span>
            </button>
          </div>
        )}
      </div>

      {restPhotos.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {restPhotos.map((photo, index) => {
            const isLast = index === restPhotos.length - 1;
            return (
              <div key={photo.url} className="aspect-[16/9] rounded-xl overflow-hidden property-shadow relative">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {isLast && remainingCount > 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer">
                    <span className="text-white font-headline-sm">+{remainingCount} Photos</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

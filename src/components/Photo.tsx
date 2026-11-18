import React, { useCallback, useEffect, useRef, useState } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  /** Classes for the frame (set the aspect ratio here, e.g. "aspect-[4/5]"). */
  className?: string;
  /** Classes for the <img> itself (hover zoom etc.). Defaults to cover-fit. */
  imgClassName?: string;
  /** Kept for call-site compatibility; photos are single files, so there is no srcset to size. */
  sizes?: string;
  /** Above-the-fold image: load eagerly and at high priority. */
  priority?: boolean;
  /** CSS object-position, e.g. "50% 30%". */
  position?: string;
  /** Used when `src` fails to load (a local path is recommended). */
  fallback?: string;
  children?: React.ReactNode;
};

/**
 * Photograph frame with a calm loading state: a soft skeleton shows while the image downloads, then the
 * photo fades in. The frame reserves its aspect ratio (no layout shift). Without JS, on the server, and
 * for already-cached images the photo is simply visible. If the image fails, the optional fallback is
 * tried once, then the frame keeps the neutral skeleton rather than showing a broken-image icon.
 */
export function Photo({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  priority = false,
  position,
  fallback,
  children,
}: PhotoProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [current, setCurrent] = useState(src);
  const [state, setState] = useState<"ready" | "loading" | "failed">("ready");

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  // After hydration: if the browser has not finished the image, show the skeleton until it does.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      setState(img.naturalWidth > 0 ? "ready" : "failed");
    } else {
      setState("loading");
    }
  }, [current]);

  const onLoad = useCallback(() => setState("ready"), []);
  const onError = useCallback(() => {
    if (fallback && current !== fallback) {
      setCurrent(fallback);
      setState("loading");
    } else {
      setState("failed");
    }
  }, [fallback, current]);

  return (
    // `relative` only when the caller has not already positioned the frame (e.g. "absolute inset-0"):
    // both utilities set `position`, and whichever is later in the stylesheet would silently win.
    <div className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative"} overflow-hidden bg-stone-200 ${className}`}>
      {state === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200" aria-hidden="true" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? ({ fetchpriority: "high" } as Record<string, string>) : {})}
        onLoad={onLoad}
        onError={onError}
        className={`${imgClassName} transition-[opacity,transform] duration-1000 ease-[cubic-bezier(.2,.7,.2,1)] ${state === "loading" || state === "failed" ? "opacity-0" : "opacity-100"}`}
        style={position ? { objectPosition: position } : undefined}
      />
      {children}
    </div>
  );
}

export default Photo;

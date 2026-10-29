'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw, Smartphone } from 'lucide-react';

interface ARViewerProps {
  modelUrl?: string;
  iosModelUrl?: string;
  dishName: string;
}

export default function ARViewer({ modelUrl, iosModelUrl, dishName }: ARViewerProps) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(!modelUrl);
  const [loadError, setLoadError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    import('@google/model-viewer').then(() => setMounted(true));
  }, []);

  // ref callback: se ejecuta cuando model-viewer entra al DOM, captura el evento load sin race condition
  const setViewerRef = useCallback((el: HTMLElement | null) => {
    viewerRef.current = el;
    if (!el) return;
    const onLoad = () => setIsLoaded(true);
    const onError = () => setLoadError(true);
    (el as any).addEventListener('load', onLoad);
    (el as any).addEventListener('error', onError);
    const t = window.setTimeout(() => {
      setIsLoaded(prev => { if (!prev) setLoadError(true); return prev; });
    }, 15000);
    return () => {
      (el as any).removeEventListener('load', onLoad);
      (el as any).removeEventListener('error', onError);
      window.clearTimeout(t);
    };
  }, []);

  const handleReset = () => {
    const el = viewerRef.current as any;
    if (el) el.resetTurntableRotation?.();
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
      style={{ minHeight: '380px' }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-900">
          {loadError ? (
            <>
              <p className="text-slate-300 text-sm font-medium">No se pudo cargar el modelo</p>
              <p className="text-slate-500 text-xs text-center px-4">
                Verificá tu conexión a internet
              </p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
              <p className="text-slate-400 text-sm">Cargando modelo 3D…</p>
            </>
          )}
        </div>
      )}

      {mounted && modelUrl && (
        // @ts-ignore
        <model-viewer
          ref={setViewerRef}
          src={modelUrl}
          {...(iosModelUrl ? { 'ios-src': iosModelUrl } : {})}
          alt={`Modelo 3D de ${dishName}`}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          environment-image="neutral"
          style={{ width: '100%', height: '380px', background: 'transparent' }}
        />
      )}

      {mounted && !modelUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-500 text-sm">Sin modelo 3D disponible</p>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={handleReset}
          title="Reiniciar vista"
          className="p-2 rounded-xl bg-slate-800/80 backdrop-blur border border-slate-600 text-slate-300 hover:text-white hover:border-orange-500 transition-all"
        >
          <RotateCcw size={16} />
        </button>

        {iosModelUrl ? (
          <a
            href={iosModelUrl}
            rel="ar"
            className="flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur border transition-all text-sm font-medium bg-orange-500 border-orange-400 text-white"
          >
            {/* iOS Quick Look requiere img como primer hijo del anchor */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt=""
              style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}
            />
            <Smartphone size={16} />
            Ver en AR
          </a>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 backdrop-blur border border-slate-600 text-slate-400 text-sm font-medium cursor-default"
          >
            <Smartphone size={16} />
            AR en móvil
          </button>
        )}
      </div>

      <div className="absolute top-4 left-4 z-20">
        <span className="px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold tracking-wider">
          3D · AR
        </span>
      </div>
    </div>
  );
}

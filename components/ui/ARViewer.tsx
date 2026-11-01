'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Smartphone } from 'lucide-react';

const MODEL_VIEWER_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
const LOAD_TIMEOUT_MS = 20000;

interface ARViewerProps {
  modelUrl?: string;
  /** false deja el modelo sin AR en iPhone, para los que pesan demasiado para Quick Look */
  iosAr?: boolean;
  dishName: string;
}

export default function ARViewer({ modelUrl, iosAr = true, dishName }: ARViewerProps) {
  const viewerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    if (!modelUrl) return;

    if (!document.querySelector(`script[src="${MODEL_VIEWER_SRC}"]`)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = MODEL_VIEWER_SRC;
      script.onerror = () => { setModelError(true); setReady(true); };
      document.head.appendChild(script);
    }

    let active = true;
    customElements.whenDefined('model-viewer').then(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, [modelUrl]);

  useEffect(() => {
    if (!ready || !modelUrl) return;
    const el = viewerRef.current;
    if (!el) return;

    const timeout = setTimeout(() => setModelError(true), LOAD_TIMEOUT_MS);
    const onLoad = () => { clearTimeout(timeout); setModelLoaded(true); };
    const onError = () => { clearTimeout(timeout); setModelError(true); };
    el.addEventListener('load', onLoad);
    el.addEventListener('error', onError);
    if (el.loaded) onLoad();

    return () => {
      el.removeEventListener('load', onLoad);
      el.removeEventListener('error', onError);
      clearTimeout(timeout);
    };
  }, [ready, modelUrl]);

  const showSpinner = !!modelUrl && !modelLoaded && !modelError;

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700"
      style={{ minHeight: '380px' }}
    >
      {/* Overlay de carga / error */}
      {(showSpinner || modelError) && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-900">
          {modelError ? (
            <>
              <p className="text-slate-300 text-sm font-medium">No se pudo cargar el modelo</p>
              <p className="text-slate-500 text-xs text-center px-4">Verificá tu conexión a internet</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
              <p className="text-slate-400 text-sm">Cargando modelo 3D…</p>
            </>
          )}
        </div>
      )}

      {/* model-viewer — solo renderiza cuando el custom element está registrado */}
      {ready && modelUrl && (
        <model-viewer
          ref={viewerRef}
          src={modelUrl}
          alt={`Modelo 3D de ${dishName}`}
          ar
          ar-modes={iosAr ? 'webxr scene-viewer quick-look' : 'webxr scene-viewer'}
          ar-scale="fixed"
          ar-placement="floor"
          camera-controls
          auto-rotate
          touch-action="pan-y"
          shadow-intensity="1"
          environment-image="neutral"
          style={{ width: '100%', height: '380px', background: 'transparent' }}
        >
          {/* model-viewer solo muestra este botón si el dispositivo puede abrir AR */}
          <button
            type="button"
            slot="ar-button"
            className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur border transition-all text-sm font-medium bg-orange-500 border-orange-400 text-white"
          >
            <Smartphone size={16} />
            Ver en AR
          </button>
        </model-viewer>
      )}

      {!modelUrl && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-slate-500 text-sm">Sin modelo 3D disponible</p>
        </div>
      )}

      {/* Controles */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => viewerRef.current?.resetTurntableRotation?.()}
          title="Reiniciar vista"
          className="p-2 rounded-xl bg-slate-800/80 backdrop-blur border border-slate-600 text-slate-300 hover:text-white hover:border-orange-500 transition-all"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-semibold tracking-wider">
          3D · AR
        </span>
      </div>
    </div>
  );
}

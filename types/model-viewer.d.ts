import type { ModelViewerElement } from '@google/model-viewer';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': Partial<ModelViewerElement> & {
        ref?: React.Ref<ModelViewerElement>;
        class?: string;
        style?: React.CSSProperties;
        children?: React.ReactNode;
      };
    }
  }
}

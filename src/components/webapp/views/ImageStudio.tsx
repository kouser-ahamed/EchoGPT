import React from 'react';
import { ImageStudioView } from './ImageStudioView';

export const ImageStudio: React.FC<{ onOpenUpgradeModal?: () => void }> = (props) => {
  return <ImageStudioView {...props} />;
};

export { ImageStudioView };
export default ImageStudio;

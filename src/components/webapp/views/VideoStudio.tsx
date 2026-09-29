import React from 'react';
import { VideoStudioView } from './VideoStudioView';

export const VideoStudio: React.FC<{ onOpenUpgradeModal?: () => void }> = (props) => {
  return <VideoStudioView {...props} />;
};

export { VideoStudioView };
export default VideoStudio;

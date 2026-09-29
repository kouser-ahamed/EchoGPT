import React from 'react';
import { SOPBuilderView } from '../components/webapp/views/SOPBuilderView';

export const SOPBuilderPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
      <SOPBuilderView />
    </div>
  );
};

export const AISOPBuilder = SOPBuilderPage;

export default SOPBuilderPage;

import React from 'react';
import { JobAnalysisView } from '../components/webapp/views/JobAnalysisView';

export const JobAnalysisPage: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-slate-950">
      <JobAnalysisView />
    </div>
  );
};

export const AIJobAnalysis = JobAnalysisPage;

export default JobAnalysisPage;

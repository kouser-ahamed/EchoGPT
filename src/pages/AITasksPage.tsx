import React from 'react';
import { TasksView } from '../components/webapp/views/TasksView';
import { TaskItem } from '../@types';

export interface AITasksPageProps {
  onSelectTask?: (task: TaskItem) => void;
}

export const AITasksPage: React.FC<AITasksPageProps> = ({ onSelectTask }) => {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
      <TasksView onSelectTask={onSelectTask} />
    </div>
  );
};

export default AITasksPage;

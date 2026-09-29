import React, { useState } from 'react';
import { TASK_CATEGORIES, AI_TASKS } from '../../../data/tasks';
import { useApp } from '../../../context/AppContext';
import { TaskItem } from '../../../@types';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Rocket,
  Zap,
  Briefcase,
  CheckSquare,
  FileText,
  Gamepad2,
  Compass,
  MessageCircle,
  Share2,
  Video,
  Smartphone,
  Tag,
  Layers,
  Play,
  Send,
  Search,
  Users,
  Mail,
  HelpCircle,
  Film,
  Bike,
  Mountain,
  Smile
} from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
  </svg>
);

interface TasksViewProps {
  onSelectTask?: (task: TaskItem) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onSelectTask }) => {
  const { showToast, setActiveView, createNewConversation, setPendingPrompt } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Ideas');
  const [search, setSearch] = useState<string>('');

  const handleTaskClick = (task: TaskItem) => {
    if (onSelectTask) {
      onSelectTask(task);
    } else {
      createNewConversation(`Task: ${task.title}`);
      setPendingPrompt(task.promptTemplate ? `${task.promptTemplate} ` : `Task: ${task.title}\n\n`);
      setActiveView('chat');
      showToast(`Selected "${task.title}". Blueprint loaded into Chat!`, 'success');
    }
  };

  const getTaskIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      case 'Mail': return <Mail className="w-5 h-5" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Bike': return <Bike className="w-5 h-5" />;
      case 'Mountain': return <Mountain className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Tag': return <Tag className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Play': return <Play className="w-5 h-5" />;
      case 'MessageCircle': return <MessageCircle className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Send': return <Send className="w-5 h-5" />;
      case 'Linkedin': return <LinkedinIcon className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredTasks = AI_TASKS.filter((t) => {
    const matchesCat = t.category === selectedCat;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Main Container matching ImageStudio width */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Prompt Engineering Directory</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">25 Templates</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Tasks Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Curated blueprints engineered to produce exceptional, high-yield results with leading models.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks & blueprints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/90 border border-slate-300 dark:border-slate-800 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto no-scrollbar">
          {TASK_CATEGORIES.map((cat) => {
            const count = AI_TASKS.filter((t) => t.category === cat).length;
            const isSelected = selectedCat === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-500/50 shadow-md shadow-indigo-600/20'
                    : 'bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 shadow-sm'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full py-16 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 space-y-2">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No tasks found matching your search</p>
              <p className="text-xs text-slate-500">Try searching for other keywords or switch categories</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="p-5 sm:p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-200 shadow-sm dark:shadow-xl group flex flex-col justify-between space-y-4 backdrop-blur-xl hover:-translate-y-0.5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-tr ${task.color} text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      {getTaskIcon(task.icon)}
                    </div>

                    {task.popular && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                        Popular
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                      {task.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[36px]">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-semibold group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                  <span>Launch Blueprint in Chat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TASK_CATEGORIES, AI_TASKS } from '../../../data/tasksData';
import { useApp } from '../../../context/AppContext';
import { LinkedinIcon } from '../../common/Icons';
import { TaskItem } from '../../../@types';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  Rocket,
  Zap,
  Briefcase,
  CheckSquare,
  Shield,
  FileCode,
  Gamepad2,
  BookOpen,
  Compass,
  MessageCircle,
  Share2,
  Video,
  Smartphone,
  Tag,
  Layers,
  Play,
  Send,
  Search
} from 'lucide-react';

interface TasksViewProps {
  onSelectTask?: (task: TaskItem) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onSelectTask }) => {
  const { showToast, setActiveView, createNewConversation } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('Ideas');
  const [search, setSearch] = useState<string>('');

  const handleTaskClick = (task: TaskItem) => {
    if (onSelectTask) {
      onSelectTask(task);
    } else {
      createNewConversation(`Task: ${task.title}`);
      setActiveView('chat');
      showToast(`Selected "${task.title}". Opened in Chat!`, 'success');
    }
  };

  const iconMap: Record<string, React.ReactElement> = {
    Lightbulb: <Lightbulb className="w-5 h-5" />,
    Rocket: <Rocket className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Briefcase: <Briefcase className="w-5 h-5" />,
    CheckSquare: <CheckSquare className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
    FileCode: <FileCode className="w-5 h-5" />,
    Gamepad2: <Gamepad2 className="w-5 h-5" />,
    BookOpen: <BookOpen className="w-5 h-5" />,
    Compass: <Compass className="w-5 h-5" />,
    MessageCircle: <MessageCircle className="w-5 h-5" />,
    Share2: <Share2 className="w-5 h-5" />,
    Video: <Video className="w-5 h-5" />,
    Smartphone: <Smartphone className="w-5 h-5" />,
    Tag: <Tag className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Play: <Play className="w-5 h-5" />,
    Linkedin: <LinkedinIcon className="w-5 h-5" />,
    Send: <Send className="w-5 h-5" />
  };

  const filteredTasks = AI_TASKS.filter((t) => {
    const matchesCat = t.category === selectedCat;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Prompt Engineering Directory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Tasks Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Curated blueprints engineered to produce exceptional, high-yield results with leading models.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
          {TASK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task)}
              className="p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-200 shadow-lg group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${task.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                    {iconMap[task.icon] || <Sparkles className="w-5 h-5" />}
                  </div>

                  {task.popular && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {task.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-semibold">
                <span>Launch in Chat</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

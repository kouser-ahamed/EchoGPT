import React, { useState } from 'react';
import { VIDEO_STUDIO_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { CreatedVideo } from '../../../@types';
import {
  Video,
  Play,
  Pause,
  Crown,
  Download,
  Loader2,
  Film
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VideoStudioViewProps {
  onOpenUpgradeModal?: () => void;
}

export const VideoStudioView: React.FC<VideoStudioViewProps> = ({ onOpenUpgradeModal }) => {
  const { showToast } = useApp();
  const [prompt, setPrompt] = useState<string>(
    'Hyper-lapse drone shot soaring through a cloud-covered neon metropolis at dusk, cinematic 4k'
  );
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [selectedModel, setSelectedModel] = useState<string>(VIDEO_STUDIO_MODELS[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const [videos, setVideos] = useState<CreatedVideo[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('echogpt-video-creations');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'vid-1',
        title: 'Neon Metropolis Flythrough',
        prompt: 'Hyper-lapse drone shot soaring through a cloud-covered neon metropolis at dusk',
        model: 'Veo 3.1 Fast',
        aspectRatio: '16:9',
        duration: '5 seconds',
        thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
        timestamp: '3h ago'
      },
      {
        id: 'vid-2',
        title: 'Liquid Mercury Sphere Orbit',
        prompt: 'Reflective chrome metallic liquid sphere rotating in zero gravity studio lighting',
        model: 'Sora v2 Turbo',
        aspectRatio: '9:16',
        duration: '8 seconds',
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        timestamp: 'Yesterday'
      },
      {
        id: 'vid-3',
        title: 'Cyberpunk Hyper-Car Drift',
        prompt: 'Cinematic low-angle camera tracking a sleek neon hyper-car drifting through rainy Tokyo streets',
        model: 'Runway Gen-3 Alpha',
        aspectRatio: '16:9',
        duration: '6 seconds',
        thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
        timestamp: '2 days ago'
      }
    ];
  });

  // Sync to LocalStorage
  React.useEffect(() => {
    try {
      localStorage.setItem('echogpt-video-creations', JSON.stringify(videos));
    } catch {
      // ignore
    }
  }, [videos]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const sampleThumbnails = [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80'
    ];

    const newVideo: CreatedVideo = {
      id: 'vid-' + Date.now(),
      title: prompt.slice(0, 32) + '...',
      prompt: prompt,
      model: VIDEO_STUDIO_MODELS.find(m => m.id === selectedModel)?.name || 'Veo 3.1 Fast',
      aspectRatio: aspectRatio,
      duration: '6 seconds',
      thumbnail: sampleThumbnails[Math.floor(Math.random() * sampleThumbnails.length)],
      timestamp: 'Just now'
    };

    setVideos((prev) => [newVideo, ...prev]);
    setIsGenerating(false);

    try {
      confetti({ particleCount: 50, spread: 65, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast('Video synthesized successfully!', 'success');
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-4 sm:p-8 space-y-8">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>Video Studio Pro</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Video Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Generate cinematic high-coherence motion videos with DeepMind Veo 3.1 and Sora Turbo.
            </p>
          </div>

          <button
            onClick={onOpenUpgradeModal}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Crown className="w-4 h-4" />
            <span>Upgrade for 4K Renders</span>
          </button>
        </div>

        {/* Prompt Composer Box */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Video Scene Prompt & Camera Direction
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe camera movement (pan, tilt, drone flythrough), atmospheric effects, and subject action..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Model Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Video Diffusion Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-200 focus:ring-2 focus:ring-cyan-500"
              >
                {VIDEO_STUDIO_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Aspect Ratio Pills */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 block">Camera Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
                {['16:9', '9:16', '1:1'].map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1 rounded-lg text-xs font-bold transition-colors ${
                      aspectRatio === ratio
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/25 transition-all active:scale-95"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rendering Frames...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Film className="w-4 h-4" />
                    <span>Generate Video</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
            <span>Standard generation duration: ~5-8 seconds per scene.</span>
            <span className="text-cyan-400 font-medium">Resolution: 1080p 60fps</span>
          </div>
        </div>

        {/* Gallery: Video Creations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Generated Videos ({videos.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Render queue complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((item) => {
              const isPlaying = playingId === item.id;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg group hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Play/Pause Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setPlayingId(isPlaying ? null : item.id)}
                        className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                      >
                        {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
                      </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-cyan-300 backdrop-blur-sm border border-white/10">
                        {item.model}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm border border-white/10">
                        {item.aspectRatio}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm">
                      {item.duration}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      "{item.prompt}"
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                      <span>{item.timestamp}</span>
                      <button
                        onClick={() => showToast('Video saved to MP4 download queue', 'success')}
                        className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export MP4</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

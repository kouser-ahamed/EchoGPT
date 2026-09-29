import React, { useState, useEffect, useRef } from 'react';
import { VIDEO_STUDIO_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { CreatedVideo, VideoStudioModel } from '../../../@types';
import {
  Film,
  Play,
  Pause,
  Crown,
  Download,
  Loader2,
  Upload,
  X,
  Sliders,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Copy,
  Trash2,
  RotateCcw,
  Check,
  Video,
  Wand2,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'echogpt-video-creations';

type VideoAspectRatio = '16:9' | '9:16' | '1:1' | 'auto';

const INITIAL_VIDEOS: CreatedVideo[] = [
  {
    id: 'vid-demo-1',
    title: 'Neon Metropolis Dusk Flythrough',
    prompt: 'Hyper-lapse drone shot soaring through a cloud-covered neon cyberpunk metropolis at dusk, cinematic volumetric fog, ray-traced reflections, 8k',
    model: 'Veo 3.1 Fast',
    provider: 'Google DeepMind',
    aspectRatio: '16:9',
    duration: '6s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 72,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80',
    timestamp: '25 mins ago'
  },
  {
    id: 'vid-demo-2',
    title: 'Liquid Mercury Kinetic Sculpture',
    prompt: 'Reflective chrome liquid sphere fluidly rotating and undulating in zero gravity, studio lighting, iridescent chromatic aberration',
    model: 'Sora v2 Turbo',
    provider: 'OpenAI',
    aspectRatio: '9:16',
    duration: '8s',
    resolution: '1080p HDR',
    fps: '60fps',
    motionStrength: 64,
    hasReference: true,
    referenceName: 'first-frame-mercury.png',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago'
  },
  {
    id: 'vid-demo-3',
    title: 'Cyberpunk Hypercar Rain Drift',
    prompt: 'Cinematic low-angle camera tracking a sleek neon hyper-car drifting smoothly through rain-slicked Tokyo streets, glowing neon signage',
    model: 'Runway Gen-3 Alpha',
    provider: 'Runway ML',
    aspectRatio: '16:9',
    duration: '6s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 85,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday'
  },
  {
    id: 'vid-demo-4',
    title: 'Deep Ocean Bioluminescent Bloom',
    prompt: 'Bioluminescent deep-sea jellyfish pulsing rhythmically through obsidian dark waters, ethereal cyan and magenta glow, macro fluid motion',
    model: 'Veo 3.1 Pro',
    provider: 'Google DeepMind',
    aspectRatio: '1:1',
    duration: '8s',
    resolution: '4K Ultra HD',
    fps: '60fps',
    motionStrength: 48,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    timestamp: '2 days ago'
  },
  {
    id: 'vid-demo-5',
    title: 'Orbital Station Solar Flare',
    prompt: 'Cinematic slow orbital sweep of an intricate glass and titanium space station orbiting Jupiter with solar flares in background',
    model: 'Sora Pro',
    provider: 'OpenAI',
    aspectRatio: '16:9',
    duration: '8s',
    resolution: '4K Ultra HD',
    fps: '60fps',
    motionStrength: 55,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
    timestamp: '3 days ago'
  },
  {
    id: 'vid-demo-6',
    title: 'Holographic Fluid Particle Flow',
    prompt: 'Iridescent liquid simulation flowing through glowing fiber-optic grids, vertical neon aesthetic, ultra crisp motion blur',
    model: 'Kling 2.0 Master',
    provider: 'Kuaishou AI',
    aspectRatio: '9:16',
    duration: '6s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 78,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    timestamp: '4 days ago'
  },
  {
    id: 'vid-demo-7',
    title: 'Glacial Cavern FPV Drone Descent',
    prompt: 'Fast FPV drone diving through an icy glacial crevasse with shimmering blue crystal ice and sunlight shafts piercing the mist',
    model: 'Runway Gen-3 Alpha',
    provider: 'Runway ML',
    aspectRatio: '16:9',
    duration: '6s',
    resolution: '4K Ultra HD',
    fps: '60fps',
    motionStrength: 90,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?w=1200&auto=format&fit=crop&q=80',
    timestamp: '5 days ago'
  },
  {
    id: 'vid-demo-8',
    title: 'Microscopic Nanotech Core Assembly',
    prompt: 'Nanobots assembling an intricate hexagonal crystalline quantum processor, macro cinematic depth of field, golden electrical sparks',
    model: 'Luma Dream Machine 2',
    provider: 'Luma AI',
    aspectRatio: '1:1',
    duration: '8s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 60,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
    timestamp: '6 days ago'
  },
  {
    id: 'vid-demo-9',
    title: 'Bioluminescent Canopy Canopy Glide',
    prompt: 'Slow glide through an ancient twilight forest with neon fungi, glowing pollen floating like stars, hyper-realistic physics',
    model: 'Veo 3.1 Fast',
    provider: 'Google DeepMind',
    aspectRatio: '16:9',
    duration: '6s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 50,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1200&auto=format&fit=crop&q=80',
    timestamp: '1 week ago'
  },
  {
    id: 'vid-demo-10',
    title: 'Cybernetic Humanoid Eye Lens Focus',
    prompt: 'Extreme macro zoom into an artificial bionic iris revealing micro-aperture blades spinning, laser alignment, and HUD reflections',
    model: 'Sora v2 Turbo',
    provider: 'OpenAI',
    aspectRatio: '9:16',
    duration: '8s',
    resolution: '4K Ultra HD',
    fps: '60fps',
    motionStrength: 68,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    timestamp: '1 week ago'
  },
  {
    id: 'vid-demo-11',
    title: 'Atmospheric Re-entry Plasma Burn',
    prompt: 'Space capsule entering upper atmosphere surrounded by glowing fiery hypersonic plasma sheath, high dynamic range cinematic shot',
    model: 'Runway Gen-3 Alpha',
    provider: 'Runway ML',
    aspectRatio: '16:9',
    duration: '6s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 82,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    timestamp: '2 weeks ago'
  },
  {
    id: 'vid-demo-12',
    title: 'Prismatic Laser Wave Matrix',
    prompt: 'Geometric optical prisms breaking lasers into sweeping volumetric chromatic waves, rhythmically pulsing, sleek dark studio',
    model: 'Kling 2.0 Master',
    provider: 'Kuaishou AI',
    aspectRatio: '1:1',
    duration: '8s',
    resolution: '1080p 60fps',
    fps: '60fps',
    motionStrength: 65,
    hasReference: false,
    thumbnail: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    timestamp: '2 weeks ago'
  }
];

interface VideoStudioViewProps {
  onOpenUpgradeModal?: () => void;
}

export const VideoStudioView: React.FC<VideoStudioViewProps> = ({ onOpenUpgradeModal }) => {
  const { showToast, setIsProModalOpen } = useApp();

  // Prompt & Controls state
  const [prompt, setPrompt] = useState<string>(
    'Hyper-lapse drone shot soaring through a cloud-covered neon metropolis at dusk, cinematic volumetric lighting, 8k'
  );
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>('16:9');
  const [selectedDuration, setSelectedDuration] = useState<string>('6s');
  const [selectedResolution, setSelectedResolution] = useState<'1080p' | '4K'>('1080p');
  const [selectedModelId, setSelectedModelId] = useState<string>('veo-3-1-fast');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Reference Video & First Frame Upload state
  const [referenceMedia, setReferenceMedia] = useState<string | null>(null);
  const [referenceMediaName, setReferenceMediaName] = useState<string>('');
  const [referenceMediaType, setReferenceMediaType] = useState<'image' | 'video' | null>(null);
  const [motionStrength, setMotionStrength] = useState<number>(64);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Model Selector Modal state
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);
  const [modelSearch, setModelSearch] = useState<string>('');
  const [modelTierFilter, setModelTierFilter] = useState<'ALL' | 'GOOGLE' | 'OPENAI' | 'FRONTIER'>('ALL');

  // Video Lightbox / Inspection Player Modal state
  const [previewVideo, setPreviewVideo] = useState<CreatedVideo | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [previewProgress, setPreviewProgress] = useState<number>(35);

  // Gallery state with LocalStorage persistence
  const [videos, setVideos] = useState<CreatedVideo[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_VIDEOS.length) return parsed;
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingIds = new Set(parsed.map((p: CreatedVideo) => p.id));
            const missing = INITIAL_VIDEOS.filter((v) => !existingIds.has(v.id));
            return [...parsed, ...missing];
          }
        }
      } catch (e) {
        console.error('Failed to load video creations from localStorage', e);
      }
    }
    return INITIAL_VIDEOS;
  });

  // Pagination & Filtering state
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [galleryFilter, setGalleryFilter] = useState<string>('ALL');

  // Sync videos to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.error('Failed to save video creations to localStorage', e);
    }
  }, [videos]);

  const activeModel: VideoStudioModel =
    VIDEO_STUDIO_MODELS.find((m) => m.id === selectedModelId) || VIDEO_STUDIO_MODELS[0];

  const aspectRatios: { id: VideoAspectRatio; label: string; subtitle: string }[] = [
    { id: '16:9', label: '16:9', subtitle: 'Cinema' },
    { id: '9:16', label: '9:16', subtitle: 'Reels / Story' },
    { id: '1:1', label: '1:1', subtitle: 'Square' },
    { id: 'auto', label: 'auto', subtitle: 'Smart' }
  ];

  const videoPresets: string[] = [
    'Drone FPV Sweep',
    'Tokyo Rain Drift',
    'Liquid Chrome Orbit',
    'Sci-Fi Hyperspace',
    'Bioluminescent Ocean',
    'Slow-Mo Particle Burst',
    'Cyberpunk Alley Run',
    'Cinematic Crane Down'
  ];

  // AI Prompt Enhance handler
  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      showToast('Please type a base prompt to enhance', 'warning');
      return;
    }
    const motionEnhancements = [
      ', 35mm anamorphic lens, continuous sweeping crane camera trajectory, natural atmospheric haze, volumetric god rays, fluid 60fps photorealism',
      ', dynamic forward drone motion, smooth kinetic inertia, shallow depth of field with cinematic rack focus, subtle lens flares, studio grade color timing',
      ', high-speed motion tracking shot, realistic fluid temporal physics, pristine reflective water droplets, cinematic 4K master grade'
    ];
    const addition = motionEnhancements[Math.floor(Math.random() * motionEnhancements.length)];
    setPrompt((prev) => prev.trim() + addition);
    showToast('Video prompt enriched with cinematic camera directives!', 'success');
  };

  // File Upload Handlers (Supports MP4, WebM, PNG, JPG)
  const processUploadedFile = (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.webm');

    if (!isImage && !isVideo) {
      showToast('Please upload a valid first frame image (PNG/JPG) or reference video (MP4/WebM)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setReferenceMedia(result);
      setReferenceMediaName(file.name);
      setReferenceMediaType(isVideo ? 'video' : 'image');
      showToast(`Loaded reference ${isVideo ? 'video' : 'first frame'}: ${file.name}`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveReferenceMedia = () => {
    setReferenceMedia(null);
    setReferenceMediaName('');
    setReferenceMediaType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Reference media cleared', 'info');
  };

  // Generate Video handler
  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const sampleThumbnails = [
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80'
    ];

    const newVideo: CreatedVideo = {
      id: 'vid-' + Date.now(),
      title: prompt.slice(0, 36) + (prompt.length > 36 ? '...' : ''),
      prompt: prompt,
      model: activeModel.name,
      provider: activeModel.provider,
      aspectRatio: aspectRatio,
      duration: selectedDuration,
      resolution: selectedResolution === '4K' ? '4K Ultra HD' : '1080p 60fps',
      fps: '60fps',
      motionStrength: referenceMedia ? motionStrength : undefined,
      hasReference: Boolean(referenceMedia),
      referenceName: referenceMediaName || undefined,
      thumbnail: referenceMedia && referenceMediaType === 'image'
        ? referenceMedia
        : sampleThumbnails[Math.floor(Math.random() * sampleThumbnails.length)],
      timestamp: 'Just now'
    };

    setVideos((prev) => [newVideo, ...prev]);
    setCurrentPage(1);
    setIsGenerating(false);

    try {
      confetti({ particleCount: 65, spread: 75, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast(`Rendered ${newVideo.duration} motion clip with ${activeModel.name}!`, 'success');
  };

  const handleGalleryFilter = (filter: string) => {
    setGalleryFilter(filter);
    setCurrentPage(1);
  };

  const handleExportMP4 = (video: CreatedVideo) => {
    const link = document.createElement('a');
    link.href = video.thumbnail;
    link.target = '_blank';
    link.download = `echogpt_${video.model.replace(/\s+/g, '_')}_${video.id}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${video.title} (${video.resolution || '1080p'})`, 'success');
  };

  const handleRemix = (video: CreatedVideo) => {
    setPrompt(video.prompt);
    if (['16:9', '9:16', '1:1', 'auto'].includes(video.aspectRatio)) {
      setAspectRatio(video.aspectRatio as VideoAspectRatio);
    }
    const matchedModel = VIDEO_STUDIO_MODELS.find((m) => m.name === video.model);
    if (matchedModel) setSelectedModelId(matchedModel.id);
    setPreviewVideo(null);
    showToast('Video directives loaded into Studio composer!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteVideo = (id: string) => {
    setVideos((prev) => {
      const updated = prev.filter((v) => v.id !== id);
      const remainingTotal = Math.max(1, Math.ceil(updated.length / itemsPerPage));
      if (currentPage > remainingTotal) {
        setCurrentPage(remainingTotal);
      }
      return updated;
    });
    if (previewVideo?.id === id) setPreviewVideo(null);
    showToast('Video removed from library', 'info');
  };

  // Filtered models for Choose a Model Modal
  const filteredModels = VIDEO_STUDIO_MODELS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.provider.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.description.toLowerCase().includes(modelSearch.toLowerCase());
    const matchesTier = modelTierFilter === 'ALL' || m.tier === modelTierFilter;
    return matchesSearch && matchesTier;
  });

  // Filtered and paginated videos for gallery
  const filteredVideos = videos.filter((item) => {
    if (galleryFilter === 'ALL') return true;
    return item.aspectRatio === galleryFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredVideos.length / itemsPerPage));
  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-slate-950 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Top Banner (Identical layout to Image Studio) */}
      <div className="max-w-6xl mx-auto w-full space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>VIDEO STUDIO PRO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-400 font-bold">6 Motion Engines Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Video Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Generate cinematic high-coherence motion videos with DeepMind Veo 3.1, Sora Turbo, and Runway Gen-3.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenUpgradeModal) onOpenUpgradeModal();
              else setIsProModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-cyan-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>Upgrade for 4K Renders</span>
          </button>
        </div>

        {/* Generation Control Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-5 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Model Selector Bar (Top of control card) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Motion Engine:</span>
              <button
                onClick={() => setIsModelModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-bold transition-all shadow-sm group"
                title="Click to Choose a Video Model"
              >
                <span className="text-base">{activeModel.avatar || '🎬'}</span>
                <span className="font-semibold text-cyan-300 group-hover:text-white transition-colors">
                  {activeModel.name}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {activeModel.badge}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Speed: <span className="text-emerald-400 font-semibold">{activeModel.speed || 'Fast'}</span> • Quality: <span className="text-cyan-400 font-semibold">{activeModel.quality || '1080p'}</span>
              </span>
              <button
                onClick={() => setIsModelModalOpen(true)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
              >
                Browse All Models
              </button>
            </div>
          </div>

          {/* Prompt Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Video Scene Prompt & Camera Direction
              </label>
              <button
                onClick={handleEnhancePrompt}
                className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
                title="Enhance prompt with cinematic camera movement and lighting directives"
              >
                <Wand2 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                <span>AI Enhance Prompt</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                placeholder="Describe scene action and camera movement... (e.g., A hyper-lapse drone shot soaring through a cyberpunk neon metropolis at dusk, cinematic volumetric fog, ray-traced reflections, 8k)"
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none transition-all leading-relaxed"
              />
              <div className="absolute right-3 bottom-3 text-[11px] text-slate-500 pointer-events-none">
                {prompt.length} chars
              </div>
            </div>

            {/* Prompt Preset Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
              <span className="text-[11px] text-slate-400 whitespace-nowrap mr-1 font-medium">Quick Presets:</span>
              {videoPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrompt((prev) => (prev ? `${prev}, ${preset}` : preset))}
                  className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs whitespace-nowrap border border-slate-700/60 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Video & First Frame Upload Dropzone */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  First Frame / Reference Video (Optional)
                </label>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                  Image-to-Video & Video-to-Video
                </span>
              </div>
              {referenceMedia && (
                <button
                  onClick={handleRemoveReferenceMedia}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove Media</span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,video/mp4,video/webm"
              onChange={handleFileUpload}
              className="hidden"
            />

            {!referenceMedia ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-950/70'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400 shadow-sm">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-center space-y-0.5">
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    Drop your first frame image or reference video here, or <span className="text-cyan-400 underline">browse files</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Supports PNG, JPG, MP4, WebM (Max 100MB). Starts synthesis from the uploaded visual anchor.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0 flex items-center justify-center">
                  {referenceMediaType === 'image' ? (
                    <img
                      src={referenceMedia}
                      alt="First Frame Reference"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-cyan-400 gap-1">
                      <Film className="w-6 h-6" />
                      <span className="text-[9px] font-mono uppercase text-slate-400">Video Ref</span>
                    </div>
                  )}
                  <button
                    onClick={handleRemoveReferenceMedia}
                    className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-white hover:text-rose-400 transition-colors"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white truncate max-w-xs">
                        {referenceMediaName}
                      </p>
                      <p className="text-[11px] text-cyan-400 font-medium">
                        {referenceMediaType === 'image' ? 'First Frame Anchor Image' : 'Reference Video-to-Video Track'}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      Motion Bucket: {motionStrength}
                    </span>
                  </div>

                  {/* Motion Bucket Slider (1 to 127) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-cyan-400" />
                        <span>Motion Bucket Intensity (1-127):</span>
                      </span>
                      <span className="text-slate-300 font-medium">
                        {motionStrength < 40 ? 'Subtle Drifts' : motionStrength < 86 ? 'Balanced Motion' : 'High Dynamic Action'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="127"
                      value={motionStrength}
                      onChange={(e) => setMotionStrength(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls Bar (Aspect Ratio, Duration, Resolution, Generate CTA) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3 border-t border-slate-800/80 items-end">
            {/* Aspect Ratio Selector */}
            <div className="lg:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Camera Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`py-1.5 px-1 rounded-xl text-center transition-all ${
                      aspectRatio === ratio.id
                        ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/20'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-xs font-bold block">{ratio.label}</span>
                    <span className="text-[9px] block text-slate-400 opacity-90">{ratio.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Resolution */}
            <div className="lg:col-span-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Duration
                </label>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedResolution('1080p')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      selectedResolution === '1080p'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    1080p
                  </button>
                  <button
                    onClick={() => setSelectedResolution('4K')}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      selectedResolution === '4K'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    4K Pro
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                {['4s', '6s', '8s', '12s'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDuration(d)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedDuration === d
                        ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Video Action Button (Fixed Static Label) */}
            <div className="lg:col-span-4 space-y-1.5">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-600/25 active:scale-95 transition-all"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rendering Frames ({activeModel.name})...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-cyan-300" />
                    <span>Generate Video</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Capability Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80 gap-2">
            <span>60fps motion interpolation • Zero temporal flickering • Audio-reactive ready</span>
            <span className="text-cyan-400 font-medium">Standard Generation: ~6-8s per scene</span>
          </div>
        </div>

        {/* Generated Videos Gallery (Responsive 4-column Grid matching Image Studio) */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <span>Generated Videos</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700 font-mono">
                  {filteredVideos.length} {filteredVideos.length === 1 ? 'item' : 'items'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Click any render to play in fullscreen, remix prompt directives, or export lossless MP4.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Aspect Ratio Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
                {(['ALL', '16:9', '9:16', '1:1'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => handleGalleryFilter(ratio)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                      galleryFilter === ratio
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {ratio === 'ALL' ? 'All' : ratio}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setVideos(INITIAL_VIDEOS);
                  setCurrentPage(1);
                  setGalleryFilter('ALL');
                  showToast('Restored demo video creations', 'info');
                }}
                className="text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 transition-colors"
                title="Restore default gallery items"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Clips</span>
              </button>
            </div>
          </div>

          {/* Cards Grid or Empty State */}
          {filteredVideos.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <Film className="w-12 h-12 text-slate-700 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-slate-300">No videos match filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No generated clips found for aspect ratio "{galleryFilter}". Switch to "All" or generate a new motion clip above.
              </p>
              <button
                onClick={() => handleGalleryFilter('ALL')}
                className="mt-2 px-4 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-colors"
              >
                Show All Videos
              </button>
            </div>
          ) : (
            <>
              {/* 4-Column Grid on Desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {paginatedVideos.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Visual Video Poster / Player Container */}
                    <div
                      onClick={() => {
                        setPreviewVideo(item);
                        setIsPlayingPreview(true);
                      }}
                      className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Play Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 flex items-center justify-center transition-colors">
                        <div className="w-10 h-10 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all">
                          <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-2 left-2 flex items-center gap-1 max-w-[70%]">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 text-cyan-300 backdrop-blur-md border border-white/10 truncate max-w-[95px]">
                          {item.model}
                        </span>
                        <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-black/80 text-slate-200 backdrop-blur-md border border-white/10">
                          {item.aspectRatio}
                        </span>
                      </div>

                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-emerald-400 backdrop-blur-md border border-white/10 font-bold">
                          {item.resolution?.split(' ')[0] || '1080p'}
                        </span>
                      </div>

                      {/* Bottom Duration & Motion indicator */}
                      <div className="absolute bottom-2 right-2 flex items-center gap-1">
                        {item.motionStrength && (
                          <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/80 text-cyan-300 backdrop-blur-md border border-white/10">
                            ⚡{item.motionStrength}
                          </span>
                        )}
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 text-white backdrop-blur-md font-bold">
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mt-1">
                          "{item.prompt}"
                        </p>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs gap-1">
                        <span className="text-[10px] text-slate-500 font-medium truncate">{item.timestamp}</span>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemix(item);
                            }}
                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] font-semibold transition-colors"
                            title="Remix prompt directives"
                          >
                            Remix
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportMP4(item);
                            }}
                            className="px-2 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold flex items-center gap-1 transition-colors"
                            title="Export MP4 video file"
                          >
                            <Download className="w-3 h-3" />
                            <span>MP4</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteVideo(item.id);
                            }}
                            className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls when total videos exceed 8 */}
              {filteredVideos.length > itemsPerPage && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="text-slate-400">
                    Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-semibold text-white">
                      {Math.min(currentPage * itemsPerPage, filteredVideos.length)}
                    </span>{' '}
                    of <span className="font-semibold text-white">{filteredVideos.length}</span> videos
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            currentPage === page
                              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 border border-cyan-500'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <span className="text-slate-400 px-1 font-medium">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* CHOOSE A VIDEO MODEL MODAL */}
      {isModelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Choose a Video Motion Engine</h3>
                  <p className="text-xs text-slate-400">
                    Select from 6 frontier motion models tailored for cinematic fidelity, physics, and speed.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModelModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Tier Filter Bar */}
            <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search engines (e.g. Veo, Sora, Kling)..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto">
                {(['ALL', 'GOOGLE', 'OPENAI', 'FRONTIER'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setModelTierFilter(tier)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                      modelTierFilter === tier
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-800/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Models List Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredModels.map((m) => {
                  const isSelected = selectedModelId === m.id;

                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModelId(m.id);
                        setIsModelModalOpen(false);
                        showToast(`Selected ${m.name} for video generation`, 'success');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500/50 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
                              {m.avatar || '🎬'}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                <span>{m.name}</span>
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />
                                )}
                              </h4>
                              <p className="text-[11px] text-slate-400 font-medium">{m.provider}</p>
                            </div>
                          </div>

                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                            {m.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                          {m.description}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          Speed: <strong className="text-emerald-400">{m.speed || 'Fast'}</strong>
                        </span>
                        <span className="text-cyan-400 font-semibold font-mono">
                          {m.quality || '1080p'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
              <span>All 6 models support 60fps frame synthesis & camera directives.</span>
              <button
                onClick={() => setIsModelModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN VIDEO PLAYER LIGHTBOX MODAL */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Lightbox Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {previewVideo.model}
                </span>
                <h4 className="text-sm font-bold text-white truncate max-w-md">
                  {previewVideo.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportMP4(previewVideo)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </button>

                <button
                  onClick={() => setPreviewVideo(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player Display Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[360px] sm:min-h-[480px]">
              <img
                src={previewVideo.thumbnail}
                alt={previewVideo.title}
                className="max-h-[60vh] w-auto max-w-full object-contain"
              />

              {/* Simulated Video Player Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col gap-2">
                {/* Progress bar scrubber */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setPreviewProgress(Math.round((clickX / rect.width) * 100));
                  }}
                  className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group"
                >
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-150"
                    style={{ width: `${previewProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                      className="p-1 text-white hover:text-cyan-400 transition-colors"
                    >
                      {isPlayingPreview ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-white hover:text-cyan-400 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="font-mono text-[11px] text-slate-300">
                      00:0{Math.floor((previewProgress / 100) * 6)} / {previewVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    <span>{previewVideo.resolution || '1080p 60fps'}</span>
                    <span>{previewVideo.aspectRatio}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Details Drawer */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 w-full sm:w-auto flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Generation Directives:
                </p>
                <p className="text-xs text-slate-200 leading-relaxed font-sans select-text">
                  "{previewVideo.prompt}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(previewVideo.prompt);
                    showToast('Copied video prompt to clipboard', 'success');
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </button>

                <button
                  onClick={() => handleRemix(previewVideo)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Remix in Studio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

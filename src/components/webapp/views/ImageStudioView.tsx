import React, { useState, useEffect, useRef } from 'react';
import { IMAGE_STUDIO_MODELS } from '../../../data/models';
import { useApp } from '../../../context/AppContext';
import { CreatedImage, AspectRatio, ImageStudioModel } from '../../../@types';
import {
  Sparkles,
  Image as ImageIcon,
  Wand2,
  Download,
  Maximize2,
  Sliders,
  Layers,
  Check,
  Crown,
  Loader2,
  Upload,
  X,
  Copy,
  Trash2,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'echogpt-image-creations';

const INITIAL_CREATIONS: CreatedImage[] = [
  {
    id: 'img-demo-1',
    prompt: 'Futuristic glassmorphic AI workstation overlooking a neon cyberpunk skyline, volumetric lighting, ray tracing, 8k resolution',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    model: 'Nano Banana 2 Lite',
    provider: 'Google',
    hasReference: false,
    timestamp: '20 mins ago'
  },
  {
    id: 'img-demo-2',
    prompt: 'Photorealistic close-up portrait of an android engineer with subtle fiber optic skin circuitry, cinematic lighting, shallow depth of field',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '3:2',
    model: 'GPT Image 2',
    provider: 'OpenAI',
    hasReference: true,
    referenceStrength: '65%',
    timestamp: '2 hours ago'
  },
  {
    id: 'img-demo-3',
    prompt: 'Isometric 3D floating cloud server architecture with glowing cyan optical cables, clean minimalist studio render, 4k',
    url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '1:1',
    model: 'Midjourney v6.1 Turbo',
    provider: 'Midjourney',
    hasReference: false,
    timestamp: 'Yesterday'
  },
  {
    id: 'img-demo-4',
    prompt: 'Bioluminescent jellyfish floating through an ethereal submerged ancient cathedral, deep atmospheric underwater haze',
    url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '9:16',
    model: 'FLUX.1 Schnell',
    provider: 'Black Forest Labs',
    hasReference: false,
    timestamp: '2 days ago'
  },
  {
    id: 'img-demo-5',
    prompt: 'Ethereal crystal sanctuary nestled inside a misty alpine glacier cavern, iridescent reflections, ambient soft glows',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '1:1',
    model: 'Imagen 3 Pro',
    provider: 'Google',
    hasReference: false,
    timestamp: '3 days ago'
  },
  {
    id: 'img-demo-6',
    prompt: 'Cyberpunk neon street ramen bar in rain with holographic kanji signs, reflections on wet asphalt, cinematic teal and orange',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    model: 'DALL-E 3 HD',
    provider: 'OpenAI',
    hasReference: false,
    timestamp: '4 days ago'
  },
  {
    id: 'img-demo-7',
    prompt: 'Macro photography of an emerald mechanical beetle with gold watchmaker gears, luxury studio lighting, depth of field',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '1:1',
    model: 'Midjourney v6.1',
    provider: 'Midjourney',
    hasReference: false,
    timestamp: '5 days ago'
  },
  {
    id: 'img-demo-8',
    prompt: 'Minimalist Scandinavian architectural pavilion floating above serene mirror lake at sunrise, foggy morning atmosphere',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '3:2',
    model: 'FLUX.1 Dev',
    provider: 'Black Forest Labs',
    hasReference: false,
    timestamp: '6 days ago'
  },
  {
    id: 'img-demo-9',
    prompt: 'Solarpunk eco-friendly high-rise towers covered with hanging vertical gardens and aerial tramways, bright sunny sky',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '9:16',
    model: 'Nano Banana 2 Lite',
    provider: 'Google',
    hasReference: false,
    timestamp: '1 week ago'
  },
  {
    id: 'img-demo-10',
    prompt: 'Futuristic holographic interface HUD floating in obsidian darkroom with golden optical fibers, cybernetic core',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    model: 'GPT Image 2',
    provider: 'OpenAI',
    hasReference: false,
    timestamp: '1 week ago'
  },
  {
    id: 'img-demo-11',
    prompt: 'Ancient mystical overgrown observatory on a cliff overlooking cosmic nebula stars, matte painting, hyper-detailed',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '16:9',
    model: 'Imagen 3 Fast',
    provider: 'Google',
    hasReference: false,
    timestamp: '2 weeks ago'
  },
  {
    id: 'img-demo-12',
    prompt: 'Abstract geometric glass prisms dispersing spectrum rainbow beams across velvet darkness, raytraced caustics',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
    aspectRatio: '1:1',
    model: 'Midjourney v6.1',
    provider: 'Midjourney',
    hasReference: false,
    timestamp: '2 weeks ago'
  }
];

interface ImageStudioViewProps {
  onOpenUpgradeModal?: () => void;
}

export const ImageStudioView: React.FC<ImageStudioViewProps> = ({ onOpenUpgradeModal }) => {
  const { showToast, setIsProModalOpen } = useApp();

  // Prompt & Controls state
  const [prompt, setPrompt] = useState<string>(
    'Futuristic glassmorphic AI workstation overlooking a neon cyberpunk skyline, cinematic lighting, 8k'
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [batchCount, setBatchCount] = useState<number>(2);
  const [selectedModelId, setSelectedModelId] = useState<string>('nano-banana-2-lite');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Reference Image Upload state
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceImageName, setReferenceImageName] = useState<string>('');
  const [referenceStrength, setReferenceStrength] = useState<number>(65);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Choose a Model Modal state
  const [isModelModalOpen, setIsModelModalOpen] = useState<boolean>(false);
  const [modelSearch, setModelSearch] = useState<string>('');
  const [modelTierFilter, setModelTierFilter] = useState<'ALL' | 'GOOGLE' | 'OPENAI' | 'FRONTIER'>('ALL');

  // Full-Res Preview Modal state
  const [previewCreation, setPreviewCreation] = useState<CreatedImage | null>(null);

  // Creations Gallery with LocalStorage persistence
  const [creations, setCreations] = useState<CreatedImage[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length >= INITIAL_CREATIONS.length) return parsed;
          if (Array.isArray(parsed) && parsed.length > 0) {
            const existingIds = new Set(parsed.map((p: CreatedImage) => p.id));
            const missing = INITIAL_CREATIONS.filter((c) => !existingIds.has(c.id));
            return [...parsed, ...missing];
          }
        }
      } catch (e) {
        console.error('Failed to load image creations from localStorage', e);
      }
    }
    return INITIAL_CREATIONS;
  });

  // Pagination & Filtering state
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [galleryFilter, setGalleryFilter] = useState<string>('ALL');

  // Sync creations to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(creations));
    } catch (e) {
      console.error('Failed to save image creations to localStorage', e);
    }
  }, [creations]);

  const activeModel: ImageStudioModel =
    IMAGE_STUDIO_MODELS.find((m) => m.id === selectedModelId) || IMAGE_STUDIO_MODELS[0];

  const aspectRatios: { id: AspectRatio; label: string; subtitle: string }[] = [
    { id: '1:1', label: '1:1', subtitle: 'Square' },
    { id: '3:2', label: '3:2', subtitle: 'Landscape' },
    { id: '2:3', label: '2:3', subtitle: 'Portrait' },
    { id: 'auto', label: 'auto', subtitle: 'Smart' },
    { id: '16:9', label: '16:9', subtitle: 'Cinema' },
    { id: '9:16', label: '9:16', subtitle: 'Story' }
  ];

  const promptPresets: string[] = [
    'Cinematic 8K',
    'Photorealistic Portrait',
    'Isometric 3D',
    'Cyberpunk Neon',
    'Minimalist Logo',
    'Anime Studio Ghibli',
    'Macro Nature',
    'Sci-Fi Concept'
  ];

  // Quick prompt enhance handler
  const handleEnhancePrompt = () => {
    if (!prompt.trim()) {
      showToast('Please type a base prompt to enhance', 'warning');
      return;
    }
    const enhancements = [
      ', volumetric studio lighting, octane render, photorealistic 8k, ray tracing, sharp focus, masterwork composition',
      ', cinematic film grain, natural rim lighting, hyper-detailed textures, award-winning photography, Hasselblad 50mm',
      ', intricate clean details, dynamic color grading, artstation trending, crisp edge lighting, high fidelity'
    ];
    const addition = enhancements[Math.floor(Math.random() * enhancements.length)];
    setPrompt((prev) => prev.trim() + addition);
    showToast('Prompt enriched with photographic styling keywords!', 'success');
  };

  // Image Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, WebP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setReferenceImage(result);
      setReferenceImageName(file.name);
      showToast(`Loaded reference image: ${file.name}`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveReferenceImage = () => {
    setReferenceImage(null);
    setReferenceImageName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Reference image removed', 'info');
  };

  // Generate Image handler
  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const sampleImages = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&auto=format&fit=crop&q=80'
    ];

    const newItems: CreatedImage[] = Array.from({ length: batchCount }).map((_, i) => ({
      id: 'img-' + Date.now() + '-' + i,
      prompt: prompt,
      url: sampleImages[Math.floor(Math.random() * sampleImages.length)],
      aspectRatio: aspectRatio,
      model: activeModel.name,
      provider: activeModel.provider,
      hasReference: !!referenceImage,
      referenceStrength: referenceImage ? `${referenceStrength}%` : null,
      timestamp: 'Just now'
    }));

    setCreations((prev) => [...newItems, ...prev]);
    setCurrentPage(1);
    setIsGenerating(false);

    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    showToast(`Generated ${batchCount}x image${batchCount > 1 ? 's' : ''} using ${activeModel.name}!`, 'success');
  };

  const handleGalleryFilter = (filter: string) => {
    setGalleryFilter(filter);
    setCurrentPage(1);
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Prompt copied to clipboard!', 'info');
  };

  const handleDeleteCreation = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCreations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      const remainingTotal = Math.max(1, Math.ceil(updated.length / itemsPerPage));
      if (currentPage > remainingTotal) {
        setCurrentPage(remainingTotal);
      }
      return updated;
    });
    if (previewCreation?.id === id) setPreviewCreation(null);
    showToast('Image removed from gallery', 'info');
  };

  const handleDownload = (item: CreatedImage, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const link = document.createElement('a');
    link.href = item.url;
    link.target = '_blank';
    link.download = `echogpt_${item.model.replace(/\s+/g, '_')}_${item.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Initiated high-res image download', 'success');
  };

  const handleRemix = (item: CreatedImage) => {
    setPrompt(item.prompt);
    setAspectRatio(item.aspectRatio as AspectRatio);
    setPreviewCreation(null);
    showToast('Remix loaded into Studio prompt composer!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered models for Choose a Model Modal
  const filteredModels = IMAGE_STUDIO_MODELS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.provider.toLowerCase().includes(modelSearch.toLowerCase()) ||
      m.description.toLowerCase().includes(modelSearch.toLowerCase());
    const matchesTier = modelTierFilter === 'ALL' || m.tier === modelTierFilter;
    return matchesSearch && matchesTier;
  });

  // Filtered and paginated creations for gallery
  const filteredCreations = creations.filter((item) => {
    if (galleryFilter === 'ALL') return true;
    return item.aspectRatio === galleryFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCreations.length / itemsPerPage));
  const paginatedCreations = filteredCreations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-3 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
      {/* Top Banner */}
      <div className="max-w-6xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Image Studio Pro</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">12 Engines Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI Image Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Generate photorealistic artwork, marketing assets, and concept mockups with frontier diffusion engines.
            </p>
          </div>

          <button
            onClick={() => {
              if (onOpenUpgradeModal) onOpenUpgradeModal();
              else setIsProModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Crown className="w-4 h-4 text-amber-300" />
            <span>Unlock 4K Unlimited</span>
          </button>
        </div>

        {/* Generation Control Card */}
        <div className="rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-xl dark:shadow-2xl p-4 sm:p-6 space-y-5 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Model Selector Bar (Top of control card) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Engine:</span>
              <button
                onClick={() => setIsModelModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/80 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-white text-xs font-bold transition-all shadow-sm group"
                title="Click to Choose a Model"
              >
                <span className="text-base">{activeModel.avatar}</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-800 dark:group-hover:text-white transition-colors">
                  {activeModel.name}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                  {activeModel.badge}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition-transform" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                Speed: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{activeModel.speed}</span> • Quality: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{activeModel.quality}</span>
              </span>
              <button
                onClick={() => setIsModelModalOpen(true)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold underline underline-offset-4"
              >
                Browse All Models
              </button>
            </div>
          </div>

          {/* Prompt Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Creative Prompt
              </label>
              <button
                onClick={handleEnhancePrompt}
                className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors group"
                title="Intelligently enhance prompt with photographic & lighting details"
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
                placeholder="Describe your imagination in detail... (e.g., A futuristic glassmorphic UI terminal floating over a cyberpunk neon skyline, volumetric lighting, ray tracing, 8k)"
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 resize-none transition-all shadow-inner"
              />
              <div className="absolute right-3 bottom-3 text-[11px] text-slate-400 dark:text-slate-500 pointer-events-none">
                {prompt.length} chars
              </div>
            </div>

            {/* Prompt Preset Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar momentum-scroll pt-1">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1 font-medium">Quick Presets:</span>
              {promptPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPrompt((prev) => (prev ? `${prev}, ${preset}` : preset))}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-950/60 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/40 text-[11px] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap transition-all shadow-xs"
                >
                  +{preset}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Image Upload Section (Image-to-Image) */}
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Reference Image (Image-to-Image)</span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline">Optional stylistic or structural guide</span>
              </div>

              {!referenceImage ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="reference-image-input"
                  />
                  <label
                    htmlFor="reference-image-input"
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                    <span>+ Upload reference image</span>
                  </label>
                </div>
              ) : (
                <button
                  onClick={handleRemoveReferenceImage}
                  className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Image</span>
                </button>
              )}
            </div>

            {/* Reference Image Preview & Strength Slider */}
            {referenceImage && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-md shrink-0 group">
                  <img
                    src={referenceImage}
                    alt="Reference preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={handleRemoveReferenceImage}
                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-xs">{referenceImageName}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">Image Influence: {referenceStrength}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="5"
                    value={referenceStrength}
                    onChange={(e) => setReferenceStrength(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                    <span>10% (Subtle color guidance)</span>
                    <span>50% (Balanced hybrid)</span>
                    <span>90% (Strict structural match)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Control Settings Row: Aspect Ratio + Batch Count */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Aspect Ratio Pills */}
            <div className="md:col-span-7 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Aspect Ratio</span>
              </label>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all ${
                      aspectRatio === ratio.id
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/25 border border-purple-400/40'
                        : 'bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <span>{ratio.label}</span>
                    <span className="text-[9px] opacity-75 font-normal">{ratio.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Batch Count Selector */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Batch Count</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    onClick={() => setBatchCount(count)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                      batchCount === count
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-600/25 border border-indigo-400/40'
                        : 'bg-slate-100 dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {count}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row: Generate Button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>
                Engine: <strong className="text-slate-800 dark:text-slate-200">{activeModel.name}</strong> • Generating {batchCount} output{batchCount > 1 ? 's' : ''} in {aspectRatio}
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className={`py-3 px-8 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                isGenerating || !prompt.trim()
                  ? 'bg-slate-200 text-slate-400 border border-slate-300 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:brightness-110 active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Synthesizing Diffusion Stream...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Generate {batchCount} Image{batchCount > 1 ? 's' : ''}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Your Creations Gallery */}
      <div className="max-w-6xl mx-auto w-full space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Creations</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
              {filteredCreations.length} {filteredCreations.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Aspect Ratio Filter Pills */}
            <div className="flex items-center gap-1 p-1 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl text-xs shadow-sm">
              {(['ALL', '1:1', '16:9', '9:16', '3:2'] as const).map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => handleGalleryFilter(ratio)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    galleryFilter === ratio
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {ratio === 'ALL' ? 'All' : ratio}
                </button>
              ))}
            </div>

            {creations.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all generated creations from your local gallery?')) {
                    setCreations([]);
                    setCurrentPage(1);
                    showToast('Gallery cleared', 'info');
                  }
                }}
                className="text-xs text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors flex items-center gap-1 ml-1 px-2 py-1"
                title="Clear all creations"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid or Empty State */}
        {filteredCreations.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 space-y-3 shadow-xs">
            <ImageIcon className="w-12 h-12 text-slate-400 dark:text-slate-700 mx-auto stroke-1" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-300">Your creations - Nothing here yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {galleryFilter !== 'ALL'
                ? `No artworks found for aspect ratio "${galleryFilter}". Try switching to "All" or create a new batch.`
                : 'Type a prompt above and click "Generate" to create high-fidelity artworks with Google, OpenAI, and Frontier diffusion models.'}
            </p>
            {galleryFilter !== 'ALL' ? (
              <button
                onClick={() => handleGalleryFilter('ALL')}
                className="mt-2 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-700 dark:text-purple-300 transition-colors"
              >
                Show All Images
              </button>
            ) : (
              <button
                onClick={() => {
                  setPrompt('Cyberpunk glass terminal displaying real-time quantum neural graphs');
                  handleGenerate();
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-xs font-semibold text-indigo-700 dark:text-indigo-300 transition-colors"
              >
                Try sample prompt
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {paginatedCreations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPreviewCreation(item)}
                  className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 dark:hover:border-purple-500/50 shadow-sm hover:shadow-md dark:shadow-lg cursor-pointer transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                    <img
                      src={item.url}
                      alt={item.prompt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white border border-white/10 uppercase">
                        {item.aspectRatio}
                      </span>
                      {item.hasReference && (
                        <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/80 backdrop-blur-md text-[10px] font-bold text-white">
                          Img2Img
                        </span>
                      )}
                    </div>

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyPrompt(item.prompt);
                          }}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white transition-colors"
                          title="Copy Prompt"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDownload(item, e)}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white transition-colors"
                          title="Download High-Res"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteCreation(item.id, e)}
                          className="p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-white line-clamp-2 font-medium">
                          "{item.prompt}"
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-300">
                          <span className="truncate">{item.model}</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Strip under image */}
                  <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate block">
                        {item.model}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{item.timestamp}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewCreation(item);
                      }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                      title="Inspect Full Resolution"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls when total images exceed 8 */}
            {filteredCreations.length > itemsPerPage && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
                <div className="text-slate-500 dark:text-slate-400">
                  Showing <span className="font-semibold text-slate-800 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {Math.min(currentPage * itemsPerPage, filteredCreations.length)}
                  </span>{' '}
                  of <span className="font-semibold text-slate-800 dark:text-white">{filteredCreations.length}</span> creations
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2.5 min-h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1 px-1 max-w-full overflow-x-auto no-scrollbar momentum-scroll py-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-11 h-11 sm:w-9 sm:h-9 rounded-lg text-xs font-bold transition-all ${
                          currentPage === page
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-500'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <span className="text-slate-500 dark:text-slate-400 px-1 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2.5 min-h-11 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm"
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

      {/* CHOOSE A MODEL MODAL (Exact Categorized Directory) */}
      {isModelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  <span>Choose a Diffusion Model</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select from Google, OpenAI, and Frontier image generation checkpoints
                </p>
              </div>

              <button
                onClick={() => setIsModelModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/40 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search models by name, tier, or features..."
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {modelSearch && (
                  <button
                    onClick={() => setModelSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar momentum-scroll">
                {[
                  { id: 'ALL', label: 'All Engines (12)' },
                  { id: 'GOOGLE', label: 'Google Tier (4)' },
                  { id: 'OPENAI', label: 'OpenAI Tier (5)' },
                  { id: 'FRONTIER', label: 'Additional Frontier (3)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setModelTierFilter(tab.id as 'ALL' | 'GOOGLE' | 'OPENAI' | 'FRONTIER')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      modelTierFilter === tab.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Models Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {filteredModels.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-xs">
                  No diffusion models matched your search "{modelSearch}"
                </div>
              ) : (
                filteredModels.map((m) => {
                  const isSelected = selectedModelId === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setSelectedModelId(m.id);
                        setIsModelModalOpen(false);
                        showToast(`Selected diffusion model: ${m.name}`, 'success');
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start justify-between gap-4 group ${
                        isSelected
                          ? 'bg-indigo-50/80 dark:bg-indigo-600/15 border-indigo-400 dark:border-indigo-500/50 shadow-md ring-1 ring-indigo-500/30'
                          : 'bg-slate-50/80 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3 truncate">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-lg shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                          {m.avatar}
                        </div>
                        <div className="truncate">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                              {m.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                              {m.provider}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 dark:border-purple-500/30">
                              {m.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {m.description}
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                            <span>Speed: <strong className="text-emerald-600 dark:text-emerald-400">{m.speed}</strong></span>
                            <span>•</span>
                            <span>Fidelity: <strong className="text-indigo-600 dark:text-indigo-400">{m.quality}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'border border-slate-300 dark:border-slate-700 group-hover:border-indigo-400 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Selected: <strong className="text-slate-900 dark:text-white">{activeModel.name}</strong> ({activeModel.provider})</span>
              <button
                onClick={() => setIsModelModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL-RESOLUTION PREVIEW MODAL */}
      {previewCreation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 dark:bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{previewCreation.model}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-500/30">
                  {previewCreation.aspectRatio}
                </span>
                {previewCreation.hasReference && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-500/30">
                    Ref Strength {previewCreation.referenceStrength}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyPrompt(previewCreation.prompt)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-transparent"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Prompt</span>
                </button>
                <button
                  onClick={() => handleDownload(previewCreation)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPreviewCreation(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-100 dark:bg-slate-950/80">
              <img
                src={previewCreation.url}
                alt={previewCreation.prompt}
                className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-slate-200 dark:border-slate-800"
              />
            </div>

            {/* Prompt & Metadata Details Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2.5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Generation Prompt</span>
                <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-mono select-all bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  "{previewCreation.prompt}"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
                <span>Created {previewCreation.timestamp} via {previewCreation.provider || 'EchoGPT Diffusion Engine'}</span>
                
                <button
                  onClick={() => handleRemix(previewCreation)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
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

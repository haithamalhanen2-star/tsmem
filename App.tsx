import React, { useState, useEffect } from 'react';
import { AppState, Language, AppMode } from './types';
import { TRANSLATIONS, MODE_CONFIG, INSTAGRAM_LINK } from './constants';
import { ImageUploader } from './components/ImageUploader';
import { LanguageSelector } from './components/LanguageSelector';
import { generateImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    image1: null,
    image2: null,
    generatedImage: null,
    isLoading: false,
    mode: AppMode.HUG_PAST_SELF,
    customPrompt: '',
    language: 'ar', // Default to Arabic as per context
    error: null,
  });

  const t = TRANSLATIONS[state.language];
  const isRTL = state.language === 'ar' || state.language === 'fa';
  const requiresTwoImages = MODE_CONFIG[state.mode].requiresTwoImages;

  // Convert File to Base64
  const handleFileUpload = (file: File, key: 'image1' | 'image2') => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setState(prev => ({ ...prev, [key]: reader.result as string, error: null }));
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!state.image1) {
      setState(prev => ({ ...prev, error: "Please upload the first image." }));
      return;
    }
    if (requiresTwoImages && !state.image2) {
      setState(prev => ({ ...prev, error: "Please upload the second image for this mode." }));
      return;
    }
    if (state.mode === AppMode.CUSTOM_TEXT && !state.customPrompt.trim()) {
      setState(prev => ({ ...prev, error: "Please enter a description." }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, generatedImage: null }));

    try {
      const result = await generateImage(state.mode, state.image1, state.image2, state.customPrompt);
      setState(prev => ({ ...prev, generatedImage: result, isLoading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, isLoading: false, error: err.message || "Failed to generate image." }));
    }
  };

  const handleDownload = () => {
    if (state.generatedImage) {
      const link = document.createElement('a');
      link.href = state.generatedImage;
      link.download = `fusion-ai-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`min-h-screen pb-10 transition-all duration-300 ${isRTL ? 'font-ar' : ''} ${state.language === 'fa' ? 'font-fa' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {t.title}
            </h1>
          </div>
          <LanguageSelector 
            currentLang={state.language} 
            onLanguageChange={(lang) => setState(prev => ({ ...prev, language: lang }))} 
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        {/* Result Area */}
        <section className={`bg-slate-800/40 rounded-3xl p-6 border border-white/5 flex flex-col items-center justify-center min-h-[300px] transition-all ${state.generatedImage ? 'shadow-[0_0_50px_rgba(59,130,246,0.2)]' : ''}`}>
           {state.isLoading ? (
             <div className="text-center space-y-4 animate-pulse">
               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
               <p className="text-blue-300 font-medium">{t.loading}</p>
             </div>
           ) : state.generatedImage ? (
             <div className="space-y-4 w-full flex flex-col items-center">
               <img src={state.generatedImage} alt="Generated" className="rounded-xl max-h-[60vh] object-contain shadow-2xl" />
               <button 
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all transform hover:scale-105"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                 </svg>
                 {t.downloadBtn}
               </button>
             </div>
           ) : (
             <div className="text-center text-slate-500 space-y-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <p>{t.uploadTitle}</p>
             </div>
           )}
           {state.error && (
             <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 text-red-200 rounded-lg text-center w-full">
               {state.error}
             </div>
           )}
        </section>

        {/* Controls */}
        <section className="space-y-6">
          
          {/* Mode Selection */}
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
            <h3 className="text-lg font-bold mb-4 text-slate-200">{t.selectMode}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(AppMode) as AppMode[]).map((modeKey) => (
                <button
                  key={modeKey}
                  onClick={() => setState(prev => ({ ...prev, mode: modeKey, error: null }))}
                  className={`p-3 rounded-xl text-sm font-semibold transition-all border ${
                    state.mode === modeKey
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                      : 'bg-slate-700/50 border-transparent text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {t.modes[modeKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5">
            <div className={`${requiresTwoImages ? '' : 'md:col-span-2 md:w-2/3 md:mx-auto'}`}>
              <ImageUploader 
                label={t.image1Label} 
                image={state.image1} 
                onImageUpload={(f) => handleFileUpload(f, 'image1')}
                onClear={() => setState(prev => ({ ...prev, image1: null }))}
              />
            </div>
            
            {requiresTwoImages && (
              <div>
                <ImageUploader 
                  label={t.image2Label} 
                  image={state.image2} 
                  onImageUpload={(f) => handleFileUpload(f, 'image2')}
                  onClear={() => setState(prev => ({ ...prev, image2: null }))}
                />
              </div>
            )}
          </div>

          {/* Custom Prompt Input */}
          {state.mode === AppMode.CUSTOM_TEXT && (
             <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                <textarea
                  value={state.customPrompt}
                  onChange={(e) => setState(prev => ({ ...prev, customPrompt: e.target.value }))}
                  placeholder={t.customPromptPlaceholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
                />
             </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={state.isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-lg font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {t.generateBtn}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 text-center text-slate-500 border-t border-white/5">
        <p className="font-bold text-slate-400 mb-2">{t.footer}</p>
        <a 
          href={INSTAGRAM_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          h1.1hk
        </a>
      </footer>
    </div>
  );
};

export default App;
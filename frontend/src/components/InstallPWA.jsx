import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

export default function InstallPWA({ themeMode = 'dark' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already running in standalone PWA mode
    const inStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.includes('android-app://');
    setIsStandalone(inStandalone);
    if (inStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Check if user dismissed prompt previously in this session
    const dismissed = sessionStorage.getItem('scrolls_pwa_dismissed');

    let timer = null;

    // Handler for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!dismissed) {
        timer = setTimeout(() => setShowPrompt(true), 1500);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS or browsers where prompt event fired before mount
    if (window.deferredPWAEvent) {
      setDeferredPrompt(window.deferredPWAEvent);
    }

    if ((ios || window.deferredPWAEvent) && !dismissed) {
      timer = setTimeout(() => setShowPrompt(true), 1500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the PWA install prompt');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    } else if (isIOS) {
      setShowIOSInstructions(true);
    } else {
      // Fallback instruction for browsers where deferredPrompt was already consumed or unavailable
      setShowIOSInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIOSInstructions(false);
    sessionStorage.setItem('scrolls_pwa_dismissed', 'true');
  };

  if (isStandalone || !showPrompt) {
    return null;
  }

  const isDay = themeMode === 'day';

  return (
    <div className="fixed bottom-16 md:bottom-6 right-3 left-3 md:left-auto md:max-w-md z-50 transition-all duration-500 ease-out animate-slide-up">
      <div className={`relative p-4 md:p-5 rounded-2xl border shadow-2xl backdrop-blur-xl ${
        isDay 
          ? 'bg-[#f9f7f2]/95 border-black/15 text-black' 
          : 'bg-[#141414]/95 border-[#c5a059]/30 text-white'
      }`}>
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition-colors opacity-70 hover:opacity-100 cursor-pointer"
          aria-label="Dismiss install prompt"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] p-0.5 shadow-md flex-shrink-0">
            <img
              src="/logo/logo_dark.png"
              alt="Scrolls App Icon"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          <div className="flex-1 pr-4">
            <h4 className="font-serif text-base font-bold tracking-wide text-[#c5a059]">
              Install Scrolls App
            </h4>
            <p className="text-xs opacity-80 mt-1 leading-relaxed">
              Add Scrolls to your home screen for an immersive, fullscreen mobile art museum experience.
            </p>

            {showIOSInstructions ? (
              <div className="mt-3 text-xs bg-white/5 p-3 rounded-lg border border-white/10 space-y-1.5">
                <p className="font-semibold text-[#c5a059] flex items-center gap-1">
                  <Smartphone size={14} /> To install on iOS Safari:
                </p>
                <div className="flex items-center gap-2 opacity-90">
                  <span>1. Tap the Share button</span>
                  <Share size={14} className="text-sky-400" />
                </div>
                <div className="flex items-center gap-2 opacity-90">
                  <span>2. Scroll down & select "Add to Home Screen"</span>
                  <PlusSquare size={14} className="text-emerald-400" />
                </div>
              </div>
            ) : (
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-4 py-2 bg-[#c5a059] hover:bg-[#b38536] text-black font-semibold text-xs tracking-wider rounded-xl transition-transform active:scale-95 shadow-md cursor-pointer"
                >
                  <Download size={15} />
                  <span>INSTALL APP</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 text-xs opacity-70 hover:opacity-100 transition-colors cursor-pointer"
                >
                  Not now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

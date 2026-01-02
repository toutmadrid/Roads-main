
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Assistant } from './components/Assistant';
import { Auth } from './components/Auth';
import { LegalNoticesPage, TermsPage, PrivacyPage } from './components/LegalDocs';
import { HeroSection, FeaturesGrid, CountryStrip } from './components/HomeComponents';
import { 
  HowItWorksPage, PricingPage, BitcoinPage, VatRefundPage, 
  SmartConsolidationPage, ProhibitedItemsPage, FAQPage, AddressesPage 
} from './components/ContentPages';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppView, LanguageCode } from './types';
import { WAREHOUSES, TRANSLATIONS } from './constants';
import { Globe, Coins, Bitcoin, Wallet } from 'lucide-react';

const MainContent = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [currentLang, setCurrentLang] = useState<LanguageCode>('fr');
  const { isAuthenticated, isLoading } = useAuth();

  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && currentView === AppView.DASHBOARD) {
      setCurrentView(AppView.AUTH);
    }
  }, [isAuthenticated, currentView, isLoading]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        currentLang={currentLang} 
        setLang={setCurrentLang} 
      />

      <main>
        {currentView === AppView.HOME && (
          <>
            <HeroSection currentLang={currentLang} setCurrentView={setCurrentView} isAuthenticated={!!isAuthenticated} />
            <CountryStrip currentLang={currentLang} />
            <FeaturesGrid currentLang={currentLang} setCurrentView={setCurrentView} isAuthenticated={!!isAuthenticated} />
          </>
        )}
        
        {currentView === AppView.HOW_IT_WORKS && <HowItWorksPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.PRICING && <PricingPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.DASHBOARD && <Dashboard currentLang={currentLang} />}
        {currentView === AppView.ADDRESSES && <AddressesPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.AUTH && <Auth setView={setCurrentView} />}
        {currentView === AppView.FAQ && <FAQPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.VAT_REFUND && <VatRefundPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.BITCOIN && <BitcoinPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.SMART_CONSOLIDATION && <SmartConsolidationPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.PROHIBITED_ITEMS && <ProhibitedItemsPage currentLang={currentLang} setCurrentView={setCurrentView} />}
        {currentView === AppView.LEGAL_NOTICES && <LegalNoticesPage currentLang={currentLang} />}
        {currentView === AppView.TERMS && <TermsPage currentLang={currentLang} />}
        {currentView === AppView.PRIVACY && <PrivacyPage currentLang={currentLang} />}
      </main>

      <Assistant currentLang={currentLang} />

      <footer className="bg-babbel-900 text-white py-12 border-t border-babbel-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-babbel-900 via-gold-500 to-babbel-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-4 gap-8 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Globe className="w-6 h-6 text-gold-500" />
              </div>
              <span className="font-serif font-bold text-xl tracking-wide">Roads of Babel</span>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              {t.footer_tagline} <br/>
              {t.step_header_desc}
            </p>
            <div className="flex gap-4 mt-6">
               <Coins className="w-5 h-5 text-gray-500 hover:text-white transition cursor-pointer" />
               <Bitcoin onClick={() => setCurrentView(AppView.BITCOIN)} className="w-5 h-5 text-gray-500 hover:text-gold-500 transition cursor-pointer hover:scale-125 duration-300" />
               <Wallet className="w-5 h-5 text-gray-500 hover:text-white transition cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-4 text-gold-500">{t.footer_service}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.PRICING)}>{t.nav_pricing}</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.VAT_REFUND)}>Calculateur Off-Tax</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.SMART_CONSOLIDATION)}>Consolidation Intelligente</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.PROHIBITED_ITEMS)}>{t.prohibited_footer_link}</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.FAQ)}>FAQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-4 text-gold-500">{t.footer_legal}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.TERMS)}>{t.footer_legal_terms}</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.PRIVACY)}>{t.footer_legal_privacy}</li>
              <li className="hover:text-white cursor-pointer transition" onClick={() => setCurrentView(AppView.LEGAL_NOTICES)}>{t.footer_legal_notices}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-babbel-800 text-center text-gray-500 text-xs">
          © 2024 Roads of Babel. {t.footer_rights}
        </div>
      </footer>

    </div>
  );
};

const App = () => (
  <AuthProvider>
    <MainContent />
  </AuthProvider>
);

export default App;

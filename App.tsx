
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
import { Globe } from 'lucide-react';

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

      <footer className="bg-babbel-900 text-white border-t border-babbel-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 group cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
                <div className="bg-white text-babbel-900 p-2 rounded-lg shadow-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-serif font-bold text-lg text-white">Roads of Babel</span>
              </div>
              <p className="text-babbel-200 text-sm leading-relaxed">
                {(t as any).footer_tagline}
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-white mb-6">{(t as any).footer_service}</h4>
              <ul className="space-y-4 text-sm text-babbel-200">
                <li>
                  <button onClick={() => setCurrentView(AppView.VAT_REFUND)} className="hover:text-gold-500 transition flex items-center gap-2">
                    {(t as any).feature_offtax}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView(AppView.SMART_CONSOLIDATION)} className="hover:text-gold-500 transition flex items-center gap-2">
                    {(t as any).f_consolidation_title}
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentView(AppView.FAQ)} className="hover:text-gold-500 transition flex items-center gap-2">
                    {(t as any).faq_title}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-white mb-6">{(t as any).footer_legal}</h4>
              <ul className="space-y-4 text-sm text-babbel-200">
                <li><button onClick={() => setCurrentView(AppView.TERMS)} className="hover:text-gold-500 transition">{(t as any).footer_legal_terms}</button></li>
                <li><button onClick={() => setCurrentView(AppView.PRIVACY)} className="hover:text-gold-500 transition">{(t as any).footer_legal_privacy}</button></li>
                <li><button onClick={() => setCurrentView(AppView.LEGAL_NOTICES)} className="hover:text-gold-500 transition">{(t as any).footer_legal_notices}</button></li>
                <li><button onClick={() => setCurrentView(AppView.PROHIBITED_ITEMS)} className="hover:text-red-400 transition text-red-300 font-medium">{(t as any).prohibited_footer_link}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-white mb-6">{(t as any).warehouses_title}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-babbel-200 rtl:text-right">
                {WAREHOUSES.map(w => (
                  <span key={w.id} className="flex items-center gap-2">
                    <span>{w.flag}</span> {getTrans(`wh_${w.id}`)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-babbel-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-babbel-400">
            <p>© {new Date().getFullYear()} Roads of Babel SAS. {(t as any).footer_rights}</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition">Twitter</span>
              <span className="hover:text-white cursor-pointer transition">LinkedIn</span>
              <span className="hover:text-white cursor-pointer transition">Instagram</span>
            </div>
          </div>
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

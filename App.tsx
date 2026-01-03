
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

const viewToPath: Record<AppView, string> = {
  [AppView.HOME]: '/',
  [AppView.DASHBOARD]: '/dashboard',
  [AppView.PRICING]: '/pricing',
  [AppView.HOW_IT_WORKS]: '/how-it-works',
  [AppView.BITCOIN]: '/bitcoin',
  [AppView.VAT_REFUND]: '/vat-refund',
  [AppView.SMART_CONSOLIDATION]: '/smart-consolidation',
  [AppView.ADDRESSES]: '/addresses',
  [AppView.AUTH]: '/auth',
  [AppView.PROHIBITED_ITEMS]: '/prohibited-items',
  [AppView.FAQ]: '/faq',
  [AppView.TERMS]: '/terms',
  [AppView.PRIVACY]: '/privacy',
  [AppView.LEGAL_NOTICES]: '/legal-notices',
};

const getViewFromPath = (pathname: string) => {
  const entry = Object.entries(viewToPath).find(([, path]) => path === pathname);
  return (entry?.[0] as AppView | undefined) ?? AppView.HOME;
};

const MainContent = () => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('fr');
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentView = useMemo(() => getViewFromPath(location.pathname), [location.pathname]);

  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  const setCurrentView = (view: AppView) => {
    navigate(viewToPath[view]);
  };

  useEffect(() => {
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && currentView === AppView.DASHBOARD) {
      navigate(viewToPath[AppView.AUTH], { replace: true });
    }
    if (!isLoading && isAuthenticated && currentView === AppView.AUTH) {
      navigate(viewToPath[AppView.DASHBOARD], { replace: true });
    }
  }, [isAuthenticated, currentView, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Header 
        currentView={currentView} 
        setView={setCurrentView} 
        currentLang={currentLang} 
        setLang={setCurrentLang} 
      />

      <main>
        <Routes>
          <Route
            path={viewToPath[AppView.HOME]}
            element={(
              <>
                <HeroSection currentLang={currentLang} setCurrentView={setCurrentView} isAuthenticated={!!isAuthenticated} />
                <CountryStrip currentLang={currentLang} />
                <FeaturesGrid currentLang={currentLang} setCurrentView={setCurrentView} isAuthenticated={!!isAuthenticated} />
              </>
            )}
          />
          <Route path={viewToPath[AppView.HOW_IT_WORKS]} element={<HowItWorksPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.PRICING]} element={<PricingPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.DASHBOARD]} element={<Dashboard currentLang={currentLang} />} />
          <Route path={viewToPath[AppView.ADDRESSES]} element={<AddressesPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.AUTH]} element={<Auth setView={setCurrentView} />} />
          <Route path={viewToPath[AppView.FAQ]} element={<FAQPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.VAT_REFUND]} element={<VatRefundPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.BITCOIN]} element={<BitcoinPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.SMART_CONSOLIDATION]} element={<SmartConsolidationPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.PROHIBITED_ITEMS]} element={<ProhibitedItemsPage currentLang={currentLang} setCurrentView={setCurrentView} />} />
          <Route path={viewToPath[AppView.LEGAL_NOTICES]} element={<LegalNoticesPage currentLang={currentLang} />} />
          <Route path={viewToPath[AppView.TERMS]} element={<TermsPage currentLang={currentLang} />} />
          <Route path={viewToPath[AppView.PRIVACY]} element={<PrivacyPage currentLang={currentLang} />} />
          <Route path="*" element={<Navigate to={viewToPath[AppView.HOME]} replace />} />
        </Routes>
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
  <BrowserRouter>
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  </BrowserRouter>
);

export default App;

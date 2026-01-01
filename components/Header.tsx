
import React, { useState } from 'react';
import { Globe, User, Menu, ChevronDown, LogOut, X } from 'lucide-react';
import { AppView, Language, LanguageCode } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../constants';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  currentLang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, currentLang, setLang }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const selectedLang = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const { isAuthenticated, logout, user } = useAuth();

  const handleNav = (targetView: AppView) => {
    setView(targetView);
    setIsMobileMenuOpen(false);
  };

  const linkClass = (view: AppView) => {
    const isActive = currentView === view;
    return `text-sm font-medium transition hover:text-gold-500 cursor-pointer ${isActive ? 'text-babbel-900 font-bold border-b-2 border-gold-500' : 'text-gray-600'}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav(AppView.HOME)}
        >
          <div className="bg-babbel-900 text-gold-500 p-2.5 rounded-xl shadow-lg group-hover:rotate-180 transition duration-700 ease-in-out">
            <Globe className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-bold text-babbel-900 tracking-tight leading-none">Roads of Babel</h1>
            <span className="text-[10px] text-gold-600 font-bold tracking-[0.2em] uppercase mt-1">Logistique Universelle</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 rtl:flex-row-reverse">
          <button onClick={() => handleNav(AppView.HOME)} className={linkClass(AppView.HOME)}>
            {t.nav_home}
          </button>
          <button onClick={() => handleNav(AppView.HOW_IT_WORKS)} className={linkClass(AppView.HOW_IT_WORKS)}>
            {t.nav_how}
          </button>
          <button onClick={() => handleNav(AppView.PRICING)} className={linkClass(AppView.PRICING)}>
            {t.nav_pricing}
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700"
            >
              <span className="text-xl">{selectedLang.flag}</span>
              <span className="hidden sm:inline">{selectedLang.code.toUpperCase()}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isLangMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)}></div>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-20 py-1">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLang(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-gray-50 transition ${currentLang === lang.code ? 'bg-babbel-50 font-bold text-babbel-900' : 'text-gray-700'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleNav(AppView.DASHBOARD)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition font-bold ${
                  currentView === AppView.DASHBOARD 
                  ? 'bg-babbel-900 border-babbel-900 text-white shadow-lg' 
                  : 'border-gray-200 text-gray-700 hover:border-babbel-900 hover:text-babbel-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider hidden sm:block">
                  {user?.full_name ? user.full_name.split(' ')[0] : t.nav_dashboard}
                </span>
              </button>
              <button 
                onClick={() => { logout(); handleNav(AppView.HOME); }}
                className="p-2 text-gray-400 hover:text-red-500 transition"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => handleNav(AppView.AUTH)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-babbel-900 text-white font-bold shadow-lg hover:bg-babbel-800 transition text-xs uppercase tracking-wider"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:block">Connexion</span>
            </button>
          )}

          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl py-6 px-4 flex flex-col gap-2 z-30">
          <button onClick={() => handleNav(AppView.HOME)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
            {t.nav_home}
          </button>
          <button onClick={() => handleNav(AppView.HOW_IT_WORKS)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
            {t.nav_how}
          </button>
          <button onClick={() => handleNav(AppView.PRICING)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50">
            {t.nav_pricing}
          </button>
          
          <div className="h-px bg-gray-100 my-2"></div>
          
          <button onClick={() => handleNav(AppView.VAT_REFUND)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {t.feature_offtax}
          </button>
          <button onClick={() => handleNav(AppView.BITCOIN)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            {t.feature_crypto}
          </button>
          <button onClick={() => handleNav(AppView.PROHIBITED_ITEMS)} className="text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-500"></span>
             {t.prohibited_footer_link}
          </button>
        </div>
      )}
    </header>
  );
};

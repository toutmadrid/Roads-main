
import React from 'react';
import { Globe, Ticket, Bitcoin, Box, Globe2, Landmark, BoxSelect, ArrowRight } from 'lucide-react';
import { TRANSLATIONS, WAREHOUSES } from '../constants';
import { AppView, LanguageCode } from '../types';
import { Simulator } from './Simulator';

interface HomeProps {
  currentLang: LanguageCode;
  setCurrentView: (view: AppView) => void;
  isAuthenticated: boolean;
}

export const HeroSection: React.FC<HomeProps> = ({ currentLang, setCurrentView, isAuthenticated }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;
  
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-babbel-100 rounded-full blur-3xl -z-10 opacity-50 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-100 rounded-full blur-3xl -z-10 opacity-30 -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Globe className="w-3 h-3 text-gold-500" />
                {(t as any).hero_badge}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-babbel-900 leading-tight">
                {(t as any).hero_title_1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700 relative">
                  {(t as any).hero_title_2}
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-gold-200 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                {(t as any).hero_desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentView(isAuthenticated ? AppView.ADDRESSES : AppView.AUTH)} 
                  className="px-8 py-4 bg-babbel-900 text-white rounded-full font-bold shadow-xl shadow-babbel-900/20 hover:bg-gold-500 hover:text-babbel-900 transition-all transform hover:-translate-y-1"
                >
                  {(t as any).hero_btn_address}
                </button>
                <button 
                  onClick={() => setCurrentView(AppView.HOW_IT_WORKS)}
                  className="px-8 py-4 bg-white text-babbel-900 border-2 border-gray-100 rounded-full font-bold hover:border-babbel-900 transition-all"
                >
                  {(t as any).hero_btn_how}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-500">
                <button 
                  onClick={() => setCurrentView(AppView.VAT_REFUND)}
                  className="flex items-center gap-2 group hover:text-green-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 group-hover:scale-110 transition-all">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <span className="border-b border-transparent group-hover:border-green-700">{(t as any).feature_offtax}</span>
                </button>

                <button 
                  onClick={() => setCurrentView(AppView.BITCOIN)}
                  className="flex items-center gap-2 group hover:text-orange-700 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-200 group-hover:scale-110 transition-all">
                    <Bitcoin className="w-4 h-4" />
                  </div>
                  <span className="border-b border-transparent group-hover:border-orange-700">{(t as any).feature_crypto}</span>
                </button>
              </div>
            </div>

            <div className="relative" id="simulator">
              <Simulator currentLang={currentLang} />
            </div>

          </div>
        </div>
    </section>
  );
};

export const CountryStrip: React.FC<{ currentLang: LanguageCode }> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;
  
  return (
    <div className="bg-babbel-900 py-12 border-y border-babbel-800 shadow-inner relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 items-center">
          {WAREHOUSES.map((w) => (
             <div key={w.id} className="flex flex-col items-center gap-2 group select-none transition duration-300">
                <span className="text-4xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{w.flag}</span>
                <span className="font-serif font-bold text-xs tracking-[0.2em] uppercase text-babbel-200 group-hover:text-gold-400 transition-colors">{getTrans(`wh_${w.id}`)}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const FeaturesGrid: React.FC<HomeProps> = ({ currentLang, setCurrentView }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          
          <div 
            onClick={() => setCurrentView(AppView.ADDRESSES)} 
            className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-babbel-900/10 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-babbel-900 to-babbel-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="w-16 h-16 bg-babbel-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-babbel-900 transition-colors duration-300">
              <Globe2 className="w-8 h-8 text-babbel-900 group-hover:text-gold-500 transition-colors duration-300" />
            </div>
            
            <h3 className="text-2xl font-bold mb-4 font-serif text-gray-900">{(t as any).f_address_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {(t as any).f_address_desc}
            </p>
          </div>

          <div 
            onClick={() => setCurrentView(AppView.VAT_REFUND)} 
            className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-babbel-900/10 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-700 to-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-800 transition-colors duration-300">
              <Landmark className="w-8 h-8 text-green-700 group-hover:text-green-300 transition-colors duration-300" />
            </div>

            <h3 className="text-2xl font-bold mb-4 font-serif text-gray-900">{(t as any).f_tax_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {(t as any).f_tax_desc}
            </p>
          </div>

          <div 
            onClick={() => setCurrentView(AppView.SMART_CONSOLIDATION)} 
            className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-babbel-900/10 transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-700 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-800 transition-colors duration-300">
              <BoxSelect className="w-8 h-8 text-blue-700 group-hover:text-blue-200 transition-colors duration-300" />
            </div>

            <h3 className="text-2xl font-bold mb-4 font-serif text-gray-900">{(t as any).f_consolidation_title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {(t as any).f_consolidation_desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

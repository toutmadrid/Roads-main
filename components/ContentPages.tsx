
import React, { useState } from 'react';
import { 
  MapPin, Box, Layers, Ticket, Calculator, Euro, Bitcoin, Globe, Zap, Lock, Coins, 
  HelpCircle, ChevronDown, ChevronUp, Check, Wallet, ArrowRight, ShieldCheck, 
  Flame, Crosshair, Banknote, Pill, Apple, Battery, AlertTriangle, Scissors, Leaf, Copy 
} from 'lucide-react';
import { TRANSLATIONS, FAQ_ITEMS, WAREHOUSES } from '../constants';
import { AppView, LanguageCode } from '../types';
import { useAuth } from '../context/AuthContext';

interface PageProps {
  currentLang: LanguageCode;
  setCurrentView: (view: AppView) => void;
  id?: string; // Ajout de la prop ID pour le scroll
}

export const FAQPage: React.FC<PageProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang];
  const questions = FAQ_ITEMS[currentLang] || FAQ_ITEMS['en'];

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-babbel-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 font-bold tracking-widest uppercase text-xs mb-6">
             <HelpCircle className="w-4 h-4" /> Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight">
            {(t as any).faq_title}
          </h1>
          <p className="text-xl text-babbel-100 max-w-2xl mx-auto font-light">
            {(t as any).faq_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {questions.map((item, idx) => (
            <div key={idx} className="border-b border-gray-100 last:border-0">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
              >
                <span className={`font-bold text-lg ${openIndex === idx ? 'text-gold-500' : 'text-gray-900'}`}>
                  {item.q}
                </span>
                {openIndex === idx ? <ChevronUp className="w-5 h-5 text-gold-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AddressesPage: React.FC<PageProps> = ({ currentLang, setCurrentView }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;
  const { isAuthenticated, user } = useAuth();

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-babbel-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 font-bold tracking-widest uppercase text-xs mb-6">
             <MapPin className="w-4 h-4" /> Global Network
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
            {(t as any).addr_hero_title}
          </h1>
          <p className="text-xl text-babbel-100 max-w-2xl mx-auto font-light">
            {(t as any).addr_hero_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        
        {!isAuthenticated && (
          <div className="bg-babbel-900 border border-babbel-800 p-6 rounded-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-gold-500 p-3 rounded-full text-babbel-900">
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-white text-lg">{(t as any).addr_suite}</h3>
                <p className="text-babbel-100">{(t as any).addr_suite_placeholder}</p>
              </div>
            </div>
            <button onClick={() => setCurrentView(AppView.AUTH)} className="relative z-10 px-8 py-3 bg-gold-500 text-babbel-900 rounded-xl font-bold text-sm hover:bg-white hover:text-babbel-900 transition shadow-lg shadow-gold-500/20">
              {(t as any).btn_start}
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WAREHOUSES.map((wh) => (
            <div key={wh.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden group hover:-translate-y-1 transition duration-300">
              <div className="h-2 bg-gradient-to-r from-babbel-900 to-gold-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{wh.flag}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{getTrans(`wh_${wh.id}`)}</span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-bold">Address Line 1</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{wh.address}</span>
                      <button onClick={() => handleCopy(wh.address, `${wh.id}-addr`)} className="text-gray-400 hover:text-gold-500 transition">
                        {copiedId === `${wh.id}-addr` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-bold">City</p>
                      <span className="font-medium text-gray-800">{wh.city}</span>
                    </div>
                    <div className="flex-1 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 font-bold">Zip</p>
                      <span className="font-medium text-gray-800">{wh.zip}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border-2 border-dashed flex justify-between items-center ${isAuthenticated ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div>
                      <p className="text-xs uppercase tracking-wide mb-1 font-bold text-gray-500">{(t as any).addr_suite}</p>
                      <span className={`font-mono font-bold text-lg ${isAuthenticated ? 'text-babbel-900' : 'text-gray-400 blur-sm select-none'}`}>
                        {isAuthenticated ? `ROADS-${user?.id?.substring(0, 4) || 'USER'}` : 'ROADS-XXXX'}
                      </span>
                    </div>
                    {isAuthenticated && (
                      <button onClick={() => handleCopy(`ROADS-${user?.id?.substring(0, 4) || 'USER'}`, `${wh.id}-suite`)} className="text-gray-400 hover:text-gold-500 transition">
                        {copiedId === `${wh.id}-suite` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-babbel-50 border border-babbel-100 p-8 rounded-3xl flex items-start gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm text-gold-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-babbel-900 text-lg mb-2">{(t as any).addr_note_title}</h4>
            <p className="text-babbel-700 leading-relaxed">
              {(t as any).addr_note_desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export const SmartConsolidationPage: React.FC<PageProps> = ({ currentLang, setCurrentView }) => {
  const t = TRANSLATIONS[currentLang];
  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-babbel-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-clay-500/20 text-clay-500 border border-clay-500/30 font-bold tracking-widest uppercase text-xs mb-6">
             <Layers className="w-4 h-4" /> Logistique Intelligente
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
            {(t as any).cons_hero_title}
          </h1>
          <p className="text-xl text-babbel-100 max-w-2xl mx-auto font-light">
            {(t as any).cons_hero_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-12">{(t as any).cons_math_title}</h3>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl w-full max-w-sm relative group hover:shadow-lg transition">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {(t as any).cons_before}
              </div>
              <div className="flex justify-center gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <Box className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">{(t as any).cons_box_1}</span>
                  <span className="font-bold text-gray-700">30€</span>
                </div>
                <div className="text-gray-300 font-light text-4xl">+</div>
                <div className="flex flex-col items-center">
                  <Box className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">{(t as any).cons_box_2}</span>
                  <span className="font-bold text-gray-700">25€</span>
                </div>
                <div className="text-gray-300 font-light text-4xl">+</div>
                <div className="flex flex-col items-center">
                  <Box className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">{(t as any).cons_box_3}</span>
                  <span className="font-bold text-gray-700">35€</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-gray-500 font-medium">{(t as any).cons_total}</span>
                <span className="text-3xl font-bold text-red-500 line-through decoration-2">90€</span>
              </div>
            </div>

            <div className="hidden lg:block text-gold-500">
              <ArrowRight className="w-12 h-12 animate-pulse" />
            </div>

            <div className="bg-white border-2 border-gold-500 p-8 rounded-3xl w-full max-w-sm relative shadow-2xl shadow-gold-500/20 transform hover:-translate-y-2 transition duration-500">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gold-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {(t as any).cons_after}
              </div>
              <div className="flex justify-center mb-6 py-2">
                <div className="relative">
                  <Box className="w-24 h-24 text-babbel-900" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers className="w-8 h-8 text-white opacity-50" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">{(t as any).cons_total}</span>
                  <span className="text-4xl font-bold text-green-600">45€</span>
                </div>
                <div className="bg-green-50 text-green-700 text-center py-2 rounded-lg text-sm font-bold">
                  {(t as any).cons_saving}: -50%
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">{(t as any).cons_process_title}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                <Scissors className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{(t as any).cons_feat_repack}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{(t as any).cons_feat_repack_desc}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{(t as any).cons_feat_eco}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{(t as any).cons_feat_eco_desc}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg mb-2">{(t as any).cons_feat_safe}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{(t as any).cons_feat_safe_desc}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => setCurrentView(AppView.AUTH)} className="px-10 py-4 bg-babbel-900 text-white rounded-full font-bold text-lg hover:bg-gold-500 hover:text-babbel-900 transition shadow-xl shadow-babbel-900/20">
            {(t as any).cons_cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProhibitedItemsPage: React.FC<PageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  return (
    <div className="bg-white min-h-screen font-sans pb-20">
      <div className="bg-red-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 font-bold tracking-widest uppercase text-xs mb-6">
             <ShieldCheck className="w-4 h-4" /> Compliance & Safety
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white leading-tight">
            {(t as any).prohibited_hero_title}
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto font-light">
            {(t as any).prohibited_hero_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-red-500">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_danger}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_danger_desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-gray-800">
            <div className="w-12 h-12 bg-gray-100 text-gray-800 rounded-full flex items-center justify-center mb-4">
              <Crosshair className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_weapons}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_weapons_desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-yellow-500">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
              <Banknote className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_money}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_money_desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-purple-500">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Pill className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_drugs}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_drugs_desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
              <Apple className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_perishable}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_perishable_desc}</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-blue-500">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Battery className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).prohibited_cat_batteries}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{(t as any).prohibited_cat_batteries_desc}</p>
          </div>
        </div>

        <div className="mt-12 bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="bg-white p-4 rounded-full shadow-md shrink-0">
             <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-900 mb-2">{(t as any).prohibited_note_title}</h3>
            <p className="text-red-700 leading-relaxed">
              {(t as any).prohibited_note_desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const VatRefundPage: React.FC<PageProps> = ({ currentLang }) => {
  const [amount, setAmount] = useState(100);
  const [countryRate, setCountryRate] = useState(0.20); 
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;
  const vatAmount = (amount / (1 + countryRate)) * countryRate;
  const handlingFee = vatAmount * 0.15; 
  const refundAmount = vatAmount - handlingFee;

  return (
    <div className="bg-white min-h-screen font-sans">
      <div className="bg-babbel-900 text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-bold tracking-widest uppercase text-xs mb-6">
             <Ticket className="w-4 h-4" /> Off-Tax System
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white leading-tight">
            {(t as any).vat_hero_title}
          </h1>
          <p className="text-xl text-babbel-100 max-w-2xl mx-auto font-light">
            {(t as any).vat_hero_subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-babbel-50 flex items-center justify-center text-babbel-900 font-bold text-xl shrink-0">1</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).vat_step_1_title}</h3>
              <p className="text-gray-600">{(t as any).vat_step_1_desc}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-babbel-50 flex items-center justify-center text-babbel-900 font-bold text-xl shrink-0">2</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).vat_step_2_title}</h3>
              <p className="text-gray-600">{(t as any).vat_step_2_desc}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-xl shrink-0">3</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{(t as any).vat_step_3_title}</h3>
              <p className="text-gray-600">{(t as any).vat_step_3_desc}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-xl relative">
           <div className="absolute top-0 right-0 p-6 opacity-10">
             <Calculator className="w-24 h-24 text-babbel-900" />
           </div>
           <h3 className="text-2xl font-serif font-bold text-babbel-900 mb-8 flex items-center gap-2">
             {(t as any).vat_calc_title}
           </h3>

           <div className="space-y-6 relative z-10">
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">{(t as any).vat_label_amount}</label>
               <div className="relative">
                 <input 
                   type="number" 
                   value={amount}
                   onChange={(e) => setAmount(Number(e.target.value))}
                   className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-babbel-500 outline-none font-mono text-lg"
                 />
                 <Euro className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
               </div>
             </div>

             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">{(t as any).vat_label_country}</label>
               <select 
                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-babbel-500 outline-none bg-white"
                 onChange={(e) => setCountryRate(Number(e.target.value))}
               >
                 <option value={0.20}>{getTrans('wh_fr')} (20%)</option>
                 <option value={0.19}>{getTrans('wh_de')} (19%)</option>
                 <option value={0.22}>{getTrans('wh_it')} (22%)</option>
                 <option value={0.21}>{getTrans('wh_es')} (21%)</option>
               </select>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-3">
               <div className="flex justify-between text-sm text-gray-500">
                 <span>{(t as any).vat_result_gross}</span>
                 <span>{vatAmount.toFixed(2)}€</span>
               </div>
               <div className="h-px bg-gray-100"></div>
               <div className="flex justify-between items-end">
                 <span className="font-bold text-babbel-900">{(t as any).vat_result_net}</span>
                 <span className="text-3xl font-bold text-green-600">{refundAmount.toFixed(2)}€</span>
               </div>
             </div>
             <p className="text-xs text-gray-400 text-center">{(t as any).vat_disclaimer}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export const BitcoinPage: React.FC<PageProps> = ({ currentLang, setCurrentView }) => {
  const t = TRANSLATIONS[currentLang];
  return (
    <div className="bg-babbel-900 text-white min-h-screen font-sans">
      <div className="relative overflow-hidden py-24 px-4 sm:px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center space-y-8">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-500 border border-gold-500/30 font-bold tracking-widest uppercase text-xs">
             <Bitcoin className="w-4 h-4" /> Roads of Babel x Crypto
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gold-200 to-gold-600">
             {(t as any).btc_hero_title}
           </h1>
           <p className="text-xl text-babbel-100 max-w-2xl mx-auto font-light leading-relaxed">
             {(t as any).btc_hero_subtitle}
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition group">
             <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mb-6 text-babbel-900 group-hover:scale-110 transition-transform">
               <Globe className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">{(t as any).btc_reason_1_title}</h3>
             <p className="text-gray-300 leading-relaxed">{(t as any).btc_reason_1_desc}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition group">
             <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mb-6 text-babbel-900 group-hover:scale-110 transition-transform">
               <Zap className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">{(t as any).btc_reason_2_title}</h3>
             <p className="text-gray-300 leading-relaxed">{(t as any).btc_reason_2_desc}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition group">
             <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center mb-6 text-babbel-900 group-hover:scale-110 transition-transform">
               <Lock className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">{(t as any).btc_reason_3_title}</h3>
             <p className="text-gray-300 leading-relaxed">{(t as any).btc_reason_3_desc}</p>
          </div>
        </div>
      </div>

      <div className="border-y border-white/10 bg-black/20 py-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
           <p className="text-babbel-100 mb-8">{(t as any).btc_accepted_coins}</p>
           <div className="flex justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 rtl:flex-row-reverse">
             <div className="flex items-center gap-2 font-bold text-2xl text-orange-500"><Bitcoin className="w-8 h-8"/> BTC</div>
             <div className="flex items-center gap-2 font-bold text-2xl text-blue-500"><Coins className="w-8 h-8"/> USDC</div>
             <div className="flex items-center gap-2 font-bold text-2xl text-green-500"><Coins className="w-8 h-8"/> USDT</div>
           </div>
        </div>
      </div>

      <div className="py-24 text-center">
        <button onClick={() => setCurrentView(AppView.DASHBOARD)} className="px-10 py-5 bg-gold-500 text-babbel-900 rounded-full font-bold text-lg hover:bg-white transition shadow-lg shadow-gold-500/20 transform hover:-translate-y-1">
          {(t as any).btc_cta}
        </button>
      </div>
    </div>
  );
};

export const PricingPage: React.FC<PageProps> = ({ currentLang, setCurrentView, id }) => {
  const t = TRANSLATIONS[currentLang];
  return (
    <div id={id} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold text-babbel-900 mb-6">{(t as any).pricing_title}</h2>
          <p className="text-gray-600 text-lg">{(t as any).pricing_subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative">
            <h3 className="text-2xl font-serif font-bold text-gray-900">{(t as any).plan_free}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">0€</span>
              <span className="text-gray-500"> {(t as any).per_month}</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="w-5 h-5 text-green-500 shrink-0" /> {(t as any).feat_forwarding}
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="w-5 h-5 text-green-500 shrink-0" /> {(t as any).feat_storage_30}
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="w-5 h-5 text-green-500 shrink-0" /> {(t as any).feat_access}
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Check className="w-5 h-5 text-green-500 shrink-0" /> {(t as any).feat_consolidation_fee}
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl border-2 border-babbel-900 text-babbel-900 font-bold hover:bg-babbel-50 transition">
              {(t as any).btn_start}
            </button>
          </div>

          <div className="bg-babbel-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <div className="bg-gold-500 text-babbel-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Populaire</div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gold-500">{(t as any).plan_premium}</h3>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold">29€</span>
              <span className="text-babbel-100"> {(t as any).per_year}</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-200">
                <Check className="w-5 h-5 text-gold-500 shrink-0" /> {(t as any).feat_reduced_fees}
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <Check className="w-5 h-5 text-gold-500 shrink-0" /> {(t as any).feat_storage_60}
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <Check className="w-5 h-5 text-gold-500 shrink-0" /> <strong>{(t as any).feat_consolidation_free}</strong>
              </li>
              <li className="flex items-center gap-3 text-gray-200">
                <Check className="w-5 h-5 text-gold-500 shrink-0" /> {(t as any).feat_insurance}
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-gold-500 text-babbel-900 font-bold hover:bg-gold-400 transition shadow-lg shadow-gold-500/20">
              {(t as any).btn_premium}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gray-100 rounded-full mb-6">
            <Wallet className="w-6 h-6 text-gray-700" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{(t as any).payment_title}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {(t as any).payment_desc}
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500 rtl:flex-row-reverse">
             <div className="flex items-center gap-2 font-bold text-lg"><span className="text-blue-600">VISA</span></div>
             <div className="flex items-center gap-2 font-bold text-lg"><span className="text-blue-800">PayPal</span></div>
             <div className="h-8 w-px bg-gray-300"></div>
             <div onClick={() => setCurrentView(AppView.BITCOIN)} className="flex items-center gap-2 font-bold text-lg text-orange-500 cursor-pointer hover:scale-110 transition"><Bitcoin className="w-6 h-6"/> Bitcoin</div>
             <div className="flex items-center gap-2 font-bold text-lg text-blue-500"><Coins className="w-6 h-6"/> USDC / USDT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HowItWorksPage: React.FC<PageProps> = ({ currentLang, id }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  return (
    <div id={id} className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-20 text-center">
        <h2 className="text-4xl font-serif font-bold text-babbel-900 mb-6">{(t as any).step_header_title}</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {(t as any).step_header_desc}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24">
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
              <div className="w-12 h-12 bg-babbel-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-babbel-900/30">1</div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{(t as any).step_1_title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {(t as any).step_1_desc}
              </p>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-gold-500"/> {(t as any).step_1_box_title}</h4>
                <div className="grid grid-cols-2 gap-3 rtl:text-right">
                  {WAREHOUSES.map(w => (
                    <div key={w.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{w.flag}</span> {getTrans(`wh_${w.id}`)}
                    </div>
                  ))}
                </div>
              </div>
           </div>
           <div className="order-1 md:order-2 bg-gradient-to-br from-babbel-50 to-white p-8 rounded-3xl border border-babbel-100 flex items-center justify-center">
              <img src="https://img.freepik.com/free-vector/delivery-address-concept-illustration_114360-7539.jpg?w=826" alt="Address" className="w-full max-w-sm mix-blend-multiply opacity-90" />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="bg-gradient-to-br from-babbel-50 to-white p-8 rounded-3xl border border-babbel-100 flex items-center justify-center">
              <img src="https://img.freepik.com/free-vector/logistics-concept-illustration_114360-1506.jpg?w=826" alt="Storage" className="w-full max-w-sm mix-blend-multiply opacity-90" />
           </div>
           <div>
              <div className="w-12 h-12 bg-babbel-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-babbel-900/30">2</div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{(t as any).step_2_title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {(t as any).step_2_desc}
              </p>
              <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-start gap-3">
                <Ticket className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <p className="text-sm text-green-800">{(t as any).step_2_box_desc}</p>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="order-2 md:order-1">
              <div className="w-12 h-12 bg-babbel-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-babbel-900/30">3</div>
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">{(t as any).step_3_title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {(t as any).step_3_desc}
              </p>
              <button 
                onClick={() => document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gold-600 font-bold hover:text-gold-700 flex items-center gap-2 group"
              >
                {(t as any).step_3_btn} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition rtl:rotate-180" />
              </button>
           </div>
           <div className="order-1 md:order-2 bg-gradient-to-br from-babbel-50 to-white p-8 rounded-3xl border border-babbel-100 flex items-center justify-center">
              <img src="https://img.freepik.com/free-vector/delivery-truck-concept-illustration_114360-1296.jpg?w=826" alt="Shipping" className="w-full max-w-sm mix-blend-multiply opacity-90" />
           </div>
        </div>

      </div>
    </div>
  );
};

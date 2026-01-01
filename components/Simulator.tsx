import React, { useState, useMemo, useRef } from 'react';
import { Calculator, ArrowRight, Plane, Box, Warehouse, Ruler, Info, Scan, Loader2 } from 'lucide-react';
import { ZONES, WAREHOUSES, TRANSLATIONS } from '../constants';
import { LanguageCode } from '../types';
import { analyzeItemImage } from '../services/geminiService';

interface SimulatorProps {
  currentLang?: LanguageCode;
}

export const Simulator: React.FC<SimulatorProps> = ({ currentLang = 'fr' }) => {
  const [weight, setWeight] = useState<number>(1);
  const [zoneId, setZoneId] = useState<string>('world');
  const [originId, setOriginId] = useState<string>('fr');
  const [dimensions, setDimensions] = useState({ length: 20, width: 20, height: 20 });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[currentLang];
  // Helper for dynamic keys
  const getTrans = (key: string) => (t as any)[key] || key;

  const selectedZone = ZONES.find(z => z.id === zoneId) || ZONES[0];

  const estimatedPrice = useMemo(() => {
    // Calcul du poids volumétrique : (L x l x H) / 5000 (standard IATA)
    const volumetricWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
    
    // Le transporteur facture sur le poids le plus élevé entre le réel et le volumétrique
    const chargeableWeight = Math.max(weight, volumetricWeight);
    
    return selectedZone.baseRate + (chargeableWeight * selectedZone.perKgRate);
  }, [weight, selectedZone, dimensions]);

  const volumetricWeight = (dimensions.length * dimensions.width * dimensions.height) / 5000;
  const isVolumetricApplied = volumetricWeight > weight;

  const handleDimensionChange = (field: keyof typeof dimensions, value: string) => {
    const num = parseFloat(value);
    setDimensions(prev => ({ ...prev, [field]: isNaN(num) ? 0 : num }));
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    
    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      // Remove data:image/jpeg;base64, prefix
      const base64Data = base64String.split(',')[1];

      const analysis = await analyzeItemImage(base64Data);
      
      if (analysis) {
        setWeight(analysis.weight);
        setDimensions({
          length: analysis.length,
          width: analysis.width,
          height: analysis.height
        });
      }
      setIsAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
      <div className="bg-babbel-900 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 flex items-center gap-3 mb-2">
          <div className="p-2 bg-gold-500 rounded-lg text-babbel-900">
             <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold tracking-wide">{t.sim_title}</h3>
        </div>
        <p className="text-babbel-100 text-sm relative z-10">{t.sim_subtitle}</p>
      </div>

      <div className="p-8 grid gap-5 relative">
        {/* Loading Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
            <Loader2 className="w-10 h-10 text-gold-500 animate-spin mb-2" />
            <p className="text-babbel-900 font-bold animate-pulse">{t.sim_ai_analyzing}</p>
          </div>
        )}

        {/* AI Scan Button */}
        <div className="mb-2">
           <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             accept="image/*"
             onChange={handleFileChange}
           />
           <button 
             onClick={triggerFileInput}
             className="w-full py-2 px-4 bg-gradient-to-r from-babbel-50 to-white border border-babbel-200 rounded-xl text-babbel-800 text-sm font-bold flex items-center justify-center gap-2 hover:from-babbel-100 hover:shadow-md transition group"
           >
             <Scan className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
             {t.sim_ai_btn}
           </button>
        </div>

        {/* Origin */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Warehouse className="w-4 h-4 text-gold-500" /> 
            {t.sim_origin}
          </label>
          <select 
            value={originId} 
            onChange={(e) => setOriginId(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition bg-gray-50 font-medium"
          >
            {WAREHOUSES.map(w => (
              <option key={w.id} value={w.id}>{w.flag} {getTrans(`wh_${w.id}`)}</option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
           <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Plane className="w-4 h-4 text-gold-500" /> 
            {t.sim_dest}
          </label>
          <select 
            value={zoneId} 
            onChange={(e) => setZoneId(e.target.value)}
            className="block w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold-500 focus:ring-2 focus:ring-gold-200 transition bg-gray-50 font-medium"
          >
            {ZONES.map(z => (
              <option key={z.id} value={z.id}>{getTrans(`zone_${z.id}`)}</option>
            ))}
          </select>
        </div>

        {/* Dimensions */}
        <div>
           <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
            <Ruler className="w-4 h-4 text-gold-500" /> 
            {t.sim_dim}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative">
              <input 
                type="number" 
                value={dimensions.length}
                onChange={(e) => handleDimensionChange('length', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-center font-bold text-gray-700"
                placeholder={getTrans('dim_len')}
              />
              <span className="absolute top-2 right-2 text-xs text-gray-400 pointer-events-none">{getTrans('dim_len')}</span>
            </div>
            <div className="relative">
              <input 
                type="number" 
                value={dimensions.width}
                onChange={(e) => handleDimensionChange('width', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-center font-bold text-gray-700"
                placeholder={getTrans('dim_wid')}
              />
              <span className="absolute top-2 right-2 text-xs text-gray-400 pointer-events-none">{getTrans('dim_wid')}</span>
            </div>
            <div className="relative">
              <input 
                type="number" 
                value={dimensions.height}
                onChange={(e) => handleDimensionChange('height', e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:border-gold-500 focus:ring-2 focus:ring-gold-200 outline-none text-center font-bold text-gray-700"
                placeholder={getTrans('dim_hei')}
              />
              <span className="absolute top-2 right-2 text-xs text-gray-400 pointer-events-none">{getTrans('dim_hei')}</span>
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-gold-500" />
              {t.sim_weight}
            </div>
            <span className="font-mono font-bold text-babbel-900">{weight} kg</span>
          </label>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input 
              type="range" 
              min="0.1" 
              max="30" 
              step="0.1" 
              value={weight} 
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
          </div>
        </div>

        {/* Volumetric Warning */}
        {isVolumetricApplied && (
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 leading-tight">
              {t.sim_volumetric}: <strong>{volumetricWeight.toFixed(2)} kg</strong>. 
              {t.sim_volumetric_desc}
            </p>
          </div>
        )}

        <div className="h-px bg-gray-100 my-1"></div>

        {/* Result */}
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.sim_estimate}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold text-babbel-900">{estimatedPrice.toFixed(2)}€</span>
              </div>
            </div>
            <button className="bg-babbel-900 text-white p-4 rounded-xl hover:bg-gold-500 hover:text-babbel-900 transition-all shadow-lg hover:shadow-gold-500/30 group">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition rtl:rotate-180" />
            </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center leading-tight">
          {t.sim_disclaimer}
        </p>
      </div>
    </div>
  );
};
import React from 'react';
import { Package, Truck, Archive, AlertCircle, CheckCircle2 } from 'lucide-react';
import { MOCK_PACKAGES, TRANSLATIONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LanguageCode } from '../types';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  currentLang?: LanguageCode;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentLang = 'fr' }) => {
  const t = TRANSLATIONS[currentLang];
  const { user } = useAuth();

  const data = [
    { name: t.dash_status_stock, value: 2, color: '#0ea5e9' },
    { name: t.dash_status_shipped, value: 1, color: '#10b981' },
    { name: t.dash_status_pending, value: 0, color: '#f59e0b' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{t.dash_title}</h2>
          <p className="text-gray-500 mt-1">
            {user?.full_name ? `Bonjour, ${user.full_name}. ` : ''} {t.dash_subtitle}
          </p>
          <p className="text-xs text-babbel-500 mt-1 font-mono">{user?.email}</p>
        </div>
        <button className="bg-babbel-600 text-white px-6 py-2 rounded-full font-medium hover:bg-babbel-700 transition">
          {t.dash_new_expected}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Analytics Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 lg:col-span-1">
          <h3 className="font-bold text-gray-800 mb-4">{t.dash_stock_overview}</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-3xl font-bold text-gray-800">3</span>
              <span className="text-xs text-gray-500">{t.dash_total_packages}</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-babbel-500"></div> {t.dash_legend_stock}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div> {t.dash_legend_shipped}
            </div>
          </div>
        </div>

        {/* Package List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-800">{t.dash_recent_packages}</h3>
          
          {MOCK_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${pkg.status === 'received' ? 'bg-babbel-100 text-babbel-600' : 'bg-green-100 text-green-600'}`}>
                  {pkg.status === 'received' ? <Archive className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900">{pkg.description}</h4>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">{pkg.id}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {t.dash_from}: <span className="font-medium text-gray-700">{pkg.origin}</span> • {t.dash_weight}: {pkg.weight}kg
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{t.dash_received_on} {pkg.dateReceived}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                 <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                   pkg.status === 'received' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                 }`}>
                   {pkg.status === 'received' ? t.dash_badge_stock : t.dash_badge_shipped}
                 </span>
                 {pkg.status === 'received' && (
                   <button className="text-sm font-medium text-babbel-600 hover:text-babbel-800 hover:underline">
                     {t.dash_btn_forward}
                   </button>
                 )}
              </div>
            </div>
          ))}

          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-orange-800 text-sm">{t.dash_advice_title}</h5>
              <p className="text-orange-700 text-xs mt-1">
                {t.dash_advice_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
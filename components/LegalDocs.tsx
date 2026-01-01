
import React from 'react';
import { Scale, FileText, Lock, Shield } from 'lucide-react';
import { LanguageCode } from '../types';
import { TRANSLATIONS } from '../constants';

interface LegalPageProps {
  currentLang: LanguageCode;
}

const LegalLayout = ({ title, subtitle, icon: Icon, children }: { title: string, subtitle: string, icon: any, children?: React.ReactNode }) => (
  <div className="bg-white min-h-screen font-sans pb-20">
    <div className="bg-babbel-900 text-white py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 font-bold tracking-widest uppercase text-xs mb-6">
          <Icon className="w-4 h-4" /> Legal
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-white leading-tight">
          {title}
        </h1>
        <p className="text-lg text-babbel-100 max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-gray-700 leading-relaxed space-y-8">
        {children}
      </div>
    </div>
  </div>
);

const Section = ({ title, children }: { title: string, children?: React.ReactNode }) => (
  <div className="space-y-4 border-b border-gray-100 pb-8 last:border-0 last:pb-0">
    <h3 className="text-xl font-serif font-bold text-babbel-900">{title}</h3>
    <div className="text-sm md:text-base text-gray-600 space-y-3">
      {children}
    </div>
  </div>
);

export const LegalNoticesPage: React.FC<LegalPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  return (
    <LegalLayout 
      title={getTrans('legal_page_title')}
      subtitle={getTrans('legal_page_subtitle')}
      icon={Scale}
    >
      <Section title={getTrans('legal_sec1_title')}>
        <p>{getTrans('legal_sec1_desc')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>{getTrans('legal_label_hq')} :</strong> 12 Rue de la Belle Étoile, 95700 Roissy-en-France, France.</li>
          <li><strong>{getTrans('legal_label_reg')} :</strong> RCS Pontoise B 123 456 789.</li>
          <li><strong>{getTrans('legal_label_vat')} :</strong> FR 12 123456789.</li>
          <li><strong>{getTrans('legal_label_dir')} :</strong> M. Hermès Trismégiste.</li>
          <li><strong>{getTrans('legal_label_contact')} :</strong> contact@roadsofbabel.com</li>
        </ul>
      </Section>

      <Section title={getTrans('legal_sec2_title')}>
        <p>{getTrans('legal_sec2_desc')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><strong>{getTrans('legal_label_addr')} :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</li>
          <li><strong>Web :</strong> https://vercel.com</li>
        </ul>
      </Section>

      <Section title={getTrans('legal_sec3_title')}>
        <p>{getTrans('legal_sec3_p1')}</p>
        <p>{getTrans('legal_sec3_p2')}</p>
      </Section>
    </LegalLayout>
  );
};

export const TermsPage: React.FC<LegalPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  return (
    <LegalLayout 
      title={getTrans('terms_page_title')}
      subtitle={getTrans('terms_page_subtitle')}
      icon={FileText}
    >
      <Section title={`1. ${getTrans('terms_sec1_title')}`}>
        <p>{getTrans('terms_sec1_desc')}</p>
      </Section>

      <Section title={`2. ${getTrans('terms_sec2_title')}`}>
        <p>{getTrans('terms_sec2_intro')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>{getTrans('terms_sec2_li1')}</li>
          <li>{getTrans('terms_sec2_li2')}</li>
          <li>{getTrans('terms_sec2_li3')}</li>
          <li>{getTrans('terms_sec2_li4')}</li>
          <li>{getTrans('terms_sec2_li5')}</li>
        </ul>
      </Section>

      <Section title={`3. ${getTrans('terms_sec3_title')}`}>
        <p>{getTrans('terms_sec3_p1')}</p>
        <p>{getTrans('terms_sec3_p2')}</p>
      </Section>

      <Section title={`4. ${getTrans('terms_sec4_title')}`}>
        <p>{getTrans('terms_sec4_p1')}</p>
        <p dangerouslySetInnerHTML={{ __html: getTrans('terms_sec4_p2') }}></p>
      </Section>

      <Section title={`5. ${getTrans('terms_sec5_title')}`}>
        <p>{getTrans('terms_sec5_p1')}</p>
        <p>{getTrans('terms_sec5_p2')}</p>
      </Section>

      <Section title={`6. ${getTrans('terms_sec6_title')}`}>
        <p>{getTrans('terms_sec6_p1')}</p>
      </Section>
    </LegalLayout>
  );
};

export const PrivacyPage: React.FC<LegalPageProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const getTrans = (key: string) => (t as any)[key] || key;

  return (
    <LegalLayout 
      title={getTrans('privacy_page_title')} 
      subtitle={getTrans('privacy_page_subtitle')}
      icon={Shield}
    >
      <Section title={`1. ${getTrans('privacy_sec1_title')}`}>
        <p>{getTrans('privacy_sec1_intro')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>{getTrans('privacy_sec1_li1')}</li>
          <li>{getTrans('privacy_sec1_li2')}</li>
          <li>{getTrans('privacy_sec1_li3')}</li>
        </ul>
      </Section>

      <Section title={`2. ${getTrans('privacy_sec2_title')}`}>
        <p>{getTrans('privacy_sec2_intro')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>{getTrans('privacy_sec2_li1')}</li>
          <li>{getTrans('privacy_sec2_li2')}</li>
          <li>{getTrans('privacy_sec2_li3')}</li>
          <li>{getTrans('privacy_sec2_li4')}</li>
        </ul>
      </Section>

      <Section title={`3. ${getTrans('privacy_sec3_title')}`}>
        <p>{getTrans('privacy_sec3_intro')}</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>{getTrans('privacy_sec3_li1')}</li>
          <li>{getTrans('privacy_sec3_li2')}</li>
          <li>{getTrans('privacy_sec3_li3')}</li>
        </ul>
        <p className="mt-2">{getTrans('privacy_sec3_outro')}</p>
      </Section>

      <Section title={`4. ${getTrans('privacy_sec4_title')}`}>
        <p>{getTrans('privacy_sec4_p1')}</p>
        <p dangerouslySetInnerHTML={{ __html: getTrans('privacy_sec4_p2') }}></p>
      </Section>

      <Section title={`5. ${getTrans('privacy_sec5_title')}`}>
        <p>{getTrans('privacy_sec5_desc')}</p>
      </Section>
    </LegalLayout>
  );
};

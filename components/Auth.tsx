import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { AppView } from '../types';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

interface AuthProps {
  setView: (view: AppView) => void;
}

export const Auth: React.FC<AuthProps> = ({ setView }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Pour le User Service
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        // 1. Inscription via Auth Service
        const regRes = await api.auth.register(email, password);
        const user = regRes.user;
        
        // 2. Connexion automatique pour avoir le token
        const loginRes = await api.auth.login(email, password);
        const token = loginRes.session.access_token;

        // 3. Mise à jour du profil via User Service (si nom fourni)
        if (fullName && user && token) {
          try {
            await api.user.updateProfile(user.id, { full_name: fullName }, token);
            user.full_name = fullName; // Update local state
          } catch (profileError) {
            console.error("Erreur mise à jour profil", profileError);
          }
        }

        login(token, user);
      } else {
        // Login
        const res = await api.auth.login(email, password);
        const token = res.session.access_token;
        const authUser = res.session.user;

        // Fetch profile details
        let profile = {};
        try {
          profile = await api.user.getProfile(authUser.id, token);
        } catch (e) { console.log('Profile fetch failed', e); }

        login(token, { ...authUser, ...profile });
      }
      
      setView(AppView.DASHBOARD);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-babbel-900 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl font-serif font-bold text-white relative z-10">
            {isRegistering ? 'Rejoignez Babel' : 'Connexion'}
          </h2>
          <p className="text-babbel-200 text-sm mt-2 relative z-10">
            {isRegistering ? 'Créez votre portail vers le commerce mondial.' : 'Accédez à votre hub logistique.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nom complet</label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-babbel-500 outline-none transition"
                    placeholder="Jean Dupont"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-babbel-500 outline-none transition"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-babbel-500 outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-babbel-900 text-white py-3 rounded-xl font-bold shadow-lg shadow-babbel-900/20 hover:bg-gold-500 hover:text-babbel-900 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isRegistering ? "S'inscrire" : "Se connecter"} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="text-center text-sm text-gray-500">
            {isRegistering ? "Déjà un compte ?" : "Pas encore de compte ?"}
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="ml-2 font-bold text-babbel-600 hover:underline"
            >
              {isRegistering ? "Se connecter" : "Créer un compte"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
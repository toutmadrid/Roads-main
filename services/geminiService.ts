import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

// Interface pour le contexte des paquets
interface PackageContext {
  id: string;
  trackingNumber: string;
  origin: string;
  weight: number;
  status: string;
  description: string;
  dateReceived?: string;
}

export const chatWithAssistant = async (
  history: { role: string; text: string }[], 
  newMessage: string,
  contextData: PackageContext[] = []
): Promise<string> => {
  const ai = getClient();

  // Création d'une chaîne lisible pour le contexte des paquets
  const contextString = contextData.length > 0 
    ? `VOICI LES COLIS ACTUELS DE L'UTILISATEUR (Database): ${JSON.stringify(contextData)}`
    : "L'utilisateur n'a pas de colis pour le moment.";
  
  const systemInstruction = `
    Tu es "Hermès", l'assistant IA intelligent de "Roads of Babel".
    
    CONTEXTE UTILISATEUR EN TEMPS RÉEL :
    ${contextString}

    INFORMATIONS CLÉS SUR ROADS OF BABEL :
    1. **Entrepôts de réception** : France 🇫🇷, USA 🇺🇸, Royaume-Uni 🇬🇧, Allemagne 🇩🇪, Italie 🇮🇹, Espagne 🇪🇸. Les clients peuvent acheter dans ces pays.
    2. **Service Off-Tax** : Nous permettons la récupération de TVA pour les résidents hors-UE achetant en Europe.
    3. **Paiements** : Nous acceptons CB, PayPal, mais aussi Bitcoin (BTC) et Stablecoins (USDC/USDT).
    4. **Mission** : Connecter les marchés mondiaux à chaque individu, briser les barrières logistiques.

    TON RÔLE :
    - Utilise le CONTEXTE UTILISATEUR pour répondre aux questions spécifiques sur les colis (ex: "Où est mon colis Nike ?").
    - Aider à estimer les coûts (renvoie toujours vers le simulateur pour la précision).
    - Expliquer le fonctionnement (Réception -> Consolidation -> Expédition).
    - Conseiller sur la consolidation (regrouper les colis = économies).
    
    TON STYLE :
    - Éloquent mais concis. Un peu "architecte", sophistiqué.
    - Tu es l'expert logistique.
    - Si l'utilisateur demande un statut de colis qui n'est pas dans la liste, dis-le clairement.
  `;

  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "Les routes de Babel sont encombrées, veuillez réessayer plus tard.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une perturbation dans les voies de communication m'empêche de répondre. Réessayez plus tard.";
  }
};

// Nouvelle fonction pour l'analyse d'image (Vision)
export const analyzeItemImage = async (base64Image: string): Promise<{ weight: number; length: number; width: number; height: number; category: string } | null> => {
  const ai = getClient();
  const model = 'gemini-2.5-flash';

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Ou png, détecté dynamiquement idéalement, mais jpeg passe souvent
              data: base64Image
            }
          },
          {
            text: "Identify this object. Estimate its realistic shipping weight in kg and dimensions (length, width, height) in cm. Return ONLY a JSON object with these keys: weight, length, width, height, category. Example: {\"weight\": 1.2, \"length\": 30, \"width\": 20, \"height\": 10, \"category\": \"Shoes\"}"
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            weight: { type: Type.NUMBER },
            length: { type: Type.NUMBER },
            width: { type: Type.NUMBER },
            height: { type: Type.NUMBER },
            category: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return null;
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    return null;
  }
};
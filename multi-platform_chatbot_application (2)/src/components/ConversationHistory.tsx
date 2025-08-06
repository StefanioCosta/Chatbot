import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ConversationHistory() {
  const [selectedPlatform, setSelectedPlatform] = useState<"whatsapp" | "instagram" | "facebook" | undefined>(undefined);
  const conversations = useQuery(api.conversations.list, { 
    platform: selectedPlatform,
    limit: 100 
  });

  if (conversations === undefined) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const platforms = [
    { value: undefined, label: "Todas as Plataformas", icon: "🌐" },
    { value: "whatsapp" as const, label: "WhatsApp", icon: "📱" },
    { value: "instagram" as const, label: "Instagram", icon: "📷" },
    { value: "facebook" as const, label: "Facebook", icon: "👥" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Histórico de Conversas ({conversations.length})
        </h2>
        <select
          value={selectedPlatform || ""}
          onChange={(e) => setSelectedPlatform(e.target.value as any || undefined)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {platforms.map((platform) => (
            <option key={platform.label} value={platform.value || ""}>
              {platform.icon} {platform.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div key={conversation._id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {conversation.platform === "whatsapp" && "📱"}
                  {conversation.platform === "instagram" && "📷"}
                  {conversation.platform === "facebook" && "👥"}
                </span>
                <span className="font-semibold text-gray-900 capitalize">
                  {conversation.platform}
                </span>
                <span className="text-sm text-gray-500">
                  ID: {conversation.senderId.slice(-8)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(conversation.timestamp).toLocaleString("pt-BR")}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600 mb-1">Pergunta:</p>
                <p className="text-gray-900">{conversation.message}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-600 mb-1">Resposta:</p>
                <p className="text-blue-900">{conversation.response}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma conversa registrada ainda.</p>
          <p>As conversas aparecerão aqui quando os usuários interagirem com o chatbot.</p>
        </div>
      )}
    </div>
  );
}

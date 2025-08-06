import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Stats() {
  const stats = useQuery(api.conversations.getStats);

  if (stats === undefined) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total de Conversas",
      value: stats.total,
      icon: "💬",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "WhatsApp",
      value: stats.whatsapp,
      icon: "📱",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Instagram",
      value: stats.instagram,
      icon: "📷",
      color: "bg-pink-50 text-pink-700",
    },
    {
      title: "Facebook",
      value: stats.facebook,
      icon: "👥",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Hoje",
      value: stats.today,
      icon: "📅",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Estatísticas do Chatbot
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <span className="text-xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          ℹ️ Informações Importantes
        </h3>
        <div className="text-blue-800 space-y-2">
          <p>• O chatbot responde automaticamente com base nas FAQs configuradas</p>
          <p>• As conversas são registradas para análise e melhoria</p>
          <p>• Configure os webhooks nas plataformas para receber mensagens</p>
        </div>
      </div>
    </div>
  );
}

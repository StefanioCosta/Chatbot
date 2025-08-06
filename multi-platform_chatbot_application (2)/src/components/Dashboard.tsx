import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FAQManager } from "./FAQManager";
import { ConversationHistory } from "./ConversationHistory";
import { WebhookInfo } from "./WebhookInfo";
import { Stats } from "./Stats";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"stats" | "faqs" | "conversations" | "webhooks">("stats");

  const tabs = [
    { id: "stats", label: "📊 Estatísticas", component: Stats },
    { id: "faqs", label: "❓ FAQs", component: FAQManager },
    { id: "conversations", label: "💬 Conversas", component: ConversationHistory },
    { id: "webhooks", label: "🔗 Webhooks", component: WebhookInfo },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Stats;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Chatbot Multi-Plataforma
        </h1>
        <p className="text-gray-600">
          Gerencie seu chatbot para WhatsApp, Instagram e Facebook Messenger
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

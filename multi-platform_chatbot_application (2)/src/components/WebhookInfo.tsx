import { useState } from "react";

export function WebhookInfo() {
  const [deploymentName, setDeploymentName] = useState("adamant-ram-662");
  
  const webhookUrls = [
    {
      platform: "WhatsApp",
      icon: "📱",
      url: `https://${deploymentName}.convex.site/webhook/whatsapp`,
      color: "text-green-600",
    },
    {
      platform: "Instagram",
      icon: "📷", 
      url: `https://${deploymentName}.convex.site/webhook/instagram`,
      color: "text-pink-600",
    },
    {
      platform: "Facebook",
      icon: "👥",
      url: `https://${deploymentName}.convex.site/webhook/facebook`, 
      color: "text-blue-600",
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Configuração de Webhooks
        </h2>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-yellow-800 font-semibold mb-2">⚠️ Configuração Necessária</h3>
          <p className="text-yellow-700 mb-2">
            Para que o chatbot funcione, você precisa configurar os webhooks nas plataformas:
          </p>
          <ol className="list-decimal list-inside text-yellow-700 space-y-1">
            <li>Acesse o Meta for Developers (developers.facebook.com)</li>
            <li>Configure seu app para WhatsApp, Instagram e/ou Facebook</li>
            <li>Use as URLs abaixo como webhooks</li>
            <li>Configure o VERIFY_TOKEN como variável de ambiente</li>
          </ol>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do seu deployment Convex:
          </label>
          <input
            type="text"
            value={deploymentName}
            onChange={(e) => setDeploymentName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your-deployment"
          />
        </div>
      </div>

      <div className="space-y-4">
        {webhookUrls.map((webhook) => (
          <div key={webhook.platform} className="bg-white border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{webhook.icon}</span>
                <h3 className={`font-semibold ${webhook.color}`}>
                  {webhook.platform}
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(webhook.url)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200 transition-colors"
              >
                📋 Copiar
              </button>
            </div>
            <div className="bg-gray-50 rounded p-2 font-mono text-sm break-all">
              {webhook.url}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-blue-900 font-semibold mb-2">
          📝 Variáveis de Ambiente Necessárias
        </h3>
        <div className="text-blue-800 space-y-1 font-mono text-sm">
          <p>VERIFY_TOKEN=seu_token_de_verificacao</p>
          <p>FB_PAGE_ACCESS_TOKEN=token_da_pagina_facebook</p>
          <p>IG_PAGE_ACCESS_TOKEN=token_da_pagina_instagram</p>
          <p>WHATSAPP_TOKEN=token_do_whatsapp_business</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-green-900 font-semibold mb-2">
          ✅ Como Testar
        </h3>
        <div className="text-green-800 space-y-1">
          <p>1. Configure os webhooks nas plataformas</p>
          <p>2. Envie uma mensagem para sua página/número</p>
          <p>3. Verifique se a resposta automática funciona</p>
          <p>4. Monitore as conversas na aba "Conversas"</p>
        </div>
      </div>
    </div>
  );
}

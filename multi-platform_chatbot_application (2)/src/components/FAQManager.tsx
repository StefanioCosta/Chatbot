import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function FAQManager() {
  const faqs = useQuery(api.faqs.listAll);
  const createFAQ = useMutation(api.faqs.create);
  const updateFAQ = useMutation(api.faqs.update);
  const removeFAQ = useMutation(api.faqs.remove);
  const seedFAQs = useMutation(api.seedData.seedFAQs);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    keywords: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const keywords = formData.keywords.split(",").map(k => k.trim()).filter(k => k);
      
      if (editingId) {
        await updateFAQ({
          id: editingId as any,
          question: formData.question,
          answer: formData.answer,
          keywords,
          isActive: true,
        });
        toast.success("FAQ atualizada com sucesso!");
        setEditingId(null);
      } else {
        await createFAQ({
          question: formData.question,
          answer: formData.answer,
          keywords,
        });
        toast.success("FAQ criada com sucesso!");
        setIsCreating(false);
      }
      
      setFormData({ question: "", answer: "", keywords: "" });
    } catch (error) {
      toast.error("Erro ao salvar FAQ");
    }
  };

  const handleEdit = (faq: any) => {
    setEditingId(faq._id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      keywords: faq.keywords.join(", "),
    });
    setIsCreating(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta FAQ?")) {
      try {
        await removeFAQ({ id: id as any });
        toast.success("FAQ excluída com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir FAQ");
      }
    }
  };

  const handleSeedData = async () => {
    try {
      await seedFAQs({});
      toast.success("Dados de exemplo carregados com sucesso!");
    } catch (error) {
      toast.error("Erro ao carregar dados de exemplo");
    }
  };

  if (faqs === undefined) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Gerenciar FAQs ({faqs.length})
        </h2>
        <div className="flex gap-2">
          {faqs.length === 0 && (
            <button
              onClick={handleSeedData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📚 Carregar Dados de Exemplo
            </button>
          )}
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isCreating ? "Cancelar" : "➕ Nova FAQ"}
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-gray-50 border rounded-lg p-4">
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            {editingId ? "Editar FAQ" : "Nova FAQ"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pergunta
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resposta
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Palavras-chave (separadas por vírgula)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="curso, preço, matrícula"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? "Atualizar" : "Criar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingId(null);
                  setFormData({ question: "", answer: "", keywords: "" });
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq._id} className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{faq.answer}</p>
            <div className="flex flex-wrap gap-1">
              {faq.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {faqs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Nenhuma FAQ cadastrada ainda.</p>
          <p>Clique em "Carregar Dados de Exemplo" para começar.</p>
        </div>
      )}
    </div>
  );
}

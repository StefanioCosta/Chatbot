import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedFAQs = mutation({
  args: {},
  handler: async (ctx) => {
    const faqs = [
      {
        question: "Quais cursos vocês têm?",
        answer: "Oferecemos os seguintes cursos: Informática, Saúde (Enfermagem e Análises Clínicas), Direito, Contabilidade e Administração.",
        keywords: ["cursos", "curso", "informática", "saúde", "enfermagem", "análises clínicas", "direito", "contabilidade", "administração"],
        isActive: true,
      },
      {
        question: "Qual é o preço da propina?",
        answer: "O valor da propina é de 33.000,00 Kz por mês.",
        keywords: ["propina", "preço", "valor", "mensalidade", "custo", "33000"],
        isActive: true,
      },
      {
        question: "Qual é o preço da matrícula e confirmação?",
        answer: "A matrícula e confirmação custam 16.500,00 Kz no total.",
        keywords: ["matrícula", "confirmação", "inscrição", "16500"],
        isActive: true,
      },
      {
        question: "Qual é o preço do uniforme?",
        answer: "Uniforme normal: 30.000,00 Kz. Educação Física: 35.000,00 Kz.",
        keywords: ["uniforme", "farda", "educação física", "30000", "35000"],
        isActive: true,
      },
      {
        question: "Quais são os documentos necessários?",
        answer: "1 cópia do B.I, 4 fotos tipo passe, Certificado da 9.ª classe, Atestado médico, Cartão de vacina, Talão de recenseamento militar (masculino).",
        keywords: ["documentos", "bi", "fotos", "certificado", "atestado", "vacina", "recenseamento"],
        isActive: true,
      },
      {
        question: "Qual é a vossa localização?",
        answer: "Luanda, Vila Alice, Rua João de Deus, junto à Av. Hoji Ya Henda (antiga Brasil), perto do Kibabo e da Cidadela.",
        keywords: ["localização", "endereço", "onde", "vila alice", "joão de deus", "kibabo", "cidadela"],
        isActive: true,
      },
      {
        question: "Quais são os outros custos adicionais?",
        answer: "Cartão: 12.000,00 Kz. Bata: 27.000,00 Kz.",
        keywords: ["custos", "cartão", "bata", "adicionais", "12000", "27000"],
        isActive: true,
      },
    ];

    for (const faq of faqs) {
      await ctx.db.insert("faqs", faq);
    }

    return { message: "FAQs seeded successfully", count: faqs.length };
  },
});

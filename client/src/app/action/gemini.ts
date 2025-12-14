"use server";

export async function analyzeChartData(chartName: string, chartData: string) {
  const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

  if (!apiKey) {
    return { success: false, message: "API Key eksik." };
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Anket Dashboard",
      },
      body: JSON.stringify({
        "model": "nex-agi/deepseek-v3.1-nex-n1:free",
        
        "messages": [
          {
            "role": "system",
            "content": `Sen bir veri analiz asistanısın. Görevin, sana verilen üniversite anket verilerini okuyup net bir dille özetlemek.

            TALİMATLAR:
            1. Cümlelerine "Verilere bakıldığında...", "Sonuçlara göre..." veya "Grafikte görüldüğü üzere..." gibi doğal girişlerle başlayabilirsin.
            2. Kesinlikle "JSON formatında", "Verilen string içinde", "Bu objede" gibi teknik terimler KULLANMA.
            3. Mutlaka en yüksek oranı veya en dikkat çekici sayıyı (%X şeklinde) cümlende geçir.
            4. Maksimum 2 cümle kur.
            5. ÖRNEK ÇIKTI GİBİ KONUŞ: "Verilere bakıldığında %44 ile erkeklerin katılımının yoğun olduğu görülmektedir. Lisans öğrencilerinin günlük kullanım oranının yüksek olduğu söylenebilir."`
          },
          {
            "role": "user",
            "content": `Analiz Konusu: ${chartName}\nVeriler: ${chartData}`
          }
        ],
        "temperature": 0.5,
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error("API Hatası:", data.error);
      return { 
        success: true, 
        message: "Veriler günceldir ancak yoğunluk nedeniyle şu anlık otomatik yorum oluşturulamadı." 
      };
    }

    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      return { success: false, message: "Yorum yok." };
    }

    // Tırnak işaretlerini temizle
    const cleanText = text.replace(/^"|"$/g, '').trim();

    return { success: true, message: cleanText };

  } catch (error) {
    console.error("Fetch Hatası:", error);
    return { success: false, message: "Bağlantı hatası." };
  }
}
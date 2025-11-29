export async function getAgeDistributionData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Gerçek anket verilerine göre yaş dağılımı
  return [
    { x: 18, y: 3 },
    { x: 19, y: 5 },
    { x: 20, y: 4 },
    { x: 21, y: 9 },
    { x: 22, y: 19 },
    { x: 23, y: 8 },
    { x: 24, y: 4 },
    { x: 25, y: 1 },
    { x: 26, y: 1 },
  ];
}

export function getAITrainingParticipationData() {
  // Gerçek anket verilerine göre yapay zeka eğitimine katılım oranı (54 kişi toplam)
  // "Daha önce herhangi bir yapay zeka eğitimi veya atölyesine katıldınız mı?"
  const participated = 16; // Evet
  const notParticipated = 38; // Hayır
  const total = participated + notParticipated;
  const percentage = (participated / total) * 100;
  
  return {
    participated,
    notParticipated,
    percentage: Math.round(percentage * 10) / 10, // 29.6%
  };
}

export async function getGenderDistributionData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Gerçek anket verilerine göre cinsiyet dağılımı
  // Erkek: 44.4%, Kadın: 55.6% (54 kişi toplam)
  return {
    male: 24,   // 44.4%
    female: 30, // 55.6%
  };
}

export async function getClassDistributionData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Gerçek anket verilerine göre sınıf dağılımı (54 kişi toplam)
  // Hazırlık: 0%, 1. Sınıf: 11.1%, 2. Sınıf: 14.8%, 3. Sınıf: 9.3%, 4. Sınıf: 64.8%
  return {
    hazirlik: 0,  // 0%
    sinif1: 6,    // 11.1%
    sinif2: 8,    // 14.8%
    sinif3: 5,    // 9.3%
    sinif4: 35,   // 64.8%
  };
}

export function getAIToolsUsageData() {
  // Gerçek anket verilerine göre yapay zeka araçları kullanımı (54 kişi toplam)
  return [
    { name: "ChatGPT", count: 53, percentage: 98.1 },
    { name: "Gemini", count: 44, percentage: 81.5 },
    { name: "Canva AI", count: 22, percentage: 40.7 },
    { name: "GitHub Copilot", count: 18, percentage: 33.3 },
    { name: "DeepSeek", count: 17, percentage: 31.5 },
    { name: "Claude", count: 17, percentage: 31.5 },
    { name: "Grok", count: 15, percentage: 27.8 },
    { name: "Microsoft Copilot", count: 15, percentage: 27.8 },
    { name: "Cursor", count: 10, percentage: 18.5 },
    { name: "ElevenLabs", count: 8, percentage: 14.8 },
    { name: "DALL-E", count: 5, percentage: 9.3 },
    { name: "Gamma", count: 5, percentage: 9.3 },
    { name: "Veo", count: 5, percentage: 9.3 },
    { name: "Sora", count: 5, percentage: 9.3 },
    { name: "Midjourney", count: 4, percentage: 7.4 },
    { name: "Luma AI", count: 1, percentage: 1.9 },
    { name: "Ollama, Codex(gpt), noteboo...", count: 1, percentage: 1.9 },
    { name: "Suno", count: 1, percentage: 1.9 },
  ];
}

export function getUsagePurposesData() {
  // Gerçek anket verilerine göre yapay zeka kullanım amaçları (54 kişi toplam)
  return [
    { name: "Ödev / proje hazırlama", count: 48, percentage: 88.9 },
    { name: "Ders notları / özet çıkarma", count: 44, percentage: 81.5 },
    { name: "Akademik araştırma / kaynak t...", count: 42, percentage: 77.8 },
    { name: "Sunum hazırlama", count: 41, percentage: 75.9 },
    { name: "Sınavlara / testlere hazırlanma", count: 38, percentage: 70.4 },
    { name: "Kodlama / yazılım geliştirme", count: 32, percentage: 59.3 },
    { name: "Görsel / grafik üretme", count: 25, percentage: 46.3 },
    { name: "Yaratıcı yazma / hikâye / metin...", count: 16, percentage: 29.6 },
    { name: "Video içerik üretme", count: 14, percentage: 25.9 },
    { name: "Müzik / ses üretimi", count: 9, percentage: 16.7 },
    { name: "herhangi bir konuda tavsiye,ön...", count: 1, percentage: 1.9 },
    { name: "Müzik yapmak ve içerik üretme...", count: 1, percentage: 1.9 },
  ];
}

export function getUsageFrequencyData() {
  // Gerçek anket verilerine göre yapay zeka kullanım sıklığı (54 kişi toplam)
  // Hiç kullanmıyorum: 0%, Ayda bir: 0%, Haftada bir: 7.4%, Haftada birkaç kez: 27.8%, Günlük: 61.1%
  return [
    { name: "Hiç kullanmıyorum", count: 0, percentage: 0 },
    { name: "Ayda bir", count: 2, percentage: 3.7 },
    { name: "Haftada bir", count: 4, percentage: 7.4 },
    { name: "Haftada birkaç kez", count: 15, percentage: 27.8 },
    { name: "Günlük", count: 33, percentage: 61.1 },
  ];
}

export function getGPADistributionData() {
  // Gerçek anket verilerine göre not ortalaması dağılımı (54 kişi toplam)
  // Resimden: < 2.00: %1.9 (1), 2.0-2.49: %9.3 (5), 2.50-2.99: %22.2 (12), 3.00-3.49: %50 (27), 3.50-4.00: %14.8 (8)
  return [
    { range: "< 2.00", count: 1, percentage: 1.9 },
    { range: "2.0 - 2.49", count: 5, percentage: 9.3 },
    { range: "2.50 - 2.99", count: 12, percentage: 22.2 },
    { range: "3.00 - 3.49", count: 27, percentage: 50.0 },
    { range: "3.50 - 4.00", count: 8, percentage: 14.8 },
  ];
}

export function getDepartmentDistributionData() {
  // Gerçek anket verilerine göre bölüm dağılımı (54 kişi toplam)
  // İlk 10 bölüm gösteriliyor, geri kalanlar "Diğer" altında toplanıyor
  const allDepartments = [
    { name: "Bilgisayar Mühendisliği", count: 21, percentage: 38.9 },
    { name: "Bilgisayar Tek. ve Bilişim Sis.", count: 5, percentage: 9.3 },
    { name: "Beden Eğitimi ve Spor Öğrt.", count: 3, percentage: 5.6 },
    { name: "Bilgi ve Belge Yönetimi", count: 3, percentage: 5.6 },
    { name: "Arapça Mütercim ve Tercümanlık", count: 2, percentage: 3.7 },
    { name: "Biyoteknoloji", count: 2, percentage: 3.7 },
    { name: "Çağdaş Türk Lehçeleri ve Edb.", count: 2, percentage: 3.7 },
    { name: "Ebelik", count: 2, percentage: 3.7 },
    { name: "Elektrik-Elektronik Müh.", count: 2, percentage: 3.7 },
    { name: "Hemşirelik", count: 2, percentage: 3.7 },
    // Diğer bölümler:
    // { name: "İngilizce Öğretmenliği", count: 2, percentage: 3.7 },
    // { name: "Makine Mühendisliği", count: 1, percentage: 1.9 },
    // { name: "Matematik Öğretmenliği", count: 1, percentage: 1.9 },
    // { name: "Psikoloji", count: 1, percentage: 1.9 },
    // { name: "Radyo, Sinema ve Televizyon", count: 1, percentage: 1.9 },
    // { name: "Sağlık Yönetimi", count: 1, percentage: 1.9 },
    // { name: "Sosyal Hizmet", count: 1, percentage: 1.9 },
    // { name: "Tarih", count: 1, percentage: 1.9 },
    // { name: "Türk Dili ve Edebiyatı", count: 1, percentage: 1.9 },
  ];

  // Diğer kategorisi: 9 bölüm, toplam 10 kişi
  const otherCount = 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1; // 10 kişi
  const otherPercentage = (otherCount / 54) * 100; // ~18.5%

  return [
    ...allDepartments,
    { name: "Diğer", count: otherCount, percentage: Math.round(otherPercentage * 10) / 10 },
  ];
}

export async function getDevicesUsedData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      name: "Desktop",
      percentage: 0.65,
      amount: 1625,
    },
    {
      name: "Tablet",
      percentage: 0.1,
      amount: 250,
    },
    {
      name: "Mobile",
      percentage: 0.2,
      amount: 500,
    },
    {
      name: "Unknown",
      percentage: 0.05,
      amount: 125,
    },
  ];

  if (timeFrame === "yearly") {
    data[0].amount = 19500;
    data[1].amount = 3000;
    data[2].amount = 6000;
    data[3].amount = 1500;
  }

  return data;
}

export async function getPaymentsOverviewData(
  timeFrame?: "monthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "yearly") {
    return {
      received: [
        { x: 2020, y: 450 },
        { x: 2021, y: 620 },
        { x: 2022, y: 780 },
        { x: 2023, y: 920 },
        { x: 2024, y: 1080 },
      ],
      due: [
        { x: 2020, y: 1480 },
        { x: 2021, y: 1720 },
        { x: 2022, y: 1950 },
        { x: 2023, y: 2300 },
        { x: 2024, y: 1200 },
      ],
    };
  }

  return {
    received: [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 35 },
      { x: "Apr", y: 45 },
      { x: "May", y: 35 },
      { x: "Jun", y: 55 },
      { x: "Jul", y: 65 },
      { x: "Aug", y: 50 },
      { x: "Sep", y: 65 },
      { x: "Oct", y: 75 },
      { x: "Nov", y: 60 },
      { x: "Dec", y: 75 },
    ],
    due: [
      { x: "Jan", y: 15 },
      { x: "Feb", y: 9 },
      { x: "Mar", y: 17 },
      { x: "Apr", y: 32 },
      { x: "May", y: 25 },
      { x: "Jun", y: 68 },
      { x: "Jul", y: 80 },
      { x: "Aug", y: 68 },
      { x: "Sep", y: 84 },
      { x: "Oct", y: 94 },
      { x: "Nov", y: 74 },
      { x: "Dec", y: 62 },
    ],
  };
}

export async function getWeeksProfitData(timeFrame?: string) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "last week") {
    return {
      sales: [
        { x: "Sat", y: 33 },
        { x: "Sun", y: 44 },
        { x: "Mon", y: 31 },
        { x: "Tue", y: 57 },
        { x: "Wed", y: 12 },
        { x: "Thu", y: 33 },
        { x: "Fri", y: 55 },
      ],
      revenue: [
        { x: "Sat", y: 10 },
        { x: "Sun", y: 20 },
        { x: "Mon", y: 17 },
        { x: "Tue", y: 7 },
        { x: "Wed", y: 10 },
        { x: "Thu", y: 23 },
        { x: "Fri", y: 13 },
      ],
    };
  }

  return {
    sales: [
      { x: "Sat", y: 44 },
      { x: "Sun", y: 55 },
      { x: "Mon", y: 41 },
      { x: "Tue", y: 67 },
      { x: "Wed", y: 22 },
      { x: "Thu", y: 43 },
      { x: "Fri", y: 65 },
    ],
    revenue: [
      { x: "Sat", y: 13 },
      { x: "Sun", y: 23 },
      { x: "Mon", y: 20 },
      { x: "Tue", y: 8 },
      { x: "Wed", y: 13 },
      { x: "Thu", y: 27 },
      { x: "Fri", y: 15 },
    ],
  };
}

export async function getCampaignVisitorsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_visitors: 784_000,
    performance: -1.5,
    chart: [
      { x: "S", y: 168 },
      { x: "S", y: 385 },
      { x: "M", y: 201 },
      { x: "T", y: 298 },
      { x: "W", y: 187 },
      { x: "T", y: 195 },
      { x: "F", y: 291 },
    ],
  };
}

export async function getVisitorsAnalyticsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270,
    190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
  ].map((value, index) => ({ x: index + 1 + "", y: value }));
}

export async function getCostsPerInteractionData() {
  return {
    avg_cost: 560.93,
    growth: 2.5,
    chart: [
      {
        name: "Google Ads",
        data: [
          { x: "Sep", y: 15 },
          { x: "Oct", y: 12 },
          { x: "Nov", y: 61 },
          { x: "Dec", y: 118 },
          { x: "Jan", y: 78 },
          { x: "Feb", y: 125 },
          { x: "Mar", y: 165 },
          { x: "Apr", y: 61 },
          { x: "May", y: 183 },
          { x: "Jun", y: 238 },
          { x: "Jul", y: 237 },
          { x: "Aug", y: 235 },
        ],
      },
      {
        name: "Facebook Ads",
        data: [
          { x: "Sep", y: 75 },
          { x: "Oct", y: 77 },
          { x: "Nov", y: 151 },
          { x: "Dec", y: 72 },
          { x: "Jan", y: 7 },
          { x: "Feb", y: 58 },
          { x: "Mar", y: 60 },
          { x: "Apr", y: 185 },
          { x: "May", y: 239 },
          { x: "Jun", y: 135 },
          { x: "Jul", y: 119 },
          { x: "Aug", y: 124 },
        ],
      },
    ],
  };
}
import * as Icons from "../icons"; // Senin mevcut ikonların (HomeIcon, Info vb.)
import { BarChart2 } from "lucide-react"; // Yeni ikonumuz

type NavItem = {
  title: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_DATA: NavSection[] = [
  {
    label: "MENÜLER",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon, // Mevcut ikonun
      },
      // 👇 YENİ EKLENEN KISIM BAŞLANGIÇ
      {
        title: "Kullanıcı İstatistikleri",
        url: "/user-stats",
       icon: BarChart2, // Lucide ikonu
      },
      // 👆 YENİ EKLENEN KISIM BİTİŞ
      {
        title: "Hakkımızda",
        url: "/about",
        icon: Icons.Info,
      },
      // Varsa diğer menülerin...
    ],
  },
  // Varsa diğer bölümler (Admin Paneli vb.)...
];
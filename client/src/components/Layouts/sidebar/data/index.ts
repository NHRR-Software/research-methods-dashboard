import * as Icons from "../icons";

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
    label: "Menüler",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
      },
      {
        title: "Hakkımızda",
        url: "/about",
        icon: Icons.Info,
      },
    ],
  },
];

import Image from "next/image";

type Profile = {
  id: number;
  name: string;
  image: string;
  linkedin?: string;
  github?: string;
};

const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Hamza Ali DOĞAN",
    image: "/teamusers/user1.svg",
    linkedin: "https://www.linkedin.com/in/hamzadogann/",
    github: "https://github.com/HamzaDogann",
  },
  {
    id: 2,
    name: "Nazmi KOÇAK",
    image: "/teamusers/user2.svg",
    linkedin: "https://www.linkedin.com/in/nazmikocak/",
    github: "https://github.com/nazmikocak",
  },
  {
    id: 3,
    name: "Ramazan YİĞİT",
    image: "/teamusers/user3.svg",
    linkedin: "https://www.linkedin.com/in/ramazanyi%C4%9Fit/",
    github: "https://github.com/ramazanyigit18",
  },
  {
    id: 4,
    name: "Rabia YAZLI",
    image: "/teamusers/user4.svg",
    linkedin: "https://www.linkedin.com/in/rabiayazl%C4%B134/",
    github: "https://github.com/rabiay34",
  },
];

export default function Page() {
  return (
    <main className="min-h-[60vh] p-8">
      <h1 className="mb-6 text-center text-2xl font-semibold">Hakkımızda</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROFILES.map((p) => (
          <div
            key={p.id}
            className="flex flex-col items-center rounded-lg bg-white/80 p-6 text-center shadow-sm dark:bg-slate-800/60"
          >
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
              <Image
                src={p.image}
                alt={p.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-2 font-medium">{p.name}</div>
            <div className="flex gap-3">
              <a
                href={p.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-700 hover:underline dark:text-gray-300"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

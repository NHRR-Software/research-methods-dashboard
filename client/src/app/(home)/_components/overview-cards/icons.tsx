import type { SVGProps } from "react";

type SVGPropsType = SVGProps<SVGSVGElement>;

// Katılımcı ikonu - İnsanlar
export function Participants(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#3FD97F" />
      <ellipse
        cx={25.7511}
        cy={22.4998}
        rx={4.33333}
        ry={4.33333}
        fill="#fff"
      />
      <ellipse
        cx={25.7511}
        cy={34.4178}
        rx={7.58333}
        ry={4.33333}
        fill="#fff"
      />
      <path
        d="M38.75 34.417c0 1.795-2.206 3.25-4.898 3.25.793-.867 1.339-1.955 1.339-3.248 0-1.295-.547-2.384-1.342-3.252 2.693 0 4.9 1.455 4.9 3.25zM35.5 22.501a3.25 3.25 0 01-4.364 3.054 6.163 6.163 0 00.805-3.055c0-1.11-.293-2.152-.804-3.053A3.25 3.25 0 0135.5 22.5z"
        fill="#fff"
      />
    </svg>
  );
}

// Bölüm ikonu - Klasör/Kategori
export function Departments(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#8155FF" />
      <path
        d="M20 24.5C20 22.014 20 20.772 20.732 19.886C21.464 19 22.634 19 25 19H26.757C27.942 19 28.535 19 29.057 19.224C29.579 19.448 29.978 19.872 30.778 20.721L31.222 21.188C32.022 22.037 32.422 22.462 32.943 22.686C33.465 22.91 34.058 22.91 35.243 22.91H37C39.366 22.91 40.536 22.91 41.268 23.796C42 24.682 42 25.924 42 28.41V33.5C42 35.986 42 37.228 41.268 38.114C40.536 39 39.366 39 37 39H25C22.634 39 21.464 39 20.732 38.114C20 37.228 20 35.986 20 33.5V24.5Z"
        fill="#fff"
      />
    </svg>
  );
}

// Yaş ikonu - Takvim/Saat
export function Age(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#FF9C55" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29 40c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11zm.75-16.5a.75.75 0 00-1.5 0v5.25c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5H29.75v-4.5z"
        fill="#fff"
      />
    </svg>
  );
}

// Not ortalaması ikonu - Yıldız/Başarı
export function GPA(props: SVGPropsType) {
  return (
    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" {...props}>
      <circle cx={29} cy={29} r={29} fill="#18BFFF" />
      <path
        d="M29 18L31.472 25.528H39.36L32.944 30.194L35.416 37.722L29 33.056L22.584 37.722L25.056 30.194L18.64 25.528H26.528L29 18Z"
        fill="#fff"
      />
    </svg>
  );
}

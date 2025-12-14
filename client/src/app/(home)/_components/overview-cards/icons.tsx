import { FiUsers, FiFolder, FiClock, FiStar } from "react-icons/fi";
import type { ComponentProps } from "react";

export function Participants(props: ComponentProps<'div'>) {
  return (
    <div
      className="w-14 h-14 rounded-full bg-[#3FD97F] flex items-center justify-center"
      {...props}
    >
      <FiUsers className="text-white" size={24} aria-hidden />
    </div>
  );
}

export function Departments(props: ComponentProps<'div'>) {
  return (
    <div
      className="w-14 h-14 rounded-full bg-[#5f89ff] flex items-center justify-center"
      {...props}
    >
      <FiFolder className="text-white" size={24} aria-hidden />
    </div>
  );
}

export function Age(props: ComponentProps<'div'>) {
  return (
    <div
      className="w-14 h-14 rounded-full bg-[#FF9C55] flex items-center justify-center"
      {...props}
    >
      <FiClock className="text-white" size={22} aria-hidden />
    </div>
  );
}

export function GPA(props: ComponentProps<'div'>) {
  return (
    <div
      className="w-14 h-14 rounded-full bg-[#ff5c57] flex items-center justify-center"
      {...props}
    >
      <FiStar className="text-white" size={22} aria-hidden />
    </div>
  );
}

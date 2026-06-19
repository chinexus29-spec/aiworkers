import Link from "next/link";
import { LucideIcon } from "lucide-react";

type ActionCardProps = {
  title: string;
  icon: LucideIcon;
  href: string;
};

export default function ActionCard({
  title,
  icon: Icon,
  href,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className="card flex flex-col items-center justify-center gap-2"
    >
      <Icon
        size={24}
        className="text-blue-500"
      />

      <span className="text-sm font-medium">
        {title}
      </span>
    </Link>
  );
}
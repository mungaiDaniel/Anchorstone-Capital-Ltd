import {
  Award,
  Building2,
  Gauge,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Sprout,
  Target,
  Briefcase,
  Car,
  Coins,
  Eye,
  GraduationCap,
  Heart,
  Landmark,
  LineChart,
  Scale,
  Umbrella,
  User,
  Users,
  Zap,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/content/site";

const icons: Record<IconName, React.ComponentType<LucideProps>> = {
  car: Car,
  user: User,
  "graduation-cap": GraduationCap,
  briefcase: Briefcase,
  umbrella: Umbrella,
  zap: Zap,
  eye: Eye,
  heart: Heart,
  users: Users,
  award: Award,
  landmark: Landmark,
  scale: Scale,
  "line-chart": LineChart,
  coins: Coins,
  "shield-check": ShieldCheck,
  gauge: Gauge,
  handshake: Handshake,
  building: Building2,
  sprout: Sprout,
  target: Target,
  "message-circle": MessageCircle,
};

/** Thin-stroke line icon from the content icon name. Decorative. */
export function Icon({ name, className = "size-6", ...props }: { name: IconName } & LucideProps) {
  const Cmp = icons[name];
  return <Cmp className={className} strokeWidth={1.5} aria-hidden="true" focusable="false" {...props} />;
}

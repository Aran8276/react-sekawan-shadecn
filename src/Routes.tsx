import { CarFront, Earth, PackageSearch, Utensils } from "lucide-react";
import { ReactNode } from "react";

interface Route {
  tooltip: string;
  icon: ReactNode;
  to: string;
}

export const RouteList: Route[] = [
  {
    tooltip: "Produk",
    icon: <PackageSearch className="size-5" />,
    to: "/products",
  },
  {
    tooltip: "Resto",
    icon: <Utensils className="size-5" />,
    to: "/restaurants",
  },
  {
    tooltip: "Negara",
    icon: <Earth className="size-5" />,
    to: "/countries",
  },
  {
    tooltip: "Armada",
    icon: <CarFront className="size-5" />,
    to: "/cars",
  },
];

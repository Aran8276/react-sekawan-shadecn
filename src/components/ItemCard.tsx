import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/pages/Product/ProductList";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface SelfProps extends Product {
  btnLabel: string;
  to: string;
}

export default function ItemCard(props: SelfProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-2 pb-2">{props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-5 justify-center">
          <div className="flex justify-center">
            <img
              src={props.image}
              className="rounded-xl h-[200px] object-cover"
              alt={props.title}
            />
          </div>
          <CardDescription className="line-clamp-3">
            {props.description}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={props.to}>
          <Button>{props.btnLabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

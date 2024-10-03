import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ProductDetail } from "./ProductDetail";

export default function ProductDetailView(props: {
  data: ProductDetail | undefined;
}) {
  return (
    <>
      {props.data ? (
        <div className="flex flex-col space-y-4">
          <Card className="flex space-x-20 flex-col w-[370px] md:w-full md:flex md:flex-row">
            <CardHeader className="w-[768px]">
              <CardTitle className="text-3xl">{props.data.title}</CardTitle>
              <CardDescription className="w-[320px] md:w-full text-md text-justify">
                {props.data.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center pt-4">
                <img
                  src={props.data.image}
                  alt={props.data.title}
                  className="h-[335px] object-contain rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="">loading</div>
      )}
    </>
  );
}

import { Country } from "./CountryList";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CountryDetailView(props: {
  data: Country | undefined;
}) {
  return (
    <>
      {props.data ? (
        <div className="flex flex-col space-y-4">
          <Card className="flex-col w-[370px] md:w-full md:flex md:flex-row">
            <CardHeader className="w-[768px]">
              <CardTitle className="text-3xl">{props.data.name}</CardTitle>
              <CardDescription className="w-[320px] md:w-full text-md text-justify">
                <div className="flex flex-col">
                  <p className="text-lg">Ibukota: {props.data.capital}</p>
                  <p className="text-lg">Mata Uang: {props.data.currency}</p>
                  <p className="text-lg">
                    Densitas Penduduk: {props.data.density}
                  </p>
                  <p className="text-lg">Luas: {props.data.land_area}m^2</p>
                  <p className="text-lg">
                    Jumlah Penduduk: {props.data.population.toLocaleString()}
                  </p>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-4">
                <img
                  src={props.data.flag}
                  alt={props.data.name}
                  className="w-[768px] rounded-xl"
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

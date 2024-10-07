import { isId, Language } from "@/components/Header";
import { useSelector } from "react-redux";
import { Country } from "./CountryList";
import ItemCard from "@/components/ItemCard";

export default function CountryView(props: { data: Country[] }) {
  const lang = useSelector((store: Language) => store);
  const langString = lang.lang.lang;

  return (
    <div className="flex flex-col p-8">
      <div className="pb-4">
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
          {isId(langString, "Negara", "Countries")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <ItemCard
                to={`/country/${item.id}`}
                btnLabel={isId(langString, "Lihat Detail", "View Details")}
                description={item.currency}
                id={item.id}
                image={item.flag}
                title={item.name}
                key={index}
              />
            );
          })
        ) : (
          <div className="">Loading</div>
        )}
      </div>
    </div>
  );
}

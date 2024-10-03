import { Country } from "./CountryList";
import ItemCard from "@/components/ItemCard";

export default function CountryView(props: { data: Country[] }) {
  return (
    <div className="flex flex-col p-8">
      <div className="pb-4">
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
          Negara
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <ItemCard
                to={`/country/${item.id}`}
                btnLabel="Lihat Detail"
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

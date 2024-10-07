import ItemCard from "@/components/ItemCard";
import { Restaurant } from "./RestaurantList";
import { GlobalValueInterface } from "@/components/GlobalValue";
import { isId, Language } from "@/components/Header";
import { useSelector } from "react-redux";

export default function RestaurantView(props: {
  data: Restaurant[];
  context: GlobalValueInterface | null;
}) {
  const lang = useSelector((store: Language) => store);
  const langString = lang.lang.lang;
  return (
    <div className="flex flex-col p-8">
      <div className="pb-4">
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
          {isId(langString, "Resto", "Restaurants")} {props.context?.text}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <ItemCard
                to={`/restaurant/${item.id}`}
                btnLabel={isId(langString, "Kunjungi", "Visit")}
                description={item.description}
                id={item.id}
                image={`https://restaurant-api.dicoding.dev/images/medium/${item.pictureId}`}
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

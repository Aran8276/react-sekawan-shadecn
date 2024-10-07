import ItemCard from "@/components/ItemCard";
import { Product } from "./ProductList";
import { useSelector } from "react-redux";
import { isId, Language } from "@/components/Header";

interface SelfProps {
  data: Product[];
}

export default function ProductView(props: SelfProps) {
  const lang = useSelector((store: Language) => store);
  const langString = lang.lang.lang;

  return (
    <div className="flex flex-col p-8">
      <div className="pb-4">
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
          <span>{isId(langString, "Produk", "Products")}</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <ItemCard
                to={`/product/${item.id}`}
                btnLabel={isId(langString, "Beli Sekarang", "Buy Now")}
                category={item.category}
                description={item.description}
                id={item.id}
                image={item.image}
                price={item.price}
                rating={item.rating}
                title={item.title}
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

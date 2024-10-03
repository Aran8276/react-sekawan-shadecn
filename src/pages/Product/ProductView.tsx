import ItemCard from "@/components/ItemCard";
import { Product } from "./ProductList";

interface SelfProps {
  data: Product[];
}

export default function ProductView(props: SelfProps) {
  return (
    <div className="flex flex-col p-8">
      <div className="pb-4">
        <h2 className="flex-1 shrink-0 whitespace-nowrap text-3xl font-semibold tracking-tight sm:grow-0">
          Produk
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {props.data ? (
          props.data.map((item, index) => {
            return (
              <ItemCard
                to={`/product/${item.id}`}
                btnLabel="Beli Sekarang"
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

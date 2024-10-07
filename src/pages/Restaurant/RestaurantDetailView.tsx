import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  city: string;
  address: string;
  pictureId: string;
  categories: Category[];
  menus: Menus;
  rating: number;
  customerReviews: CustomerReview[];
}

export interface Category {
  name: string;
}

export interface CustomerReview {
  name: string;
  review: string;
  date: string;
}

export interface Menus {
  foods: Category[];
  drinks: Category[];
}

export default function RestaurantDetailView(props: {
  data: Restaurant | undefined;
}) {
  return (
    <>
      {props.data ? (
        <div className="flex flex-col space-y-4">
          <Card className="flex-col w-[370px] md:w-full md:flex md:flex-row">
            <CardHeader className="w-[768px]">
              <CardTitle className="text-3xl">{props.data.name}</CardTitle>
              <CardDescription className="w-[320px] md:w-full text-md text-justify">
                {props.data.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="pt-4">
                <img
                  src={`https://restaurant-api.dicoding.dev/images/large/${props.data.pictureId}`}
                  alt={props.data.name}
                  className="w-[768px] rounded-xl"
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {props.data.customerReviews?.map((item, index) => {
              return (
                <Card className="" key={index}>
                  <CardHeader className="text-lg text-slate-800 font-bold">
                    {item.name}
                  </CardHeader>
                  <CardContent>{item.review}</CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="">loading</div>
      )}
    </>
  );
}

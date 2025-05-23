import NoItems from "@/app/components/NoItems";
import  ListeningCards  from "@/shared/components/general/ListeningCard";
import { User } from "@prisma/client";
import { Home } from "@prisma/client";

type HomeWithFavorite = Home & {
  Favorite: {
    id: string;
  }[];
};

export default function ListeningView({listing, user}: {listing: HomeWithFavorite[], user: User}) {
  return (
 <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {listing.length === 0 ? (
        <NoItems
          description="Please add a home to your list"
          title="You don't have any homes listed"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {listing.map((item) => (
            <ListeningCards
              key={item.id}
              imagePath={item.photo as string}
              homeId={item.id}
              price={item.price as number}
              description={item.description as string}
              location={item.country as string}
              userId={user.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              favoriteId={item.Favorite[0]?.id}
              pathName="/my-homes"
            />
          ))}
        </div>
      )}
    </section>   
  )
}
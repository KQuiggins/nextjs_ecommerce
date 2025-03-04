import { Badge } from "@/components/ui/badge"

import { Card, CardContent } from "@/components/ui/card"
import { getComicBySlug } from "@/lib/actions/comic.actions"
import { notFound } from "next/navigation"
import ComicPrice from "@/components/shared/comics/comic-price"
import ComicImages  from "@/components/shared/comics/comic-images"
import AddToCart from "@/components/shared/comics/add-to-cart"

const ComicDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params

  const comic = await getComicBySlug(slug)
  console.log(comic);
  
  if (!comic) {
    notFound()
  }
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Image Column */}
        <div className="col-span-2">
          <ComicImages images={comic.images} />
        </div>
        {/* Details Column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>{comic.brand} {comic.category}</p>
            <h1 className="h3-bold">{comic.name}</h1>
            <p>{comic.rating} of {comic.numReviews}</p>
            <div className="flex flex-col sm:flex-row sm:iems-center gap-3">
              <ComicPrice value={Number(comic.price)} className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2" />

            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold">
              {comic.description}
            </p>
          </div>
        </div>
        {/* Action Column */}
        <div>
          <Card>
            <CardContent>
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>
                  <ComicPrice value={Number(comic.price)} />
                </div>
              </div>
              <div className="mb-2 flex justify-between">
                {comic.stock > 0 ? (
                  <Badge variant="outline">In Stock</Badge>) : (
                  <Badge variant="destructive">Out of Stock</Badge>)}
              </div>
              {comic.stock > 0 && (
                <div className="flex-center">
                  <AddToCart item={{
                    productId: comic.id,
                    name: comic.name,
                    slug: comic.slug,
                    price: comic.price,
                    qty: 1,
                    image: comic.images![0],
                    
                  }} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ComicDetailsPage
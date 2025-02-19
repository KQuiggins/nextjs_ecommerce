import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getComicBySlug } from "@/lib/actions/comic.actions"
import { notFound } from "next/navigation"
import ComicPrice from "@/components/shared/comics/comic-price"

const ComicDetailsPage = async ( props: { params: Promise<{ slug: string }> }) => {
    const { slug } = await props.params

    const comic = await getComicBySlug(slug)
    if (!comic) {
        notFound()
    }
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Image Column */}
        <div className="col-span-2">{/* Image Component */}</div>
        {/* Details Column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>{comic.brand} {comic.category}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComicDetailsPage
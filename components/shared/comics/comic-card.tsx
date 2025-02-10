import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const ComicCard = ({ comic }:{ comic: any }) => {
  return (
    <Card>
        <CardHeader>
            <Link href={`/comics/${comic.slug}`}>
               
                <Image
                    src={comic.images[0]}
                    alt={comic.name}
                    width={400}
                    height={600}
                    priority={true}
                />
                
               
            </Link>
        </CardHeader>
        <CardContent className='p-4 grid gap-4'>
          <div className="text-sm">{comic.brand}</div>
          <Link href={`/comics/${comic.slug}`}>
            <h2 className='text-sm font-medium'>{comic.name}</h2>
          </Link>
          <div className="flex-between gap-4">
            <p >{comic.rating} Stars</p> 
            { comic.stock > 0 ? (
              <p className="font-bold">{ comic.price }</p>
            ): (
              <p className="text-red-500">Out of Stock</p>
            )}
          </div>
        </CardContent>
    </Card>
  )
}

export default ComicCard
'use client'
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const ComicImages = ({ images }: { images: string[]; }) => {

  const [current, setCurrent] = useState(0)
  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="current comic image"
        width={300}
        height={300}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((img, i) => (
          <div key={img} className={cn("border mr-2 cursor-pointer hover:border-orange-600", current === i && "border-orange-600")}>
            <Image
              src={img}
              alt="comic image"
              width={500}
              height={500}
              onClick={() => setCurrent(i)}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComicImages
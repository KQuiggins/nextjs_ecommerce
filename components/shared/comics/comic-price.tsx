import { cn } from "@/lib/utils";


const ComicPrice = ({ value, className }: { value: number; className?: string }) => {
  const comicValue = value.toFixed(2)

  const [dollars, cents] = comicValue.split('.')

  return (
    <p className={cn('text-2xl font-bold', className)}>
      <span className="text-xs align-super">$</span>
      {dollars}
      <span className="text-xs align-super">.{cents}</span>
    </p>
  )
}

export default ComicPrice
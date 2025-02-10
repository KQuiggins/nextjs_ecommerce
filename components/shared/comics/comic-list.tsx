import ComicCard from './comic-card'

const ComicList = ({ data, title, limit }: { data: any; title?: string; limit?: number }) => {
  const dataLimit = limit ? data.slice(0, limit): data
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      { data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {dataLimit.map((comic: any) => (
            <ComicCard key={comic.slug} comic={comic} />
          ))}
        </div>
      ) : (
        <p>No comics found</p>
      )}
    </div>
  )
}

export default ComicList
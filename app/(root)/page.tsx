// import sampleData from "@/db/sample-data"
import ComicList  from "@/components/shared/comics/comic-list"
import { getLatestComics } from "@/lib/actions/comic.actions"

const HomePage = async () => {
  const latestComics = await getLatestComics()

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Home Page</h1>
        <ComicList
          data={latestComics}
          title="Featured Comics"
          limit={4}
          />
      </div>
    </>
  )
}

export default HomePage
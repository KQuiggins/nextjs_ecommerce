import sampleData from "@/db/sample-data"
import ComicList  from "@/components/shared/comics/comic-list"

const HomePage = async () => {


  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Home Page</h1>
        <ComicList
          data={sampleData.comics}
          title="Featured Comics"
          limit={4}
          />
      </div>
    </>
  )
}

export default HomePage
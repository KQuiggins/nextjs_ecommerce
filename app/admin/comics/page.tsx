import Link from "next/link";
import { getAllComics } from "@/lib/actions/comic.actions";
import { formatCurrency, shortenUUID } from "@/lib/utils";

const AdminComicsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>
}) => {

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  const comics = await getAllComics({
    query: searchText,
    page,
    category,
  })

  console.log("Comics Data:", comics);


  return (
    <div>AdminComicsPage</div>
  )
}

export default AdminComicsPage
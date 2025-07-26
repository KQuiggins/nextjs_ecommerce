import Link from "next/link";
import { getAllComics, deleteComic } from "@/lib/actions/comic.actions";
import { formatCurrency, shortenUUID } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Pagination from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";

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
    <div className="space-y-2">
      <div className="flex-between">
        <h1 className="h2-bold">Comics</h1>
        <Button asChild variant='default' >
          <Link href={`/admin/comics/create`}>
            Create Comic
          </Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className="w-[100px]">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comics.data.map((comic) => (
            <TableRow key={comic.id}>
              <TableCell>{shortenUUID(comic.id)}</TableCell>
              <TableCell>{comic.name}</TableCell>
              <TableCell className="text-right">{formatCurrency(comic.price)}</TableCell>
              <TableCell>{comic.category}</TableCell>
              <TableCell>{comic.stock}</TableCell>
              <TableCell>{comic.rating}</TableCell>
              <TableCell>
                <Button asChild variant='ghost' size='icon'>
                  <Link href={`/admin/comics/${comic.id}`}>Edit</Link>
                </Button>
                <DeleteDialog
                  id={comic.id}
                  action={deleteComic}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {comics?.totalPages && comics.totalPages > 1 && (
        <Pagination page={page} totalPages={comics.totalPages}  />
      )}
    </div>
  )
}

export default AdminComicsPage
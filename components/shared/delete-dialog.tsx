'use client'

function DeleteDialog({ id, action}: {
    id: string;
    action: (id:string) => Promise<{ success: boolean; message: string; }>;
}) {
  return (
    <div>DeleteDialog</div>
  )
}

export default DeleteDialog
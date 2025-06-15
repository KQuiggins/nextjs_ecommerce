'use client'
import { useState, useTransition } from 'react';
import { toast } from 'sonner'
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';


function DeleteDialog({ id, action}: {
    id: string;
    action: (id:string) => Promise<{ success: boolean; message: string; }>;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    startTransition(async () => {
      const result = await action(id);
      if (!result.success) {
        toast.error(result.message);
      } else {
        setIsOpen(false);
        toast.success(result.message);
      }
    });
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="mt-2 ml-2"
          onClick={() => setIsOpen(true)}
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isPending}

          >
            {isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "business-management-app";

export function DeleteConfirmation() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete invoice</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete invoice #1042?</DialogTitle>
          <DialogDescription>
            This action can&apos;t be undone. The invoice and its line items
            will be permanently removed from Northgate Supply&apos;s account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete invoice</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditClient() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Edit client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit client</DialogTitle>
          <DialogDescription>
            Update billing details for this client.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-client-name">Client name</Label>
            <Input id="dialog-client-name" defaultValue="Acme Co." />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dialog-client-email">Billing email</Label>
            <Input
              id="dialog-client-email"
              type="email"
              defaultValue="billing@acme.co"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ExportComplete() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Export report</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Export complete</DialogTitle>
          <DialogDescription>
            Your Q2 revenue report was exported as revenue-q2.csv and saved
            to your downloads.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { FC, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserType {
  name: string;
  surname: string;
  photo?: { url: string };
}

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserType;
  onSave: (data: { name: string; surname: string }) => void;
}

const ProfileDialog: FC<ProfileDialogProps> = ({ open, onOpenChange, user, onSave }) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, surname });
    onOpenChange(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>View and edit your profile information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.photo?.url}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl uppercase">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid w-full gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="surname">Surname</Label>
                <Input
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;

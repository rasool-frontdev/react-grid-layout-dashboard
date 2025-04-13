import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth.store";

import LogoutDialog from "./dialog/logoutDialog";
import ProfileDialog from "./dialog/profileDialog";
import { ModeToggle } from "./mode-toggle";

const UserBox = () => {
  const { user, logout, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState<"profile" | "settings" | "logout" | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileSave = (data: { name: string; surname: string; photo?: { url: string; id: string } }) => {
    updateProfile({
      name: data.name,
      surname: data.surname,
      ...(data.photo && { photo: data.photo }),
    });
  };

  return (
    <div className="flex items-center gap-1">
      <ModeToggle />|
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage
                src={user?.photo?.url}
                alt={user?.name}
              />
              <AvatarFallback className="uppercase bg-transparent">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56"
        >
          <DropdownMenuLabel>
            {user?.name} {user?.surname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDialog("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenDialog("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => setOpenDialog("logout")}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {user && (
        <>
          <ProfileDialog
            open={openDialog === "profile"}
            onOpenChange={(open) => setOpenDialog(open ? "profile" : null)}
            user={user}
            onSave={handleProfileSave}
          />
          <LogoutDialog
            open={openDialog === "logout"}
            onOpenChange={(open) => setOpenDialog(open ? "logout" : null)}
            onLogout={handleLogout}
          />
        </>
      )}
    </div>
  );
};

export default UserBox;

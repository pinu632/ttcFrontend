"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { logout } from "@/store/Slices/authSlice";
import { Redirect } from "@/Utils/RedirectionFunc";

import {
    User,
    Settings,
    LayoutDashboard,
    HelpCircle,
    LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserProfileMenu() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    const handleLogOut = () =>{

        dispatch(logout())
        Redirect('/')
    }

    const user = useAppSelector(s => s.auth.user)
    const initials = (name: string):string[] => name.split(" ").map(char => char[0])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profilePic} />
                        <AvatarFallback>{initials(user?.name || "").join("")}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-medium">My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={()=>{
                    navigate('/profile')
                }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                onClick={handleLogOut}
                 className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

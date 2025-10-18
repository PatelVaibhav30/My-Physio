"use client";
import Link from "next/link";
import { LayoutDashboard, PersonStanding, Stethoscope } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"

const sidebarItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient', label: 'Patient list', icon: PersonStanding },
    { href: '/visit', label: 'Visit', icon: Stethoscope },
]

interface SidebarProps {
    open: boolean
}

export default function AppSidebar({ open }: SidebarProps) {
    const pathname = usePathname();

    const session = useSession();

    const logout = async () => {
        localStorage.clear();
        await signOut({ callbackUrl: '/' });
    };

    return (
        <Sidebar variant="floating">
            <SidebarContent>
                <SidebarGroup className="mt-4">
                    {sidebarItems.map((item) => (
                        <Link href={item.href} key={item.href} passHref>
                            <Button
                                variant={pathname === item.href ? 'secondary' : 'ghost'}
                                className={`w-full justify-start py-3 ${pathname === item.href ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                <span className="text-base">{item.label}</span>
                            </Button>
                        </Link>
                    ))}
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <div className='flex flex-col items-start'>
                    <span className='font-semibold'>Welcome!</span>
                    <span className='text-gray-600'>{session && session.data?.user?.name}</span>
                </div>
                <Button
                    onClick={logout}
                    className='text-white text-sm md:text-base'>
                    Logout
                </Button>
            </SidebarFooter>
        </Sidebar>
    )
}
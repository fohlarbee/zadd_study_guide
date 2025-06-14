"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useStudyMaterials from "@/hooks/useStudyMaterials";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  LibraryBigIcon,
  PlusSquareIcon,
  ShieldIcon,
  UserIcon
  
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: UserIcon,
  },
  {
    title: "Upgrade",
    url: "/upgrade",
    icon: ShieldIcon,
  },
 
];

export function AppSideBar({isOpen, setIsOpen, shouldShowCard, setShouldShowCard}: {isOpen:boolean, setIsOpen:(open: boolean) => void, shouldShowCard: boolean, setShouldShowCard: (show: boolean) => void}) {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { totalSTM } = useStudyMaterials();


  React.useEffect(() => {

      if (open) {
        const timer = setTimeout(() => {
          setShouldShowCard(true);
        }, 3000); // show after 3 seconds
  
        return () => clearTimeout(timer);
      } else {
        setShouldShowCard(false); // reset on close
      }
    }, [open]);
  


  return (

    <>

     
      <Sidebar
      className={cn(
        "lg:static lg:translate-x-0",
        "fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
      
       
      
      collapsible="icon" variant="floating" >
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <LibraryBigIcon size={30}/>
            {/* <Image src="/images/up-left.png" alt="logo" width={40} height={50} /> */}
            {open && (
              <h1 className="text-xl font-bold text-primary/80">Zadd SG</h1>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent className="flex flex-col h-full">
      
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant='outline'>
                  {!open ? 
                  (
                    <PlusSquareIcon/>
                  )
                  :
                  (
                    <>
                     <Link href="/create" className="flex items-center gap-2">
                      <PlusSquareIcon size={24} />
                          Create New
                      </Link>
                    </>
                  )
                
                }
                 
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem key={index} className="mt-2">
                    <SidebarMenuButton asChild>
                      <Link
                        className={cn([
                          pathname === item.url ? "bg-primary text-[#fff]" : "",
                          "list-none",
                        ])}
                        href={item.url}
                      >
                        <item.icon size={24} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

         <div className="mt-auto flex justify-center pb-4">
            <div
              className={cn(
                "transition-all duration-700 ease-out transform",
                "w-[90%] max-w-[280px] bg-white border border-sidebar-border rounded-sm p-4 shadow-xl",
                shouldShowCard
                  ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                  : "opacity-0 translate-y-4 scale-95 pointer-events-none"
              )}
            >
              <h2 className="text-md mb-2 font-semibold">Available Credits: {5 - totalSTM}</h2>
              <Progress value={(totalSTM / 5) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">{totalSTM} out of 5 credits used</p>
              <Link className="text-xs text-primary" href="/upgrade">
                Upgrade to create more
              </Link>
            </div>
          </div>

        </SidebarContent>
      </Sidebar>

       


    </>
   
  );
}


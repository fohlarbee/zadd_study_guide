"use client";
import { SidebarProvider } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import React from 'react'
import { AppSideBar, items } from './app-sidebar';
import { LibraryBigIcon, MenuIcon, PlusSquareIcon,  } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type Props = {
    children: React.ReactNode;
}
const SidebarLayout = ({children}: Props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [layerOpen, setIsLayerOpen] = React.useState(false);
    const pathname = usePathname();

    const [shouldShowCard, setShouldShowCard] = React.useState(false);
    
     
    



  return (
   <SidebarProvider>
       {/* AppSidebar */}
       <AppSideBar isOpen={isOpen} setIsOpen={setIsOpen}  setShouldShowCard={setShouldShowCard} shouldShowCard={shouldShowCard}
       />
        <main className="m-2 w-full">
            <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar p-2 px-4 shadow-lg">
                {/* SearchBar */}
                   <Sheet>

                        <SheetTrigger>
                        <Button className="justify-start md:hidden" size='sm' variant={'ghost'} onClick={() => setIsLayerOpen(true)}>
                            <MenuIcon/>
                        </Button>
                        </SheetTrigger>
                        {
                        layerOpen && (
                            <SheetContent className="sm:max-w-[80vw] px-3 py-1">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <div className="flex items-center gap-2">
                                                <LibraryBigIcon size={30}/>
                                                <h1 className="text-xl font-bold text-primary/80">Zadd SG</h1>
                                            </div>
                                        </SheetTitle>
                                        
                                        {/* <Separator/>  */}
                                        <>
                                        <Button variant="outline" className="w-full mt-2 flex" onClick={() => setIsLayerOpen(false)}>
                                            <Link href="/create" className="flex items-center gap-2 w-full justify-center">
                                                <PlusSquareIcon size={24} />
                                                    Create New
                                            </Link>
                                        </Button>
                                            
                                        </>
                                    </SheetHeader>
                                    {/* <div className="h-4"></div> */}
                                        <h2 className="text-xs text-left text-black/50 leading-4 ">Application</h2>
                                        {/* <div className="h-4"></div> */}
                                        <div className="flex flex-col justify-start gap-2 text-left items-start">

                                        {items.map((item, index) => (
                                            <Button key={index} 
                                            className={cn('w-full justify-start', {
                                                'bg-primary text-[#fff]': pathname === item.url
                                            })}
                                                variant="ghost" onClick={() => setIsLayerOpen(false)}>
                                                <Link 
                                                className="list-none flex items-center gap-2"
                                                href={item.url}
                                                >
                                                    <item.icon size={24} />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>               
                                        <div className="h-4 "></div>
                                        <Separator/>                 
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
                                                <h2 className="text-md mb-2 font-semibold">Available Credits: 5</h2>
                                                <Progress value={30} className="mb-2 text-primary" />
                                                <p className="text-sm text-muted-foreground">You have 5 credits remaining</p>
                                                <Link className="text-xs text-primary" href="/upgrade">
                                                    Upgrade to create more
                                                </Link>
                                                </div>
                                            </div>  
                                           
                                            
                            </SheetContent>
                        )
                        }
                    </Sheet>
          

                <div className="ml-auto">
                    <UserButton/>
                </div>
            </div>
            <div className="h-4"></div>
            {/* Main content*/}
            <div className="h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border border-sidebar-border bg-sidebar p-4 shadow-lg">
                {children}
            </div>
    </main>
   </SidebarProvider>
  )
}

export default SidebarLayout;
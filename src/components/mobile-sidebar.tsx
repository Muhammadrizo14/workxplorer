import {Menu, BadgeCheck, Bell, ChevronsUpDown, Home, Sparkles, User2, Telescope, LogOut} from "lucide-react";
import {Button} from "@/src/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/src/components/ui/sheet";
import {UserType} from "@/src/types/user.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/src/components/ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import LanguageSwitcher from "@/src/components/lang-switcher";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { getTranslations } from "next-intl/server";
import { logoutAction } from "@/src/_lib/actions/auth";

interface IProps {
  user: UserType
}

export async function MobileSidebar({user}: IProps) {
  const t = await getTranslations("sidebar");

  const items = [
    { title: t("home"), url: "/", icon: Home },
    { title: t("profile"), url: "/profile", icon: User2 },
    { title: t("explore"), url: "/explore", icon: Telescope },
  ];

  return (
    <div className="md:hidden absolute top-0 left-0">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6"/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64 flex flex-col bg-sidebar text-sidebar-foreground">
          {/* Mobile Sidebar Content */}
          <div className="flex h-full w-full flex-col">
            {/* Sidebar Content */}
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
              <div className="relative flex w-full min-w-0 flex-col p-2">
                <div className="flex items-center gap-5 py-5 w-full">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <div className="flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70">
                  {t("application")}
                </div>
                <div className="w-full text-sm">
                  <ul className="flex w-full min-w-0 flex-col gap-1">
                    {items.map((item) => (
                      <li key={item.title} className="group/menu-item relative">
                        <Link 
                          href={item.url}
                          className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground"
                        >
                          <item.icon className="size-4 shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="flex flex-col gap-2 p-2">
              <ul className="flex w-full min-w-0 flex-col gap-1">
                <li className="group/menu-item relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={user.avatar} alt={user.first_name} />
                          <AvatarFallback className="rounded-lg">
                            {user.first_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-medium">{user.first_name}</span>
                          <span className="truncate text-xs">{user.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      className="w-56 min-w-56 rounded-lg"
                      align="end"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.first_name} />
                            <AvatarFallback className="rounded-lg">
                              {user.first_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user.first_name}</span>
                            <span className="truncate text-xs">{user.email}</span>
                          </div>
                        </div>
                      </DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Sparkles />
                          {t("upgrade")}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href={"/profile"}>
                            <BadgeCheck />
                            {t("account")}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell />
                          {t("notifications")}
                        </DropdownMenuItem>
                        <form action={logoutAction}>
                          <DropdownMenuItem asChild variant={'destructive'}>
                            <button type="submit" className="w-full flex items-center gap-2">
                              <LogOut />
                              {t('logout')}
                            </button>
                          </DropdownMenuItem>
                        </form>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

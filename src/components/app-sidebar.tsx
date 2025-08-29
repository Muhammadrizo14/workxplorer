 import {
  BadgeCheck, Bell,
  ChevronsUpDown,
  Home,
  Sparkles,
  User2,
  Telescope, LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar"
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
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar";
import LanguageSwitcher from "@/src/components/lang-switcher";
import {ThemeToggle} from "@/src/components/theme-toggle";
import {UserType} from "@/src/types/user.types";
import { getTranslations } from "next-intl/server";
import { logoutAction } from "@/src/actions/auth";

interface IProps {
  user: UserType
}

export async function AppSidebar({user}: IProps) {
  const t = await getTranslations("sidebar");

  const items = [
    {title: t("home"), url: "/", icon: Home},
    {title: t("profile"), url: "/profile", icon: User2},
    {title: t("explore"), url: "/explore", icon: Telescope},
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center gap-5 py-5 w-full">
            <LanguageSwitcher/>
            <ThemeToggle/>
          </div>
          <SidebarGroupLabel>{t("application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.first_name}/>
                    <AvatarFallback className="rounded-lg">
                      {user.first_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.first_name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.first_name}/>
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

                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Sparkles/>
                    {t("upgrade")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={"/profile"}>
                      <BadgeCheck/>
                      {t("account")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell/>
                    {t("notifications")}
                  </DropdownMenuItem>
                  <form action={logoutAction}>
                    <DropdownMenuItem asChild variant={'destructive'}>
                      <button type="submit" className="w-full flex items-center gap-2">
                        <LogOut/>
                        {t('logout')}
                      </button>
                    </DropdownMenuItem>
                  </form>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
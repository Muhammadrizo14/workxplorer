import {SidebarProvider} from "@/src/components/ui/sidebar"
import {AppSidebar} from "@/src/components/app-sidebar"
import {getUser} from "@/src/auth";
import {UserProvider} from "@/src/components/user-context";
import {MobileSidebar} from "@/src/components/mobile-sidebar";

export default async function AppLayout({
                                          children,
                                        }: {
  children: React.ReactNode;
}) {
  const data = await getUser()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {data && <AppSidebar user={data}/>}

        <div className="flex-1 flex flex-col">
          {data && (
            <div className="md:hidden">
              <MobileSidebar user={data}/>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-4">
            <UserProvider user={data}>
              {children}
            </UserProvider>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
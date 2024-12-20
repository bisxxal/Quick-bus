import ReactQueryProvider from "@/quary/QuaryClient";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next"; 
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ADMIN | Qucick-BUS",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user =await currentUser();
  if (user?.publicMetadata?.role !== 'admin') {
    return  redirect('/');
  } 
  return (
   <div>
    <ReactQueryProvider>
     {children}
    </ReactQueryProvider>
   </div>
  );
}

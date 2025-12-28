
import { getCurrentUserSSR } from "@/lib/services/auth/auth.server";
import { redirect } from "next/navigation";


export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const user = await getCurrentUserSSR();
    console.log("EditorLayout user:", user);

    if (!user) {
        redirect('/login')       
    }
    
    if(user.role !== 'ADMIN'){
        redirect('/')       
    }

    return(<>
        {children}
    </>)
}
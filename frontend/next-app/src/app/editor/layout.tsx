import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const session = await auth();
    const user = session?.user

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
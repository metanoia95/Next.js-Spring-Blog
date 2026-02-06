
//import UserAvatar from "../common/UserAvatar";
import { auth } from "@/auth";
import AuthMenu from "./AuthMenu";
import NavLinks from "./NavLink";


export default async function Header() {

    const session = await auth()

    return (
        <header
            className="
        sticky top-0 z-50 w-full
        border-b border-gray-200
        bg-white/80 backdrop-blur
      "
        >
            <div className="relative w-full max-w-screen-xl mx-auto px-6 flex flex-row justify-between items-center">
                <NavLinks />
                <div>
                    <AuthMenu session = {session}/>
                    {/* <UserAvatar /> */}
                </div>
            </div>

        </header >
    );
}
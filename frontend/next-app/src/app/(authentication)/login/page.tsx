import GoogleSignIn from "@/components/common/GoogleSignIn";

export default async function LoginLayout({
    //children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full md:w-1/2 max-w-md p-10 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-8">
                    로그인
                </h1>
                {/* {children} */}
                <div className="flex justify-center">
                    <GoogleSignIn />
                </div>
            </div>
        </div>
    );
}

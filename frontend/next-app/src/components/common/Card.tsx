import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};


export default function Card ({children, className} :CardProps){

    return(
        <div className={`flex flex-col h-[180px] items-center justify-center gap-4 rounded-lg shadow-md p-4 bg-gray-50 ${className}`}>
            {children}
        </div>

    )

}
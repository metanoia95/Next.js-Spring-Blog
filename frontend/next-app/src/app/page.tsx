import Card from "@/components/common/Card";
import Image from "next/image";



export default function IndexPage() {
  
  return(
  <div className="min-h-screen p-2">
    <div className="flex flex-col mt-4 pb-3 justify-center gap-5 border-b-1 border-gray-400" >
      <h1 className="text-4xl text-bold">Next.js & Spring Boot</h1>
      <span>Next.js와 Spring Boot 기반의 블로그입니다.</span>
    </div>
    
    <div className="mt-5">
      <h1 className="text-3xl text-bold"> 주요기술 스택</h1>
      <div className="grid grid-cols-3 gap-4 pt-5">
        <Card>   
          <Image src="/images/lexical.png" alt="" width={0} height={0} sizes="100vw" className="w-full h-auto" />
          {/* <span>블로그 편집기용 위지윅 에디터</span> */}
        </Card>
        <Card>   
          <Image src="/images/NextJs.png" alt="" width={0} height={0} sizes="100vw" className="w-full h-auto" />
          {/* <span>프론트엔드 프레임워크</span> */}
        </Card>
        <Card>   
          <Image src="/images/spring.png" alt="" width={0} height={0} sizes="100vw" className="w-full h-auto" />
          {/* <span>백엔드 프레임워크</span> */}
        </Card>
        <Card>   
          <Image src="/images/Postgre.png" alt="" width={0} height={0} sizes="100vw" className="w-full h-auto" />
          {/* <span>데이터베이스</span> */}
        </Card>

      </div>
    </div>
  
  </div>)
}

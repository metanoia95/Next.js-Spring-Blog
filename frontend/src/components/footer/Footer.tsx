import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

export default function Footer() {


    return (
        <footer className="flex flex-col text-center text-sm text-gray-500 justify-center">
            <div className="flex flex-row justify-center gap-2.5">
                <a
                    href="https://github.com/metanoia95/Next.js-Spring-Blog"
                    target="_blank" //링크를 새 탭에서 열게하기
                    rel="noopener noreferrer" // 보안처리
                    className="flex items-center justify-center text-gray-400 hover:underline mb-4"
                >
                    <FaGithub size={32} strokeWidth={1} />
                </a>
                <a href="mailto:longje@naver.com">
                    <IoMdMail size={32} strokeWidth={1} />
                </a>
            </div>

            <span>© 2025 Metanoia95. All rights reserved.</span>
        </footer>





    )

}
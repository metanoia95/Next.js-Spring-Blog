import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


{/* 사용 템플릿 

  <InputField
id="email"
label="이메일"
type="email"
value={email}
placeholder="이메일을 입력하세요"
onChange={(e) => setEmail(e.target.value)}
required
/> 

*/}



interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  // onChange 함수의 자료형 선언
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean; // input이 비어있으면 폼 제출을 막는 속성.
  toggleVisibility?: boolean; // 비밀번호 토글 기능(클릭 시 ***에서 text로 전환)
}

export default function InputField({
  id,
  label,
  type ,
  value,
  placeholder,
  onChange,
  required = false, 
}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType = isPasswordField
        ? (showPassword ? "text" : "password")
        : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="peer input-floating" // 커스텀 클래스. global.css 참조
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className="label-floating" // 커스텀 클래스. global.css 참조
      >
        {label}
      </label>
      {isPasswordField && (
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-4 text-gray-500"
      >
        {showPassword ? <EyeOff size={25} /> : <Eye size={25} />}
      </button>
      )}
    </div>
  );
}

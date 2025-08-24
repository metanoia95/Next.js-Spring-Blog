import { EditorThemeClasses } from "lexical";

export const theme: EditorThemeClasses = {
  // 헤딩 스타일
  heading: {
    h1: "text-4xl font-bold mb-6",
    h2: "text-3xl font-semibold mb-5",
    h3: "text-2xl font-medium mb-4",
    h4: "text-xl mb-3",
    h5: "text-lg mb-2",
    h6: "text-base mb-1",
  },
  quote: "quote",

  list: {
    ul: "ul list-disc pl-5",
    ol: "ol list-decimal pl-5",
    listitem: "listitem ml-2",
    nested: {
      listitem: "nestedListItem",
    },
    listitemChecked: "listitemChecked",
    listitemUnchecked: "listitemUnchecked",
  },
  // 코드 블록 기본 스타일
  code: "code",

  // 토큰별 문법 강조 스타일
  codeHighlight: {
    atrule: "text-purple-600",
    attr: "text-purple-600",
    boolean: "text-indigo-600",
    builtin: "text-red-600",
    cdata: "italic text-gray-500",
    char: "text-green-600",
    class: "font-semibold text-yellow-600",
    "class-name": "font-semibold text-yellow-600",
    comment: "italic text-gray-500",
    constant: "text-indigo-600",
    deleted: "bg-red-100 line-through",
    doctype: "italic text-gray-500",
    entity: "text-orange-600",
    function: "text-teal-600",
    important: "font-bold text-red-600",
    inserted: "bg-green-100",
    keyword: "font-semibold text-blue-600",
    namespace: "text-gray-800",
    number: "text-indigo-600",
    operator: "text-gray-700",
    prolog: "italic text-gray-500",
    property: "text-blue-600",
    punctuation: "text-gray-700",
    regex: "text-red-600",
    selector: "text-indigo-600",
    string: "text-green-600",
    symbol: "text-blue-600",
    tag: "text-indigo-600",
    url: "underline decoration-blue-600",
    variable: "text-red-600",
  },
  text: {
    bold: "textBold",
    code: "textCode",
    italic: "textItalic",
    strikethrough: "textStrikethrough",
    subscript: "textSubscript",
    superscript: "textSuperscript",
    underline: "textUnderline",
    underlineStrikethrough: "textUnderlineStrikethrough",
  },
};
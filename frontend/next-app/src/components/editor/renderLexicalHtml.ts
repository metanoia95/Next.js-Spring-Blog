import { theme } from "./editorconfig/theme";

type LexicalNode = {
  type: string;
  tag?: string;
  format?: number;
  text?: string;
  children?: LexicalNode[];
  listType?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LexicalFlatMapNode = { key: string; value: any };

const FORMAT_TAGS: Record<number, string> = {
  1: "strong",
  2: "em",
  4: "s",
  8: "u",
  16: "code",
  32: "sub",
  64: "sup",
};

const getClassForNode = (type: string, tag?: string): string => {
  if (type === "heading" && tag) return theme.heading?.[tag as keyof typeof theme.heading] || "";
  if (type === "quote") return theme.quote || "";
  if (type === "list") {
    if (tag === "ul") return theme.list?.ul || "";
    if (tag === "ol") return theme.list?.ol || "";
  }
  if (type === "listitem") return theme.list?.listitem || "";
  if (type === "code") return theme.code || "";
  return "";
};

const applyFormat = (text: string, format?: number): string => {
  if (!format) return text;
  return Object.entries(FORMAT_TAGS).reduce((acc, [bit, tag]) => {
    return (format & Number(bit)) ? `<${tag}>${acc}</${tag}>` : acc;
  }, text);
};

export const renderLexicalJsonToHtml = (node: LexicalNode): string => {
  const { type, children = [], text, format, tag, listType } = node;

  // ✅ 텍스트 처리 (text + code-highlight 포함)
  if ((type === "text" || type === "code-highlight") && typeof text === "string") {
    return applyFormat(text, format);
  }

  // ✅ 재귀 렌더링
  const innerHTML = children.map(renderLexicalJsonToHtml).join("");

  if (type === "linebreak") {
  return "\n"; // ✅ pre/code 안이므로 <br> 대신 \n!
}

  if (type === "heading" && tag) {
    return `<${tag} class="${getClassForNode(type, tag)}">${innerHTML}</${tag}>`;
  }

  if (type === "paragraph") {
    return `<p class="mb-4">${innerHTML}</p>`;
  }

  if (type === "quote") {
    return `<blockquote class="${getClassForNode(type)}">${innerHTML}</blockquote>`;
  }

  if (type === "list") {
    const tagName = listType === "number" ? "ol" : "ul";
    return `<${tagName} class="${getClassForNode(type, tagName)}">${innerHTML}</${tagName}>`;
  }

  if (type === "listitem") {
    return `<li class="${getClassForNode(type)}">${innerHTML}</li>`;
  }

  

  if (type === "code-highlight") {
  const innerHTML = children.map(renderLexicalJsonToHtml).join("");
  return `${innerHTML}\n`; // 줄바꿈!
}

  if (type === "code") {
  const renderedLines = children.map(renderLexicalJsonToHtml).join("");

  // 🔍 split 후 마지막 줄이 빈 줄이면 제거
  const lines = renderedLines.split("\n");
  if (lines[lines.length - 1].trim() === "") {
    lines.pop();
  }

  const lineCount = lines.length;
  const gutter = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");

  return `<pre class="${getClassForNode(type)}" data-gutter="${gutter}"><code>${lines.join("\n")}</code></pre>`;
}

  return innerHTML;
};


// ✅ map 구조인지 확인하고 트리 구조로 변환
const normalizeLexicalInput = (
  input: LexicalNode[] | LexicalFlatMapNode[]
): LexicalNode[] => {
  if (Array.isArray(input) && input.length > 0 && "type" in input[0]) {
    return input as LexicalNode[];
  }

  const mapArray = input as LexicalFlatMapNode[];
  const nodeMap = Object.fromEntries(mapArray.map(({ key, value }) => [key, value]));

  const buildNode = (key: string): LexicalNode | null => {
    const raw = nodeMap[key];
    if (!raw) return null;

    const children: LexicalNode[] = [];
    let childKey = raw.__first;
    while (childKey) {
      const child = buildNode(childKey);
      if (child) children.push(child);
      childKey = nodeMap[childKey]?.__next || null;
    }

    const node: LexicalNode = {
      type: raw.__type,
      text: raw.__text,
      format: raw.__format,
      tag: raw.__tag,
      listType: raw.__listType,
    };

    if (children.length > 0) {
      node.children = children;
    }

    return node;
  };

  const root = buildNode("root");
  return root?.children || [];
};

// ✅ 모든 구조를 자동으로 렌더링
export const renderFullLexicalJson = (
  input: LexicalNode[] | LexicalFlatMapNode[]
): string => {
  const normalizedNodes = normalizeLexicalInput(input);
  return normalizedNodes.map(renderLexicalJsonToHtml).join("");
};

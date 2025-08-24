import { FC, useCallback, useEffect, useState } from "react";
import {
    Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListChecks,
  ListOrdered,
  //ListOrderedIcon,
  Quote,
} from "lucide-react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import {
  HeadingTagType,
  $createHeadingNode,
  $isHeadingNode,
  $createQuoteNode,
  //$isQuoteNode,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
  $isListNode,
  ListNode,
  //$isListItemNode, 
} from "@lexical/list";
import { $getNearestNodeOfType } from "@lexical/utils";
import { $createCodeNode,
    // CODE_LANGUAGE_FRIENDLY_NAME_MAP
     } from "@lexical/code";


const SupportedBlockType = {
  paragraph: "paragraph", // <p> 요소에 대응. 즉 순수 텍스트
  h1: "Heading 1", // <h1>
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  quote: "Quote",
  number: "Numbered List",
  bullet: "Bulleted List",
  check: "Check List",
  code : "Code Block",

} as const;
// as const : 키 값(프로퍼티, h1, h2 등을 의미)
// 각 값의 타입을 "Heading 1" 같은 문자열 리터럴 타입으로 고정
// -> 즉 자료형이 string이 아니라 정확히 "Heading 1"이라는 문자열로 고정됨.

type BlockType = keyof typeof SupportedBlockType;
//키값만 가져와서 처리. BlockType :  "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"


export const ToolbarPlugin: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>("paragraph");
  const [editor] = useLexicalComposerContext(); // 에디터 인스턴스 가져오기
  //const [codeLanguage, setCodeLanguage] = useState("");



  // 헤딩 적용 함수 설정(최적화를 위해 콜백 사용)
  const formatHeading = useCallback(
    (type: HeadingTagType) => {
      if (blockType !== type) {
        editor.update(() => {
          // 현재 텍스트 영역 가져오기
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          }
        });
        setBlockType(type);
      }
    },
    [blockType, editor] // 의존성 배열 : 이 값들이 바뀔 때만 새 함수 생성
  );

  // Quote 적용 함수
  const formatQuote = useCallback(
    () => {
      if (blockType !== "quote") {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createQuoteNode());
          }
        });
      }
    },
    [blockType, editor] // 의존성 배열 : 이 값들이 바뀔 때만 새 함수 생성
  );

  // 불릿 리스트 적용
  const formatBulletList = useCallback(() => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]); // 의존성 배열 : 이 값들이 바뀔 때만 새 함수 생성)

  // 숫자 리스트
  const formatNumberedList = useCallback(() => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  //체크 리스트
  const formatCheckList = useCallback(() => {

    if (blockType !== "check") {
        //console.log("dispatch check command"); // ← 이것도 찍혀야 함
        editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);


  // 코드블록
  const formatCode = useCallback(() => {
    if (blockType !== "code") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createCodeNode());
        }
      });
    }
  }, [blockType, editor]);

  
// const CodeLanguagesOptions = Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP).map(
//     ([value, label]) => ({ value, label })
//   );
    


  // 현재 선택된 노드의 속성을 보여주는 리스너
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // 리스너함수 : 상태나 이벤트를 감지하고 반응하는 함수
      // 에디터 상태(editorState)가 바뀔 때 마다 호출됨.
      editorState.read(() => {
        // (method) EditorState.read<void>(callbackFn: () => void, options?: EditorStateReadOptions): void
        /*  -- 타입스크립트 문법 해설
                function read<T>(callback: () => T): T
                read 함수는 T를 자료형으로 사용하도록 지정
                리드함수의 콜백함수의 리턴 값은 T 
                리드 함수의 리턴값은 T

            */

        // 현재 텍스트 영역 가져오기
        const selection = $getSelection();
        /*  selection의 타입 종류
                    | 타입               | 설명                          |
                    | ---------------- | --------------------------- |
                    | `RangeSelection` | 일반적인 텍스트 선택 (커서나 드래그 등)     |
                    | `NodeSelection`  | 특정 노드(예: 이미지, 카드 등)를 선택한 경우 |
                    | `GridSelection`  | 표(table)와 관련된 셀 선택 (복잡한 편)  |
                */
        if (!$isRangeSelection(selection)) return; // 셀렉션의 종류가 Range 셀렉션이 아니면 종료

        /* Lexical의 노드 구조
                    Root (key: "root")
                    ├── ParagraphNode  - top-level 블록 요소
                    │   ├── TextNode  - 순수한 텍스트 콘텐츠를 담는 노드
                    │   └── TextNode
                    ├── HeadingNode
                    │   └── TextNode
                */
        /* 톱레벨 노드(루트 바로 밑에 존재하는 노드)
                    의미(시맨틱), 스타일+레이아웃 역할 포함
                    | 노드 클래스                          | 의미 / 대응 HTML 태그           |
                    | ------------------------------- | ------------------------- |
                    | `ParagraphNode`                 | `<p>` 단락                  |
                    | `HeadingNode`                   | `<h1>` \~ `<h6>` 제목       |
                    | `TextNode`                      | 인라인 텍스트 (굵기, 기울임 포함)      |
                    | `ListNode`, `ListItemNode`      | `<ul>`, `<ol>`, `<li>` 목록 |
                    | `QuoteNode`                     | `<blockquote>`            |
                    | `LineBreakNode`                 | `<br>`                    |
                    | `CodeNode`, `CodeHighlightNode` | `<pre><code>`             |
                    | `LinkNode`                      | `<a href="">`             |
                    | `ImageNode`, `TableNode` 등      | 시각/표 구조용 노드 (별도 플러그인 필요)  |

                    Lexical의 주요 톱레벨 노드 클래스 정리
                    * 톱레벨 노드 밑에는 다른 톱레벨 노드가 위치할 순 없다.

                */
        // 앵커노드 가져오기 : selection의 "시작지점(anchor)"에 해당하는 노드 가져오기
        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root" // 선택된 앵커 노드가 루트 노드이면
            ? anchorNode // 루트 노드가 최상위인 관계로 그냥 사용
            : anchorNode.getTopLevelElementOrThrow(); // 해당 노드의 톱레벨 노드 가져옴.

        // 헤딩 노드 여부 확인
        if ($isHeadingNode(targetNode)) {
          // 타겟 노드가 헤딩노드이면
          const tag = targetNode.getTag(); // 노드에서 태그 정보 가져옴 => h1, h2, h3등 정보 가져옴
          setBlockType(tag); // 블록타입(표시)여부를 tag에 해당하는 타입으로 변경경
        }
        // 리스트 처리
        else if($isListNode(targetNode)){
            const parentList = $getNearestNodeOfType(anchorNode, ListNode);
            const listType = parentList
            ? parentList.getListType()
            : targetNode.getListType()

            setBlockType(listType);
        }
        else {
          const nodeType = targetNode.getType();
          if (nodeType in SupportedBlockType) {
            // 노드 타입이 SupportedBlockType의 값에 들어있는 경우우
            setBlockType(nodeType as BlockType); // as : 타입 선언
          } else {
            setBlockType("paragraph"); // 아닌 경우 평문 처리
          }
        }
      });
    });
  }, [editor]); // 에디터 인스턴스가 바뀔 때 실행

  return (
    <div className="flex py-2 px-6">
      <button
        className="
                    inline-flex items-center justify-center
                    w-10 h-10
                    text-2xl
                    rounded
                    text-[#cdcdcd]
                    hover:bg-[#eeeeee]
                    aria-checked:text-[#111111]
                "
        type="button"
        role="checkbox"
        title={SupportedBlockType["h1"]}
        aria-label={SupportedBlockType["h1"]}
        aria-checked={blockType === "h1" ? "true" : "false"}
        onClick={() => formatHeading("h1")}
      >
        <Heading1 />
      </button>
      <button
        className="
                    inline-flex items-center justify-center
                    w-10 h-10
                    text-2xl
                    rounded
                    text-[#cdcdcd]
                    hover:bg-[#eeeeee]
                    aria-checked:text-[#111111]
                "
        type="button"
        role="checkbox"
        title={SupportedBlockType["h2"]}
        aria-label={SupportedBlockType["h2"]}
        aria-checked={blockType === "h2"}
        onClick={() => formatHeading("h2")}
      >
        <Heading2 />
      </button>
      <button
        className="
                 inline-flex items-center justify-center
                 w-10 h-10
                 text-2xl
                 rounded
                 text-[#cdcdcd]
                 hover:bg-[#eeeeee]
                 aria-checked:text-[#111111]
             "
        type="button"
        role="checkbox"
        title={SupportedBlockType["h3"]}
        aria-label={SupportedBlockType["h3"]}
        aria-checked={blockType === "h3"}
        onClick={() => formatHeading("h3")}
      >
        <Heading3 />
      </button>
      <button
        className="
                    inline-flex items-center justify-center
                    w-10 h-10
                    text-2xl
                    rounded
                    text-[#cdcdcd]
                    hover:bg-[#eeeeee]
                    aria-checked:text-[#111111]
                "
        type="button"
        role="checkbox"
        title={SupportedBlockType["quote"]}
        aria-label={SupportedBlockType["quote"]}
        aria-checked={blockType === "quote" ? "true" : "false"}
        onClick={formatQuote}
      >
        <Quote />
      </button>
      <button
        className="
      inline-flex items-center justify-center
      w-10 h-10
      text-2xl
      rounded
      text-[#cdcdcd]
      hover:bg-[#eeeeee]
      aria-checked:text-[#111111]
  "
        type="button"
        role="checkbox"
        title={SupportedBlockType["bullet"]}
        aria-label={SupportedBlockType["bullet"]}
        aria-checked={blockType === "bullet"}
        onClick={formatBulletList}
      >
        <List />
      </button>
      <button
        className="
      inline-flex items-center justify-center
      w-10 h-10
      text-2xl
      rounded
      text-[#cdcdcd]
      hover:bg-[#eeeeee]
      aria-checked:text-[#111111]
  "
        type="button"
        role="checkbox"
        title={SupportedBlockType["number"]}
        aria-label={SupportedBlockType["number"]}
        aria-checked={blockType === "number"}
        onClick={formatNumberedList}
      >
        <ListOrdered />
      </button>
      <button
        className="
      inline-flex items-center justify-center
      w-10 h-10
      text-2xl
      rounded
      text-[#cdcdcd]
      hover:bg-[#eeeeee]
      aria-checked:text-[#111111]
  "
        type="button"
        role="checkbox"
        title={SupportedBlockType["check"]}
        aria-label={SupportedBlockType["check"]}
        aria-checked={blockType === "check"}
        onClick={formatCheckList}
      >
        <ListChecks />
      </button>
      <button
        className="
      inline-flex items-center justify-center
      w-10 h-10
      text-2xl
      rounded
      text-[#cdcdcd]
      hover:bg-[#eeeeee]
      aria-checked:text-[#111111]
  "
        type="button"
        role="checkbox"
        title={SupportedBlockType["code"]}
        aria-label={SupportedBlockType["code"]}
        aria-checked={blockType === "code"}
        onClick={formatCode}
      >
        <Code />
      </button>
    </div>
  );
};

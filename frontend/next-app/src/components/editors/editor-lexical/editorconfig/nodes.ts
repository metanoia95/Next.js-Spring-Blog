import { LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { Klass, LexicalNode } from "lexical";


// lexical의 기본 노드 클래스는 ElementNode, TextNode, DecoratorNode 밖에 없기 때문에
// 노드클래스를 추가해줘야함. TextNode : 순수 글자만(태그x), ElementNode(일반적인 엘리먼트 노드), DecoratorNode(리액트 컴포넌트)
export const nodes: Klass<LexicalNode>[] = [
  HeadingNode, // HeadingNode → <h1>…</h1>~<h6>…</h6> / ParagraphNode → <p>…</p>
  QuoteNode, // <blockquote>…</blockquote>
  ListItemNode, // <li>
  ListNode, // <ul> 또는 <ol>
  CodeNode,
  CodeHighlightNode,
  LinkNode,
];
import { applyRenderingTreeToDom } from "./apply";

export type RenderingTree =
  | {
      tagName: string;
      attributes: Record<string, string>;
      children: RenderingTree[];
    }
  | string;

export let onAction: (action: any) => void = (_action) => {
  throw new Error("onAction is not set yet");
};

export function setUp<TState, TAction>(
  root: HTMLElement,
  state: TState,
  stateToRenderingTree: (state: TState) => RenderingTree,
  updateStateOnAction: (state: TState, action: TAction) => void
) {
  const onStateChanged = () => {
    const renderingTree = stateToRenderingTree(state);
    applyRenderingTreeToDom(root, renderingTree);
  };

  onAction = (action: TAction) => {
    updateStateOnAction(state, action);
    onStateChanged();
  };

  onStateChanged();
}

type DivProps = {
  className?: string;
  use?: () => (() => void) | undefined;
};

export function div(props: DivProps): RenderingTree;
export function div(children: RenderingTree[]): RenderingTree;
export function div(props: DivProps, children: RenderingTree[]): RenderingTree;
export function div(
  first: DivProps | RenderingTree[],
  second?: RenderingTree[]
): RenderingTree {
  const props: DivProps | undefined = Array.isArray(first) ? undefined : first;
  const children: RenderingTree[] = Array.isArray(first) ? first : second || [];

  const attributes: Record<string, string> = {};
  if (props?.className) {
    attributes["class"] = props.className;
  }

  return {
    tagName: "div",
    attributes,
    children,
  };
}

type ImgProps = {
  className?: string;
  src?: string;
};

export function img(props: ImgProps): RenderingTree;
export function img(children: RenderingTree[]): RenderingTree;
export function img(props: ImgProps, children: RenderingTree[]): RenderingTree;
export function img(
  first: ImgProps | RenderingTree[],
  second?: RenderingTree[]
): RenderingTree {
  const props: ImgProps | undefined = Array.isArray(first) ? undefined : first;
  const children: RenderingTree[] = Array.isArray(first) ? first : second || [];

  const attributes: Record<string, string> = {};
  if (props?.className) {
    attributes["class"] = props.className;
  }
  if (props?.src) {
    attributes["src"] = props.src;
  }

  return {
    tagName: "img",
    attributes,
    children,
  };
}

type HeaderProps = {
  className?: string;
};

export function header(props: HeaderProps): RenderingTree;
export function header(children: RenderingTree[]): RenderingTree;
export function header(
  props: HeaderProps,
  children: RenderingTree[]
): RenderingTree;
export function header(
  first: HeaderProps | RenderingTree[],
  second?: RenderingTree[]
): RenderingTree {
  const props: HeaderProps | undefined = Array.isArray(first)
    ? undefined
    : first;
  const children: RenderingTree[] = Array.isArray(first) ? first : second || [];

  const attributes: Record<string, string> = {};
  if (props?.className) {
    attributes["class"] = props.className;
  }

  return {
    tagName: "header",
    attributes,
    children,
  };
}

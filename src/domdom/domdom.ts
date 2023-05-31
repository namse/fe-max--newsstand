import { applyRenderingTreeToDom } from "./apply";

type Dispose = () => void;
type UseFn = () => Dispose | void;

export type ElementRenderingTree = {
  type: "element";
  tagName: string;
  attributes: Record<string, string>;
  children: RenderingTree[];
};

export type UseRenderingTree = {
  type: "use";
  dependencies: any[];
  useFn: UseFn;
  children: RenderingTree[];
  use: (fn: UseFn, dependencies: any[]) => UseRenderingTree;
  dispose?: Dispose;
  render: (
    renderingTree: Exclude<RenderingTree, UseRenderingTree>
  ) => RenderingTree;
};

export type RenderingTree = string | ElementRenderingTree | UseRenderingTree;
export function getTypeOfRenderingTree(
  renderingTree: RenderingTree
): "text" | "element" | "use" {
  return typeof renderingTree === "string"
    ? "text"
    : "type" in renderingTree
    ? renderingTree.type
    : "use";
}

export let onAction: (action: any) => void = (_action) => {
  throw new Error("onAction is not set yet");
};

export function setUp<TState, TAction>(
  root: HTMLElement,
  state: TState,
  stateToRenderingTree: (state: TState) => RenderingTree,
  updateStateOnAction: (state: TState, action: TAction) => void
) {
  let prevRenderingTree: RenderingTree | undefined;
  const onStateChanged = () => {
    const renderingTree = stateToRenderingTree(state);
    applyRenderingTreeToDom(root, renderingTree, prevRenderingTree);
    prevRenderingTree = renderingTree;
  };

  onAction = (action: TAction) => {
    updateStateOnAction(state, action);
    onStateChanged();
  };

  onStateChanged();
}

export function use(fn: UseFn, dependencies: any[]): UseRenderingTree {
  const children: RenderingTree[] = [];

  const self: UseRenderingTree = {
    type: "use",
    dependencies,
    useFn: fn,
    children,
    use,
    render: undefined as any as UseRenderingTree["render"],
  };

  self.render = (renderingTree: RenderingTree) => {
    self.children = [renderingTree];
    return self;
  };

  return self;
}

type DivProps = {
  className?: string;
};

export function div(props: DivProps): ElementRenderingTree;
export function div(children: RenderingTree[]): ElementRenderingTree;
export function div(
  props: DivProps,
  children: RenderingTree[]
): ElementRenderingTree;
export function div(
  first: DivProps | RenderingTree[],
  second?: RenderingTree[]
): ElementRenderingTree {
  const props: DivProps | undefined = Array.isArray(first) ? undefined : first;
  const children: RenderingTree[] = Array.isArray(first) ? first : second || [];

  const attributes: Record<string, string> = {};
  if (props?.className) {
    attributes["class"] = props.className;
  }

  return {
    type: "element",
    tagName: "DIV",
    attributes,
    children,
  };
}

type ImgProps = {
  className?: string;
  src?: string;
};

export function img(props: ImgProps): ElementRenderingTree;
export function img(children: RenderingTree[]): ElementRenderingTree;
export function img(
  props: ImgProps,
  children: RenderingTree[]
): ElementRenderingTree;
export function img(
  first: ImgProps | RenderingTree[],
  second?: RenderingTree[]
): ElementRenderingTree {
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
    type: "element",
    tagName: "IMG",
    attributes,
    children,
  };
}

type HeaderProps = {
  className?: string;
};

export function header(props: HeaderProps): ElementRenderingTree;
export function header(children: RenderingTree[]): ElementRenderingTree;
export function header(
  props: HeaderProps,
  children: RenderingTree[]
): ElementRenderingTree;
export function header(
  first: HeaderProps | RenderingTree[],
  second?: RenderingTree[]
): ElementRenderingTree {
  const props: HeaderProps | undefined = Array.isArray(first)
    ? undefined
    : first;
  const children: RenderingTree[] = Array.isArray(first) ? first : second || [];

  const attributes: Record<string, string> = {};
  if (props?.className) {
    attributes["class"] = props.className;
  }

  return {
    type: "element",
    tagName: "HEADER",
    attributes,
    children,
  };
}

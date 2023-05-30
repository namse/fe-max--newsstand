import { RenderingTree } from "./domdom";

export function applyRenderingTreeToDom(
  root: HTMLElement,
  renderingTree: RenderingTree
) {
  sync({
    target: root.firstChild,
    replace: (newNode) => {
      root.replaceChildren(newNode);
    },
    renderingTree,
  });
}

function sync({
  target,
  replace,
  renderingTree,
}: {
  target: Node | null;
  replace: (newNode: Node) => void;
  renderingTree: RenderingTree;
}) {
  if (!target) {
    return replace(getNewNode(renderingTree));
  }

  if (typeof renderingTree === "string") {
    if (target.nodeType === Node.TEXT_NODE) {
      if (target.textContent !== renderingTree) {
        target.textContent = renderingTree;
      }
      return;
    } else {
      return replace(getNewNode(renderingTree));
    }
  } else {
    if (target instanceof HTMLElement) {
      if (target.tagName !== renderingTree.tagName) {
        return replace(getNewNode(renderingTree));
      }
      syncAttributes(target, renderingTree.attributes);
      syncChildren(target, renderingTree.children);
    } else {
      return replace(getNewNode(renderingTree));
    }
  }
}

function getNewNode(renderingTree: RenderingTree): Node {
  if (typeof renderingTree === "string") {
    return document.createTextNode(renderingTree);
  }

  const element = document.createElement(renderingTree.tagName);
  syncAttributes(element, renderingTree.attributes);
  syncChildren(element, renderingTree.children);
  return element;
}

function syncAttributes(
  target: HTMLElement,
  attributes: Record<string, string>
) {
  for (const [key, value] of Object.entries(attributes)) {
    if (target.getAttribute(key) !== value) {
      target.setAttribute(key, value);
    }
  }
}

function syncChildren(target: HTMLElement, children: RenderingTree[]) {
  const removingChildren = [];

  const max = Math.max(target.children.length, children.length);

  for (let i = 0; i < max; i++) {
    const child = target.children[i] ?? null;
    const renderingTree = children[i];

    if (!renderingTree) {
      if (child) {
        removingChildren.push(child);
      }
      continue;
    }

    sync({
      target: child,
      replace: (newNode) => {
        if (child) {
          target.replaceChild(newNode, child);
        } else {
          target.appendChild(newNode);
        }
      },
      renderingTree,
    });
  }

  for (const child of removingChildren) {
    target.removeChild(child);
  }
}

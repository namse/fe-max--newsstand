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
    return replace(createNode(renderingTree));
  }

  if (typeof renderingTree === "string") {
    if (target.nodeType === Node.TEXT_NODE) {
      if (target.textContent !== renderingTree) {
        target.textContent = renderingTree;
      }
      return;
    } else {
      return replace(createNode(renderingTree));
    }
  } else {
    if (target instanceof HTMLElement) {
      if (target.tagName !== renderingTree.tagName) {
        return replace(createNode(renderingTree));
      }
      syncElement(target, renderingTree);
    } else {
      return replace(createNode(renderingTree));
    }
  }
}

function createNode(renderingTree: RenderingTree): Node {
  if (typeof renderingTree === "string") {
    return document.createTextNode(renderingTree);
  }

  const element = document.createElement(renderingTree.tagName);

  if (renderingTree.use) {
    const dispose = renderingTree.use();
    if (dispose) {
      element.addEventListener("DOMNodeRemovedFromDocument", () => {
        dispose();
      });
    }
  }

  syncElement(element, renderingTree);
  return element;
}

function syncElement(
  element: HTMLElement,
  renderingTree: Exclude<RenderingTree, string>
) {
  syncAttributes(element, renderingTree.attributes);
  syncChildren(element, renderingTree.children);
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
  const removingChildrenCount = target.children.length - children.length;
  for (let i = 0; i < removingChildrenCount; i++) {
    target.lastChild!.remove();
  }

  for (let i = 0; i < children.length; i++) {
    const childNode = target.childNodes[i]!;
    const renderingTree = children[i];

    if (!renderingTree) {
      continue;
    }

    sync({
      target: childNode,
      replace: (newNode) => {
        if (childNode) {
          target.replaceChild(newNode, childNode);
        } else {
          target.appendChild(newNode);
        }
      },
      renderingTree,
    });
  }
}

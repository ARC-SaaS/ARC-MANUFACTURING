/** Discourage casual copying; browser-delivered content is never secret. */
export function installCopyProtection(doc = document) {
  const preventCopy = (event) => {
    event.preventDefault();
  };
  const events = ['copy', 'cut', 'contextmenu', 'dragstart'];
  for (const name of events) doc.addEventListener(name, preventCopy, true);
  return () => {
    for (const name of events) doc.removeEventListener(name, preventCopy, true);
  };
}

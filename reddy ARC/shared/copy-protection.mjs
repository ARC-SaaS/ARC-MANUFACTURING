/** Discourage casual copying; browser-delivered content is never secret. */
export function installCopyProtection(doc = document) {
  const preventCopy = (event) => {
    event.preventDefault();
  };
  const events = ['copy', 'cut', 'contextmenu', 'dragstart'];
  const preventSelection = (event) => {
    const target =
      event.target?.nodeType === 3 ? event.target.parentElement : event.target;
    if (target?.closest?.('input, textarea') || target?.isContentEditable)
      return;
    event.preventDefault();
  };
  for (const name of events) doc.addEventListener(name, preventCopy, true);
  doc.addEventListener('selectstart', preventSelection, true);
  return () => {
    for (const name of events) doc.removeEventListener(name, preventCopy, true);
    doc.removeEventListener('selectstart', preventSelection, true);
  };
}

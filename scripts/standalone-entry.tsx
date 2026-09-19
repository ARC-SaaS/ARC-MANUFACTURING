import { createRoot } from 'react-dom/client';
import { useLayoutEffect } from 'react';
import Home from '../app/page';
import Privacy from '../app/privacy/page';
import Terms from '../app/terms/page';
import Contact from '../app/contact/page';
import '../app/globals.css';
import '../app/original-theme.css';
import '../app/typography.css';
import '../app/reload.css';
import '../app/content-protection.css';
import { installCopyProtection } from '../shared/copy-protection.mjs';

installCopyProtection();
// The explicit page marker also works when servers omit the .html extension.
const page = document.documentElement.dataset.arcPage;
const path = location.pathname.replace(/\/$/, '');
const Page = page === 'privacy' || /\/privacy(?:\.html)?$/.test(path)
  ? Privacy
  : page === 'terms' || /\/terms(?:\.html)?$/.test(path) ? Terms
  : page === 'contact' || /\/contact(?:\.html)?$/.test(path) ? Contact : Home;
document.documentElement.classList.add('dark');
function StandaloneApp() {
  // Replace the HTML loading screen only once React has committed its first frame.
  useLayoutEffect(() => {
    const startup = document.getElementById('arc-startup');
    const image = document.querySelector<HTMLImageElement>('#root .brand-logo--loader img');
    let cancelled = false;
    const handoff = () => { if (!cancelled) startup?.remove(); };
    // Keep the first frame until the replacement logo is decoded, avoiding a flash.
    if (image && typeof image.decode === 'function') image.decode().then(handoff, handoff);
    else handoff();
    return () => { cancelled = true; };
  }, []);
  return <Page/>;
}
createRoot(document.getElementById('root')!).render(<StandaloneApp/>);

import { renderToStaticMarkup } from 'react-dom/server';
import Home from '../app/page';
import Privacy from '../app/privacy/page';
import Terms from '../app/terms/page';
import Contact from '../app/contact/page';

export const pages = {
  home: renderToStaticMarkup(<Home />),
  privacy: renderToStaticMarkup(<Privacy />),
  terms: renderToStaticMarkup(<Terms />),
  contact: renderToStaticMarkup(<Contact />),
};

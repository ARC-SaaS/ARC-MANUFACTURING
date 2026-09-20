import test from 'node:test';
import assert from 'node:assert/strict';
import { installCopyProtection } from '../shared/copy-protection.mjs';
import { getSiteOrigin } from '../shared/site-config.mjs';
import { readFileSync } from 'node:fs';

test('copy protection blocks content and editable-field events, and cleans up', () => {
  const listeners = new Map();
  const doc = {
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: (name, handler) => {
      assert.equal(listeners.get(name), handler);
      listeners.delete(name);
    },
  };
  const remove = installCopyProtection(doc);
  for (const name of ['copy', 'cut', 'contextmenu', 'dragstart']) {
    let blocked = false;
    const event = { target: { closest: () => null }, preventDefault: () => { blocked = true; } };
    listeners.get(name)(event);
    assert.equal(blocked, true, name);
    blocked = false;
    event.target.closest = () => ({});
    listeners.get(name)(event);
    assert.equal(blocked, true, `${name} in editable field`);
  }
    assert.equal(listeners.has('keydown'), false, 'Keyboard navigation and browser shortcuts stay available');
    for (const [target, expected] of [
      [{ closest: () => null }, true],
      [{ closest: () => ({}) }, false],
      [{ closest: () => null, isContentEditable: true }, false],
      [{ nodeType: 3, parentElement: { closest: () => null, isContentEditable: true } }, false],
    ]) {
      let blocked = false;
      listeners.get('selectstart')({ target, preventDefault: () => { blocked = true; } });
      assert.equal(blocked, expected, 'Selection is blocked only outside editors');
    }
    assert.equal(listeners.has('touchstart'), false, 'Touch scrolling and zoom stay available');
  remove();
  assert.equal(listeners.size, 0);
});

test('public origins must be explicit HTTPS origins without credentials, paths, or queries', () => {
  assert.equal(getSiteOrigin('https://example.com/'), 'https://example.com');
  for (const value of ['', 'invalid', 'http://example.com', 'https://a:b@example.com', 'https://example.com/path', 'https://example.com/?q=1', 'https://example.com/#a']) {
    assert.equal(getSiteOrigin(value), '', value);
  }
});

test('standalone exports contain crawlable page content before JavaScript', () => {
  const logo = readFileSync('public/arc-logo-transparent.png').toString('base64');
  for (const [file, page] of [['ARC (3).html', 'home'], ['privacy.html', 'privacy'], ['terms.html', 'terms']]) {
    const html = readFileSync(file, 'utf8');
    assert.ok(html.includes(`data-arc-page="${page}"`), file);
    if (page === 'home') assert.ok(html.includes(logo), `${file}: original brand artwork`);
    const content = html.slice(html.indexOf('<div id="root">'), html.indexOf('<script>'));
    assert.equal((content.match(/<h1[ >]/g) || []).length, 1, `${file}: one rendered main heading`);
    assert.ok(content.includes('<main') && content.includes('<p>'), `${file}: visible server-rendered content`);
    assert.ok(!html.includes('arc-header-logo.png'), file);
    assert.ok(!html.includes('src:{arcEmbeddedLogo:'), `${file}: image source must be a string`);
    assert.ok(html.includes('./privacy.html') && html.includes('./terms.html'), `${file}: portable legal links`);
    assert.ok(html.indexOf('id="arc-startup-logo"') < html.indexOf('<script>'), `${file}: logo exists before application JavaScript`);
    assert.ok(html.includes('fetchpriority="high" decoding="sync"'), `${file}: prioritize first logo paint`);
  }
});

test('site and package versions agree', () => {
  const site = JSON.parse(readFileSync('lib/site.json', 'utf8'));
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.equal(site.version, pkg.version);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { structuredData, serializeStructuredData } from '../shared/seo-data.mjs';
import { readFileSync } from 'node:fs';

test('exported secondary pages return to the local homepage and FAQ', () => {
  for (const file of ['contact.html', 'privacy.html', 'terms.html']) {
    const html = readFileSync(file, 'utf8');
    assert.match(html, /<a[^>]+href="\.\/#home"[^>]*>\s*← Back to ARC<\/a>/, file);
    assert.match(html, /<a[^>]+href="https:\/\/arc-ai\.in\/#faq"/, file);
    assert.ok(!html.includes('./ARC (3).html'), `${file} must not link to the unpublished export filename`);
  }
});

test('structured data uses the configured public origin and known business details', () => {
  const data = structuredData({ url: 'https://example.com', description: 'Component traceability' });
  assert.equal(data['@graph'][0].url, 'https://example.com/');
  assert.equal(data['@graph'][1].publisher['@id'], data['@graph'][0]['@id']);
  assert.equal(structuredData({ url: '' }), null);
  assert.ok(!serializeStructuredData({ url: 'https://example.com', description: '</script>' }).includes('</script>'));
});

test('exported pages have distinct titles, descriptions and a valid viewport', () => {
  const titles = new Set();
  for (const file of ['ARC (3).html', 'privacy.html', 'terms.html']) {
    const html = readFileSync(file, 'utf8');
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<meta name="viewport" content="width=device-width,initial-scale=1"/);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /<a[^>]+href="(?:\.\/privacy.html|mailto:)/);
  }
  assert.equal(titles.size, 3);
});

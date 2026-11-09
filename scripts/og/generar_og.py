"""Genera las imágenes Open Graph (1200 × 630) que falten en public/og.

Uso (desde la raíz del proyecto, tras `npm run build`, que escribe scripts/og/pages.json):

    pip install playwright && playwright install chromium
    python scripts/og/generar_og.py          # solo las que faltan
    python scripts/og/generar_og.py --todas  # regenera también las existentes

Mismo estilo que las imágenes actuales: crema, wordmark, título en Fraunces, franja cálida inferior.
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public' / 'og'
PAGES = json.loads((Path(__file__).with_name('pages.json')).read_text(encoding='utf-8'))
FONTS = ROOT / 'node_modules'
F = {
    'fraunces': (FONTS / '@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2').as_uri(),
    'montserrat': (FONTS / '@fontsource/montserrat/files/montserrat-latin-400-normal.woff2').as_uri(),
    'montserrat5': (FONTS / '@fontsource/montserrat/files/montserrat-latin-500-normal.woff2').as_uri(),
    'barlow': (FONTS / '@fontsource/barlow/files/barlow-latin-700-normal.woff2').as_uri(),
}

HTML = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;src:url(%(fraunces)s);font-weight:100 900}
@font-face{font-family:Montserrat;src:url(%(montserrat)s);font-weight:400}
@font-face{font-family:Montserrat;src:url(%(montserrat5)s);font-weight:500}
@font-face{font-family:Barlow;src:url(%(barlow)s);font-weight:700}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;background:#fcfbf7;color:#00051e;position:relative;overflow:hidden;font-family:Montserrat,sans-serif}
.wm{position:absolute;left:84px;top:62px;font:700 34px Barlow;letter-spacing:.04em}
.wm b{color:#4692ff}
.icon{position:absolute;right:80px;top:70px;width:120px;height:120px;border-radius:26px;background:#4692ff;display:flex;align-items:center;justify-content:center}
.icon svg{width:70px;height:70px}
.kicker{position:absolute;left:84px;top:140px;font:500 18px Montserrat;letter-spacing:.2em;text-transform:uppercase;color:#1f63cc}
.title{position:absolute;left:84px;top:182px;width:960px;height:270px;font-family:Fraunces,serif;font-weight:300;letter-spacing:-.01em;line-height:1.08;overflow:hidden}
.strip{position:absolute;left:0;right:0;bottom:0;height:160px;background:#fff3e4;padding:38px 84px}
.foot{font:400 28px Montserrat;color:#585b6a}
.url{margin-top:14px;font:500 24px Montserrat;color:#4692ff}
</style></head><body>
<div class="wm">MOIRA <b>ORDO</b></div>
<div class="icon"><svg viewBox="0 0 24 24" fill="#fff"><path d="M4 20V4h4l4 8 4-8h4v16h-3.4V9.6L13.5 17h-3L7.4 9.6V20z"/></svg></div>
<div class="kicker">%(kicker)s</div>
<div class="title" id="t">%(headline)s</div>
<div class="strip"><div class="foot">%(foot)s</div><div class="url">moiraordo.es</div></div>
<script>
const t=document.getElementById('t');let s=72;t.style.fontSize=s+'px';
document.fonts.ready.then(()=>{while(s>34&&(t.scrollHeight>t.clientHeight+1)){s-=2;t.style.fontSize=s+'px'}window.__ready=true})
</script></body></html>"""


def esc(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def main():
    todas = '--todas' in sys.argv
    pendientes = [p for p in PAGES if todas or not (OUT / f"{p['og']}.png").exists()]
    if not pendientes:
        print('No falta ninguna imagen Open Graph.')
        return
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={'width': 1200, 'height': 630})
        vistos = set()
        for item in pendientes:
            if item['og'] in vistos:
                continue
            vistos.add(item['og'])
            data = {k: esc(v) for k, v in item.items() if k != 'og'}
            data.update(F)
            html = HTML % data
            tmp = OUT / '_tmp_og.html'
            tmp.write_text(html, encoding='utf-8')
            page.goto(tmp.as_uri())
            page.wait_for_function('window.__ready===true')
            page.screenshot(path=str(OUT / f"{item['og']}.png"))
            tmp.unlink()
        browser.close()
    print(f'{len(vistos)} imágenes Open Graph generadas en public/og')


if __name__ == '__main__':
    main()

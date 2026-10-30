#!/usr/bin/env python3
"""Genera assets/manifest.js a partir de las carpetas assets/<contenedor>/.
Uso: coloca las imágenes en assets/<contenedor>/ y ejecuta: python3 tools/build-assets.py"""
import json, re, pathlib, urllib.parse
root = pathlib.Path(__file__).resolve().parent.parent / "assets"
EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"}
nat = lambda p: [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", p.name)]
out = {}
for d in sorted(x for x in root.iterdir() if x.is_dir()):
    files = sorted((f for f in d.iterdir() if f.suffix.lower() in EXT), key=nat)
    if files:
        out[d.name] = [f"assets/{d.name}/" + urllib.parse.quote(f.name) for f in files]
(root / "manifest.js").write_text(
    "/* Generado por tools/build-assets.py */\nwindow.ASSETS=" + json.dumps(out, ensure_ascii=False, indent=1) + ";\n", encoding="utf-8")
print("manifest.js:", {k: len(v) for k, v in out.items()} or "sin imágenes")

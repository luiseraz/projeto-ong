#!/usr/bin/env python3
"""Servidor estático mínimo para a pré-visualização local do projeto."""

from argparse import ArgumentParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--strictPort", action="store_true")
    args = parser.parse_args()

    os.chdir(Path(__file__).resolve().parent.parent)
    server = ThreadingHTTPServer((args.host, args.port), SimpleHTTPRequestHandler)
    print(f"Semente Viva disponível em http://{args.host}:{args.port}", flush=True)
    server.serve_forever()


if __name__ == "__main__":
    main()

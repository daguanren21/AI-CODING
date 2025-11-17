#!/usr/bin/env python3
"""Project-local launcher for the user-level mode hook."""
from __future__ import annotations

import os
from pathlib import Path
import runpy
import sys


def resolve_hook_path() -> Path:
    env_path = os.environ.get('CODEX_MODE_HOOK')
    if env_path:
        candidate = Path(env_path).expanduser()
    else:
        candidate = Path.home() / '.codex' / 'hooks' / 'mode_hook.py'
    if candidate.exists():
        return candidate
    raise FileNotFoundError(
        f"未找到 mode hook: {candidate}. 请设置 CODEX_MODE_HOOK 或确认 ~/.codex/hooks/mode_hook.py 存在"
    )


def execute_hook(hook_path: Path) -> None:
    original_argv0 = sys.argv[0]
    sys.argv[0] = str(hook_path)
    try:
        runpy.run_path(str(hook_path), run_name='__main__')
    finally:
        sys.argv[0] = original_argv0


def main() -> int:
    try:
        hook_path = resolve_hook_path()
        execute_hook(hook_path)
    except SystemExit as exc:
        if isinstance(exc.code, int):
            return exc.code
        print(exc, file=sys.stderr)
        return 1
    except Exception as exc:  # noqa: BLE001
        print(f'[HOOK] 启动失败: {exc}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
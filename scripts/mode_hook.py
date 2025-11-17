#!/usr/bin/env python3
"""Mode hook to restate key project constraints and pending tasks."""
from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys
from textwrap import indent

REPO_ROOT = Path(__file__).resolve().parents[1]
PROJECT_MD = REPO_ROOT / "openspec" / "project.md"
CHANGES_DIR = REPO_ROOT / "openspec" / "changes"

KEY_SECTIONS = [
    "Git Workflow",
    "Testing Strategy",
    "UI Component Usage",
]


def extract_sections(text: str) -> list[str]:
    lines = text.splitlines()
    headings = []
    for idx, line in enumerate(lines):
        if line.startswith("##"):
            stripped = line.lstrip("#").strip()
            headings.append((idx, stripped))
    sections: list[str] = []
    for key in KEY_SECTIONS:
        match_idx = next((i for i, (_, title) in enumerate(headings) if key.lower() in title.lower()), None)
        if match_idx is None:
            sections.append(f"- {key}: 未在 openspec/project.md 中找到对应段落")
            continue
        start_line = headings[match_idx][0]
        end_line = headings[match_idx + 1][0] if match_idx + 1 < len(headings) else len(lines)
        body = "\n".join(line.rstrip() for line in lines[start_line + 1 : end_line]).strip()
        snippet = body if body else "(无附加内容)"
        formatted = f"- {key}:\n" + indent(snippet, "  ")
        sections.append(formatted)
    return sections


CHECKBOX_PATTERN = re.compile(r"^- \[([ xX])\] (.+)$")


def parse_tasks(tasks_path: Path) -> tuple[list[str], list[str]]:
    pending, done = [], []
    for line in tasks_path.read_text(encoding="utf-8").splitlines():
        match = CHECKBOX_PATTERN.match(line.strip())
        if not match:
            continue
        state, label = match.group(1), match.group(2).strip()
        if state == " ":
            pending.append(label)
        else:
            done.append(label)
    return pending, done


def build_report(mode: str, change_id: str | None) -> str:
    if not PROJECT_MD.exists():
        raise FileNotFoundError(f"找不到 {PROJECT_MD}")
    project_text = PROJECT_MD.read_text(encoding="utf-8")
    section_texts = extract_sections(project_text)
    lines = [f"[HOOK] {mode.upper()} MODE REMINDER", "", "关键规范：", *section_texts, ""]

    if change_id:
        tasks_path = CHANGES_DIR / change_id / "tasks.md"
        if tasks_path.exists():
            pending, done = parse_tasks(tasks_path)
            if pending:
                lines.append(f"待办 ({len(pending)} 项未完成)：")
                lines.extend(f"- [ ] {item}" for item in pending)
            else:
                lines.append("待办：全部完成 ✅")
        else:
            lines.append(f"未找到 tasks.md：{tasks_path}")
    else:
        lines.append("未提供 change-id，无法定位 tasks.md。")
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Display PLAN/EXECUTE reminders")
    parser.add_argument("--mode", choices=["PLAN", "EXECUTE"], required=True)
    parser.add_argument("--change", dest="change_id", help="change-id, e.g. add-site-header-component")
    args = parser.parse_args()

    try:
        report = build_report(args.mode, args.change_id)
    except Exception as exc:  # noqa: BLE001
        print(f"[HOOK] 执行失败: {exc}", file=sys.stderr)
        return 1
    print(report)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

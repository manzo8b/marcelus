#!/usr/bin/env python3
"""Safe, dependency-free optional-skill plan for MARCELUS WebFoundry.

This router does not execute third-party skills, read untrusted tools, or alter the
source brief. It creates/verifies a traceable advisory plan for optional art
direction, UI review and motion. The WebFoundry engine remains authoritative.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys

from studio_bridge import read_blueprint

ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = ROOT / "config" / "auxiliary_skills.json"
PLAN_VERSION = "webfoundry-auxiliary-skill-plan/1.0"


def canonical(value: dict) -> bytes:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")


def registry() -> dict:
    data = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    assert data.get("architectural_authority") == "marcelus-webfoundry"
    modules = data.get("modules")
    if not isinstance(modules, list) or len(modules) != 3:
        raise ValueError("Exactly three approved advisory modules required")
    ids = [x["id"] for x in modules]
    if len(ids) != len(set(ids)) or any(x.get("execution") != "guidance-only" for x in modules):
        raise ValueError("Modules must be unique, advisory and never executable")
    return data


def make_plan(blueprint_path: Path, ids: list[str] | None = None) -> dict:
    bp = read_blueprint(blueprint_path)
    r = registry()
    allowed = {x["id"]: x for x in r["modules"]}
    selection = list(allowed) if ids is None else ids
    if not selection or len(selection) != len(set(selection)):
        raise ValueError("At least one unique module required")
    if set(selection) - set(allowed):
        raise ValueError("Unknown advisory module")
    chosen = sorted((allowed[x] for x in selection), key=lambda x: x["priority"])
    return {
        "schema_version": PLAN_VERSION,
        "authority": "marcelus-webfoundry",
        "blueprint_sha256": hashlib.sha256(canonical(bp)).hexdigest(),
        "registry_sha256": hashlib.sha256(canonical(r)).hexdigest(),
        "client_project": {"name": bp["project"]["name"], "sector": bp["project"]["sector"]},
        "selected_modules": [
            {"id": x["id"], "stage": x["stage"], "execution": "guidance-only", "priority": x["priority"]}
            for x in chosen
        ],
        "immutable": {
            "canonical_generator": "marcelus-webfoundry",
            "client_brand_preserved": True,
            "no_external_skill_execution": True,
            "no_unapproved_deployment": True,
            "human_review_required": True,
        },
        "not_executed": [x["tooling_status"] for x in chosen],
        "status": "advisory-routing-only",
    }


def validate_plan(plan: dict, blueprint_path: Path) -> dict:
    expected = make_plan(blueprint_path, [x["id"] for x in plan.get("selected_modules", [])])
    if plan != expected:
        raise ValueError("Skill plan differs from approved registry or source blueprint")
    return expected


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    create = sub.add_parser("plan", help="Create an advisory routing plan")
    create.add_argument("--blueprint", type=Path, required=True)
    create.add_argument("--out", type=Path, required=True)
    create.add_argument("--modules", nargs="*", help="Approved module IDs; omit for all")
    verify = sub.add_parser("validate", help="Verify a plan against its current brief and registry")
    verify.add_argument("--blueprint", type=Path, required=True)
    verify.add_argument("--plan", type=Path, required=True)
    options = parser.parse_args(argv)
    try:
        if options.command == "plan":
            plan = make_plan(options.blueprint, options.modules)
            if options.out.exists():
                raise ValueError("Refusing to overwrite existing skill plan")
            options.out.parent.mkdir(parents=True, exist_ok=True)
            options.out.write_text(json.dumps(plan, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print(f"Created advisory plan: {options.out} ({len(plan['selected_modules'])} modules)")
        else:
            if options.plan.stat().st_size > 100_000:
                raise ValueError("Skill plan too large")
            plan = json.loads(options.plan.read_text(encoding="utf-8"))
            validate_plan(plan, options.blueprint)
            print(f"Valid advisory plan: {options.plan}")
        return 0
    except (OSError, ValueError, json.JSONDecodeError, KeyError, TypeError) as error:
        print(f"ERROR: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())

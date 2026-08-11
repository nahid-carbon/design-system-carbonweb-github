#!/usr/bin/env python3
"""Install the repo git hooks. Run once after cloning:  python3 tools/install-hooks.py"""
import os, shutil, subprocess, sys
ROOT = subprocess.run(['git','rev-parse','--show-toplevel'], capture_output=True, text=True).stdout.strip()
if not ROOT: sys.exit('! not inside a git repo')
src, dst = os.path.join(ROOT,'tools','hooks','pre-commit'), os.path.join(ROOT,'.git','hooks','pre-commit')
shutil.copyfile(src, dst); os.chmod(dst, 0o755)
print('installed .git/hooks/pre-commit — commits now run tools/audit.py')
print('bypass a single commit with:  git commit --no-verify')

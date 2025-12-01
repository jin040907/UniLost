#!/bin/bash
#
# Copyright 2025 UniLost Contributors
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# Script to verify that critical functions are present

echo "Checking critical functions in app/unilost.html..."

CRITICAL_FUNCTIONS=(
  "initRegisterMap"
  "initBrowseMap"
  "switchTab"
  "DOMContentLoaded"
  "startPage"
)

MISSING_FUNCTIONS=()

for func in "${CRITICAL_FUNCTIONS[@]}"; do
  if ! grep -q "$func" ../app/unilost.html; then
    MISSING_FUNCTIONS+=("$func")
  fi
done

if [ ${#MISSING_FUNCTIONS[@]} -eq 0 ]; then
  echo "✅ All critical functions are present!"
  exit 0
else
  echo "❌ Missing critical functions:"
  for func in "${MISSING_FUNCTIONS[@]}"; do
    echo "  - $func"
  done
  echo ""
  echo "⚠️  Warning: Pull may have overwritten critical code!"
  echo "   Consider restoring from backup or checking git history."
  exit 1
fi


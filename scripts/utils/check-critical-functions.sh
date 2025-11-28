#!/bin/bash
# 중요한 함수들이 제대로 있는지 확인하는 스크립트

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


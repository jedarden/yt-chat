#!/bin/bash
# check-threat-docs.sh - CI enforcement for threat documentation completeness
#
# This script enforces the presence and completeness of threat documentation (THREAT_MODEL.md)
# as required by LS6. It is designed to fail CI if the documentation is missing or lacks
# any required sections, ensuring that security rationale and mitigations are always documented.
#
# Security Rationale:
# - Prevents merging code without an up-to-date threat model and mitigations.
# - Ensures all contributors document security decisions and attack surfaces.
# - Fails hard (no fallback) to guarantee compliance and visibility in CI.
#
# Required sections: "Threat Model", "Mitigations", "Attack Surface"
#
# See test_specs_LS6.md and repository documentation for details.

set -e

DOC="THREAT_MODEL.md"
REQUIRED_SECTIONS=("Threat Model" "Mitigations" "Attack Surface")

if [ ! -f "$DOC" ]; then
  echo "ERROR: $DOC is missing."
  exit 1
fi

for section in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -q "$section" "$DOC"; then
    echo "ERROR: Section '$section' missing from $DOC."
    exit 1
  fi
done

echo "Threat documentation check passed."
exit 0
#!/bin/bash -e

TMP=app/.tsconfig-lint.json
cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
EOF
for file in "$@"; do
  echo "    \"$file\"," >> $TMP
done
cat >>$TMP <<EOF
EOF
    echo "  \"$(pwd)/app/vendor.d.ts\"" >> $TMP
cat >>$TMP <<EOF
  ]
}
EOF
npx tsc --project $TMP
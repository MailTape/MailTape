#!/usr/bin/env bash

dir=${1:-.}
shopt -s dotglob nullglob

for path in "$dir"/*; do
  [[ -f "$path" ]] || continue

  name=${path##*/}
  lower=$(printf '%s' "$name" | tr '[:upper:]' '[:lower:]')
  [[ "$name" == "$lower" ]] && continue

  target="${dir%/}/$lower"
  temp="${path}.tmp-$$"

  # Move aside first so case-only renames work on macOS and other
  # case-insensitive filesystems.
  if ! mv "$path" "$temp"; then
    printf 'Could not rename: %s\n' "$path" >&2
    continue
  fi

  # If a different file already has the lowercase name, restore the original.
  if [[ -e "$target" || -L "$target" ]]; then
    mv "$temp" "$path"
    printf 'Skipping: %s already exists\n' "$target" >&2
    continue
  fi

  if ! mv "$temp" "$target"; then
    mv "$temp" "$path"
    printf 'Could not rename to: %s\n' "$target" >&2
  fi
done

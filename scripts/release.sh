#!/bin/sh
set -eu

usage() {
    cat <<ENDUSAGE
Usage: $0 <workspace> <version>

ARGUMENTS
    workspace   The name of the NPM workspace to release
    version     The version to set
                One of: "major", "minor", "patch",
                or a specific version number like "1.2.3"
ENDUSAGE
}

# Return nonzero if there are uncommitted changes to tracked files in the repo.
# Ignore untracked files.
test_uncommitted_changes() {
    git status --porcelain | grep -v '^??'
    return $?
}

workspace=
version=
while test $# -gt 0; do
    case "$1" in
        -h | --help ) usage; exit 0 ;;
        *)
            if test -z "$workspace"; then
                workspace="$1"
                shift
            elif test -z "$version"; then
                version="$1"
                shift
            else
                usage
                exit 1
            fi
            ;;
    esac
done

if test -z "$workspace" || test -z "$version"; then
    usage
    exit 1
fi

branch=$(git rev-parse --abbrev-ref HEAD)
if test "$branch" != "master"; then
    echo "Error: You must be on the master branch to release."
    exit 1
fi

if test_uncommitted_changes; then
    echo "Error: Working directory is not clean. Stash or commit before releasing."
    exit 1
fi

# Make sure npm install won't modify package-lock.json
npm install
if test_uncommitted_changes; then
    echo "Error: npm install modified package-lock.json. You can probably just commit this and re-run."
    exit 1
fi

# Bump the version in package.json
npm version "$version" --workspace "$workspace"

# Update the lockfile with the new version (and no other changes)
npm install

version=$(node -p "require('./$workspace/package.json').version")

# Commit
git commit -a -m "Release $workspace@$version"
git tag "$workspace@$version"

echo "Committed and tagged $workspace@$version"
echo ""
echo "To push the changes, run:"
echo "  git push origin ${branch} --tags"

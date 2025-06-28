#!/bin/sh
set -eu

usage() {
    cat <<ENDUSAGE
Usage: $0 [-han] <workspace> <version>

ARGUMENTS
    -h, --help   Show this help message
    -a, --all    Release all workspaces that contain a public package
    -n, --no-commit
                Do not commit or tag the changes after releasing
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

# Get a list of workspaces that contain a public package
get_publishable_workspaces() {
    # This assumes that the workspaces are defined in package.json
    # and that they contain a "private": false field in their package.json.
    jq -r '.workspaces[]' package.json | while read -r workspace; do
        if [ -f "$workspace/package.json" ]; then
            if jq -e '.private != true' "$workspace/package.json" > /dev/null; then
                echo "$workspace"
            fi
        fi
    done
}

commit=1
workspace=
version=
while test $# -gt 0; do
    case "$1" in
        -h | --help ) usage; exit 0 ;;
        -a | --all) workspace=$(get_publishable_workspaces | tr '\n' ' '); shift ;;
        -n | --no-commit ) commit= ;shift ;;
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

# if test_uncommitted_changes; then
#     echo "Error: Working directory is not clean. Stash or commit before releasing."
#     exit 1
# fi

# Make sure npm install won't modify package-lock.json
# npm install
# if test_uncommitted_changes; then
#     echo "Error: npm install modified package-lock.json. You can probably just commit this and re-run."
#     exit 1
# fi

commitmsg="Release"
for ws in $workspace; do
    # Bump the version in package.json
    npm version "$version" --workspace "$ws"

    # Update the lockfile with the new version (and no other changes)
    npm install

    newver=$(node -p "require('./$ws/package.json').version")
    commitmsg="$commitmsg $ws@$newver"
done

if test "$commit"; then
    git commit -a -m "$commitmsg"
    for ws in $workspace; do
        newver=$(node -p "require('./$ws/package.json').version")
        git tag "$ws@$newver"
    done
    echo "Committed with message: $commitmsg"
    echo ""
    echo "To push the changes, run:"
    echo "  git push origin ${branch} --tags"
else
    echo "Changes made, but not committed or tagged."
    echo "You can commit and tag them manually if desired."
fi

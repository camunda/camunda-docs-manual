VERSION=$1

# set up a branch for this work
BRANCH=pepopowitz/product-hub-232/$1
git switch $VERSION
git branch $BRANCH
git switch $BRANCH

# update the theme
cd ../camunda-docs-theme
npm run build && npm run optimize

# commit the updated theme
cd ../camunda-docs-manual
git add themes/camunda/assets/js
git add themes/camunda/layouts
git commit -m "chore: update theme"

# undo the updated theme css
git restore themes/camunda/assets/css

# update the config.yaml
sed -i '' -E 's/baseURL: \"(.*)\"/baseURL: \"https:\/\/docs.camunda.org\1\"/g' config.yaml 


# commit the updated config
git add config.yaml
git commit -m "feat: fully qualify baseURL so that sitemap and rel=canonical links get built correctly"

# re-generate the site for screenshots
hugo

# push up branch
git push origin

# open a PR
TITLE="feat: canonicals($VERSION) -- fix sitemap & apply rel=canonical strategy to $VERSION branch"
BODY="Part of https://github.com/camunda/product-hub/issues/232.

1. Updates the theme based on https://github.com/camunda/camunda-docs-theme/pull/31
2. Fully qualifies the \`baseURL\` setting so that sitemap is valid, and rel=canonical can be set
3. Applies the rel=canonical strategy discussed in https://github.com/camunda/product-hub/issues/232#issuecomment-1292543102

## Proof that the sitemap gets generated with absolute URLs

I ran a build locally and this is the generated sitemap:

SITEMAP

## Proof that pages are generated with a versionless rel=canonical

I ran a build locally and this is the generated page for \`/manual/$VERSION/user-guide/security/\`:

CANONICAL

"

# -a = assignee
# -B = baseline for the PR
gh pr create --web -t "$TITLE" -a @me -B $VERSION -b "$BODY"


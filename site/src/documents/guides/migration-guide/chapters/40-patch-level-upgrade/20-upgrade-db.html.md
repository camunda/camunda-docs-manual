---

title: 'Upgrade your Database'
category: 'Patch Level Upgrade'

---

Within a minor version we will not change anything in our database structure. The database structure
of all patch releases is backwards compatible to the corresponding minor version.

However, we do provide patch scripts that **must** be executed after creating or updating the database. We ship the
patch scripts with the prepackaged distribution in the following location:
`$DISTRIBUTION_PATH/sql/upgrade`, named: `$DATABASENAME_engine_$VERSION_patch_$A_to_$B`.
Please execute all patch scripts that are within the bounds of your upgrade path. This means if
your current patch version is `X.X.1` and you upgrade to `X.X.5` you have to execute all
patch scripts first where `$A` &ge; `X.X.1` and `$B` &le; `X.X.5`.

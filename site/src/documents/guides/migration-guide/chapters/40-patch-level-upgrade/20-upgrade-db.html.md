---

title: 'Upgrade your Database'
category: 'Patch Level Upgrade'

---

Within a minor version we will not change anything in our database structure. The database structure of all patch releases is backwards compatible to the corresponding minor version.  
However, we do provide patch scripts that **must** be executed after creating or updating the database. We ship the patch scripts with the prepackaged distribution in the following location: `$DISTRIBUTION_PATH/sql/upgrade`, named: `$DATABASENAME_engine_$VERSION_patchXXX`. Please execute all the patch scripts consecutively.

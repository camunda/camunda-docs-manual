---

title: 'Migrating UI Plugins'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

In the 7.3 release of the [Admin][admin] and [Cockpit][cockpit] UIs, the [angular-ui][angular-ui] which is __not supported anymore__ has been, partially, replaced by [angular-bootstrap][angular-bootstrap].

Custom Cockpit plugins might have use directives or filters provided by [angular-ui][angular-ui] and therefore need to be reviewed.

### Hints
Typically, you can skip this if you do not have custom plugins, otherwise you might want to have a look at the templates of your custom plugins (because it is where filters and directives are expected to be used).

Directives which are __not available anymore__:

- `ui-animate`
- `ui-calendar`
- `ui-codemirror`
- `ui-currency`
- `ui-date`
- `ui-event`
- `ui-if`
- `ui-jq`
- `ui-keypress`
- `ui-map`
- `ui-mask`
- `ui-reset`
- `ui-route`
- `ui-scrollfix`
- `ui-select2`
- `ui-showhide`
- `ui-sortable`
- `ui-tinymce`
- `ui-validate`

Filters which are __not availabe anymore__:

- `format`
- `highlight`
- `inflector`
- `unique`



[admin]: https://github.com/camunda-/camunda-admin-ui
[cockpit]: https://github.com/camunda-/camunda-cockpit-ui
[angular-ui]: https://github.com/angular-ui/angular-ui-OLDREPO
[angular-bootstrap]: https://github.com/angular-ui/bootstrap

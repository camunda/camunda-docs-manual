---

title: 'Choices'
category: 'Supported HTML Controls'

---

## Select Boxes

boolean, enum values, ...

### Example: minimal

The following snippet illustrate the minimalistic way to render a dropdown selection with choices
gathered from the server.

```html
<select cam-variable-name="foo"
        cam-choices="fooChoices" />
```


### Example: multiple choices and server loaded choices

Here is a variation in which the user is present several choices (and can select more than one) and
some of those choices are coming from the server.

```html
<select cam-variable-name="foo"
        cam-choices="fooChoices"
        multiple>
  <option value="doc-value-1">Value 1</option>
  <option value="doc-value-2">Value 2</option>
</select>
```

After the information about the form got received, the options are added after the existing ones.

```html
<select cam-variable-name="foo"
        cam-choices="fooChoices"
        multiple>
  <option value="doc-value-1">Value 1</option>
  <option value="doc-value-2">Value 2</option>
  <option value="server-value-3">Value 3</option>
  <option value="server-value-4">Value 4</option>
</select>
```

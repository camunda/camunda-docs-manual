---

title: 'File Download'
category: 'Supported HTML Controls'

---

Besides uploading a file, it is also possible to present the user with a download link or displaying files as images.

### Download Link

The `cam-file-download` directive turns a link into a file download link.

```html
<a cam-file-download="INVOICE_DOCUMENT"></a>
```

The above link will allow the user to download the file stored in the variable `INVOICE_DOCUMENT`.

If the link has no text content, the filename of the file will be set as text content.

### Displaying an uploaded Image

If the user uploaded an image, it can be displayed using an `<img>` tag. There is no special directive for this yet.
However, you can make sure that the corresponding variable is fetched (either using javascript or an hidden input field) and then
use the generated link as value for the `src` attribute.

```html
<!-- make sure the file is fetched. Alternative: use javascript -->
<input type="hidden" cam-variable-name="INVOICE_DOCUMENT"/>

<!-- set contentUrl as src of the image-->
<img src="{{ camForm.variableManager.variable('INVOICE_DOCUMENT').contentUrl }}"></img>
```

> **Note**: the above example uses the angular js integration.


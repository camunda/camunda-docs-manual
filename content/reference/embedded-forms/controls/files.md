---

title: 'File Upload and Download'
weight: 70

menu:
  main:
    identifier: "embedded-forms-ref-files"
    parent: "embedded-forms-ref-controls"

---

# Uploading Files

File input elements are HTML controls in the form of

```html
<input type="file"></input>
```

They allow users to upload files, which will be stored as a process instance variable of the type Bytes. Larger files will take longer to process and may crash the browser, so there is a soft file size limit of 5MB. You can overwrite this limit using the `cam-max-filesize` directive. To upload larger files without freezing the browser, see the [custom javascript section]({{< relref "reference/embedded-forms/javascript/examples.md#upload-large-files" >}}).

{{< note class="warning" >}}
File Upload is not supported for Internet Explorer 9.
{{< /note >}}

Files can be uploaded using the `cam-variable-name` and `cam-variable-type` directives:

```html
<input type="file"
       cam-variable-name="INVOICE_DOCUMENT"
       cam-variable-type="File"
       cam-max-filesize="10000000" />
```

In the example above, the user can upload a document with a maximum filesize of 10MB. The uploaded file will be stored as process instance variable with the name `INVOICE_DOCUMENT`.

Besides uploading a file, it is also possible to present the user with a download link or displaying files as images.


# Downloading Files

The `cam-file-download` directive turns a link into a file download link.

```html
<a cam-file-download="INVOICE_DOCUMENT"></a>
```

The above link will allow the user to download the file stored in the variable `INVOICE_DOCUMENT`.

If the link has no text content, the filename of the file will be set as text content.


# Displaying an Uploaded Image

If the user uploaded an image, it can be displayed using an `<img>` tag. There is no special directive for this yet.
However, you can make sure that the corresponding variable is fetched (either using javascript or an hidden input field) and then
use the generated link as value for the `src` attribute.

```html
<!-- make sure the file is fetched. Alternative: use javascript -->
<input type="hidden" cam-variable-name="INVOICE_DOCUMENT"/>

<!-- set contentUrl as src of the image-->
<img src="{{ camForm.variableManager.variable('INVOICE_DOCUMENT').contentUrl }}"></img>
```

{{< note >}}
**Note**: the above example uses the angular js integration.
{{< /note >}}

---

title: 'File Input Fields'
category: 'Supported HTML Controls'

---

<div class="alert alert-warning">
  <p>
    <strong>Note:</strong> File Upload is not supported for Internet Explorer 9.
  </p>
</div>


File input elements are HTML

```html
<input type="file"></input>
```

controls. They allow users to upload files, which will be stored as a process instance variable of the type Bytes. Larger files will take longer to process and may crash the browser, so there is a soft file size limit of 5MB. You can overwrite this limit using the `cam-max-filesize` directive. To upload larger files without freezing the browser, see the [custom javascript section][JavascriptUpload].

The file input element can not be used to download previously uploaded files. To provide download links for files, see the [download example][DownloadExample] in the custom javascript section.

### Uploading Files

Files can be uploaded using the `cam-variable-name` and `cam-variable-type` directives:

```html
<input type="file"
       cam-variable-name="INVOICE_DOCUMENT"
       cam-variable-type="Bytes"
       cam-max-filesize="10000000" />
```

In the example above, the user can upload a document with a maximum filesize of 10MB. The uploaded file will be stored as process instance variable with the name `INVOICE_DOCUMENT`.

### Supported Variable Types for Input Elements

The file input type supports variables of type Bytes only. The directive `cam-variable-type="Bytes"` must be used.

[JavascriptUpload]: ref:#custom-javascript-examples-upload-large-files
[DownloadExample]: ref:#custom-javascript-examples-provide-download-link-for-byte-variables

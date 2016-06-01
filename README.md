# The Camunda BPM Documentation Sources

This repository contains the sources of the Camunda BPM Documentation.

**Important:** _do NOT change the content of `themes/camunda` directory directly!_
Instead, Change the [theme](//github.com/camunda/camunda-docs-theme).

## Installing Hugo

In order to build this documentation, you first need to install [hugo][hugo].

> **Note:** Camunda docs currently requires a patched version of hugo which can be downloaded from the [Camunda Nexus][].

## Building the Documentation

After you have installed hugo, you can build the docs by typing the following command:

```bash
hugo
```

A static build of the documentation will be placed in the `public/` folder.

While editing the docs, you probably want to start the hugo server in "watch mode":

```bash
hugo server -w
```

You can then browse the docs under [http://localhost:1313/](http://localhost:1313/).
Hugo will automatically detect when you change a file and refresh the page in the browser.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/3.0/80x15.png"></a> The content on this site is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.

## Writing Docs

Some guidelines for writing docs

### How can I add an image?

#### Where should I put the image?

Images should be put next to the content page which references them.

So if you have a file named `user-guide/process-engine/history/overview.md` and you want to add an image named `architecture-overview.png` then it should be placed in the same folder.

#### How can I reference the image?

Use the `img` shorthand:

```html
{{< img src="architecture-overview.png" title="History Architecture" >}}
```

### How can I reference to the Javadocs?

Use the 'javadocref' shorthand:

```html
{{< javadocref page="?org/camunda/bpm/engine/impl/TaskServiceImpl.html" text="Java-API Task Service" >}}.
```

### How can I add a note?

Use the `note` shorthand:

```html
{{< note title="Heads Up!" class="info" >}}
The content of the note.

* full
* markdown is supported

{{< /note >}}
```

Supported classes:

* `info`
* `warning`


### How can I add an "EE only note"?

Sometimes you want to flag a Feature as an Enterprise Feature.

This can be achieved using the `enterprise` shortcode:

```html
{{< enterprise >}}
The FOO Feature is only available in the Enterprise Edition.
{{< /enterprise >}}
```

### How can I highlight code lines

By using the `code` which can highlight 1 line or a range of lines (and you can set that mutliple times).

```html
{{< code language="xml" line="3-5,13" >}}<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cmmn:definitions id="_d7e7cad4-86f1-4c04-9dff-a9aace3afb61"
        targetNamespace="http://cmmn.org"
        xmlns:cmmn="http://www.omg.org/spec/CMMN/20151109/MODEL"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:camunda="http://camunda.org/schema/1.0/cmmn">

  <cmmn:case id="loan_application">
    <cmmn:casePlanModel autoComplete="false"
                        name="Loan Application"
                        id="CasePlanModel">
      <!-- Plan Items -->
      <cmmn:planItem definitionRef="HumanTask_1" id="PI_HumanTask_1"/>

      <!-- ... -->
    </cmmn:casePlanModel>
  </cmmn:case>

</cmmn:definitions>{{< /code >}}
```

## How do I make screenshots for documentation

### Setup

* Download and install [OpenOffice][openoffice]
* Download and install [Open Sans font][opensans]
* Create a new drawing in OpenOffice Draw

![Setup](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/page-setup.png)

* Configure document:
    * Zoom & View layout (double click on zoom factor in the footer) -> Zoom factor 100%

![Set Zoom Level](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/set-zoom.PNG)


* Page Setup (Format menu -> Page)
    * Format: Screen (this will change back to "User" after further modifications)
    * Width: 30,00 cm
    * Height: 20,00 cm
    * Orientation: Landscape

![Set Zoom Level](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/page-setup-modal.png)


### Take the screenshots

* Hover over the drawing with your browser and adjust the browser screen size to fit the drawing
* Take screenshot
* Paste screenshot into the drawing
* Right click on the image and select 'Original Size'

### Add annotations

* Add rectangle shapes for text boxes
* Use the Open Sans font for text

![Set Font](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/font.png)

* If possible, utilize the whitespaces within the image
* Use shadows

![Set shadows](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/shadow.png)

### Export the image
* Export (File menu -> Export)
* Select PNG format and name the file
* Compression: 1
* Resolution: 96 pixels/inch

![Export](https://raw.githubusercontent.com/camunda/camunda-docs-manual/master/develop/drawings/ReadMe-images/export.png)

## Writing Guidelines

* Use short sentences. Full stop is better than comma.
* Don't constantly repeat context: One a Page named *Updating Camunda* not every headline needs to start with *"Upating this"*, *"Updating that"*. Instead just write *"This"* or *"That"*. It is clear to the reader that things are being updated. Other example: if the page is named *"Installing the Full Distribution for JBoss Application Server"* not every section needs to mention the application server: Instead of *"The following steps are necessary in order to install the REST Api on JBoss"* write: *"The following steps are necessary in order to install the REST Api:"*
* Don't overruse notes and warning. Not everything that comes into mind while writing a paragraph is a note or a warning. Maybe it is just content. There should not be more notes and warinings than content.
* Yes you programmed the stuff but you don't need to write the docs in a super self-concious way: insted of *"We use slf4j for logging"* write: *"Slf4j is used for logging"*.
* Don't use the future form: instead of *"This document will guide you through he steps of..."* write *"This document guides you through the steps"*
* Nice combination of the previous two points: *"Throughout this guide, we will use a number of variables to denote common path names and constants:"* => *"This guide uses the following variables to denote common path names and constants:"*
* Use this tool to convert titles into title case: [title converter][title converter]

[hugo]: http://gohugo.io/
[hugo-installation]: http://gohugo.io/overview/installing/
[Camunda Nexus]: https://app.camunda.com/nexus/content/repositories/public/hugo/
[title converter]: http://individed.com/code/to-title-case/
[openoffice]: https://www.openoffice.org/download/index.html
[opensans]: https://www.google.com/fonts#UsePlace:use/Collection:Open+Sans
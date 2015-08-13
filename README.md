# The Camunda BPM Documentation Sources

This repository contains the sources of the Camunda BPM Documentation.

## Installing Hugo

In order to build this documentation, you first need to install [hugo][hugo].

See the [hugo installation guilde][hugo-installation] for more details on howto install Hugo.

**Note:** Camunda docs currently requires a patched version of hugo which can be downloaded from the [Camunda Nexus][].

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
*

### How can I add an "EE only note"?

Sometimes you want to flag a Feature as an Enterprise Feature.

This can be achieved using the `enterprise` shortcode:

```html
{{< enterprise >}}
The FOO Feature is only available in the Enterprise Edition.
{{< /enterprise >}}
```

## Writing Guidelines

* Use short sentences. Full stop is better than comma.
* One a Page named *Updating Camunda* not every headline needs to start with *Upating this*, *Updating that*. Instead just write *This* or *That*. It is clear to the reader that things are being updated.
* Don't overruse notes and warning. Not everything that comes into mind while writing a paragraph is a note or a warning. Maybe it is just content. There should not be more notes and warinings than content.
* Yes you programmed the stuff but you don't need to write the docs in a super self-concious way: insted of *"We use slf4j for logging"* write: *"Slf4j is used for logging"*.
* Don't use the future form: instead of *"This document will guide you through he steps of..."* write *"This document guides you through the steps"*

[hugo]: http://gohugo.io/
[hugo-installation]: http://gohugo.io/overview/installing/
[Camunda Nexus]: https://app.camunda.com/nexus/content/repositories/public/hugo/

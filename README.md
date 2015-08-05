# The Camunda BPM Documentation Sources

This repository contains the sources of the Camunda BPM Documentation.

## Installing Hugo

In order to build this documentation, you first need to install [hugo][hugo].

Hugo can be installed by downloading it and putting the binary inside your path. See the [hugo installation guilde][hugo-installation] for more details.

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

You can then browse the docs under [http://localhost:1313/latest/](http://localhost:1313/latest/).
Hugo will automatically detect when you change a file and refresh the page in the browser.

[hugo]: http://gohugo.io/
[hugo-installation]: http://gohugo.io/overview/installing/

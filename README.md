# digitallinguistics.io

This repository contains the source code for the Digital Linguistics (DLx) website.

## Changes to `semantic-ui-less`

* Rename `theme.config.example` > `theme.config`

* Make the following changes to `semantic-ui-less/themes/default/globals/site.variables`:

```
@fontName          : var(--font);
@fontSmoothing     : antialiased;

@headerFont        : var(--font);
@pageFont          : var(--font);
```

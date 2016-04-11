# Digital Linguistics (DLx)
Digital Linguistics (DLx) is the science of the digital storage, representation, manipulation, and dissemination of linguistic data. This repository contains the source code for the DLx homepage.

## Project Workflow
The website does not use release management, just milestones. Each milestone is named for the main functionality it changes or adds.

## Website Architecture
(dlx = digitallinguistics)

Repo            | Domain                    | Description
--------------- | ------------------------: | -----------
`dlx-org`       |       [`www.dlx.org`][1]  | The main site, consisting of mostly informational content. Also serves as a router to the different subdomains (e.g. `dlx.org/spec` --> `spec.dlx.org`). Azure: `dlx`.
`dlx-login`     |     [`login.dlx.org`][17] | Single sign-on for any DLx sites or apps. Also handles OAuth requests and JWTs.
`dlx-blog`      |      [`blog.dlx.org`][2]  | The DLx blog.
`dlx-spec`      |      [`spec.dlx.org`][3]  | The specifications for the DLx data format.
`dlx-api`       |       [`api.dlx.org`][4]  | The API.
`dlx-app`       |       [`app.dlx.org`][5]  | The client-side app.
`dlx-dev`       | [`developer.dlx.org`][6]  | Information for developers. Much of the documentation for DLx projects will also be redirected to the relevant GitHub pages at `digitallinguistics.github.io/{project}`.
`dlx-writer`    |    [`writer.dlx.org`][7]  | Platform for writing linguistic publications in HTML, using live DLx data.
`dlx-tools`     |     [`tools.dlx.org`][8]  | A variety of standalone tools and apps.
`dlx-core`      |       [(GitHub, npm)][16] | The core models and views for DLx projects, downloadable/installable from GitHub/npm. This is just an npm package that bundles the core DLx objects into a single package.
`dlx-js`        |       [(GitHub, npm)][9]  | Client-side JavaScript SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
`dlx-node`      |       [(GitHub, npm)][10] | Server-side Node SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
`dlx-py`        |       [(GitHub, npm)][11] | Python SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
`sandbox`       |   [`sandbox.dlx.org`][13] | An area for DLx contributors to play around in.
`assets`        |       [`cdn.dlx.org`][14] | Assets shared across projects.
`data`          |              [(data)][15] | Sample and temporary data. Should eventually become obsolete once the database is up and running.

[1]:  http://digitallinguistics.org/
[2]:  http://blog.digitallinguistics.org/
[3]:  http://spec.digitallinguistics.org/
[4]:  https://api.digitallinguistics.org/
[5]:  http://app.digitallinguistics.org/
[6]:  http://developer.digitallinguistics.org/
[7]:  http://writer.digitallinguistics.org/
[8]:  http://tools.digitallinguistics.org/
[9]:  https://github.com/digitallinguistics/dlx-js/
[10]: https://github.com/digitallinguistics/dlx-node/
[11]: https://github.com/digitallinguistics/dlx-py/
[12]: http://dev.digitallinguistics.org/
[13]: http://sandbox.digitallinguistics.org/
[14]: https://github.com/digitallinguistics/assets/
[15]: https://github.com/digitallinguistics/data/
[16]: https://github.com/digitallinguistics/dlx-core/
[17]: https://login.digitallinguistics.org/
[18]: http://github.com/digitallinguistics/dlx-text

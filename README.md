# Digital Linguistics (DLx)
Digital Linguistics (DLx) is the science of the digital storage, representation, manipulation, and dissemination of linguistic data. This repository contains the source code for the DLx homepage.

## Project Workflow
The website does not use release management, just milestones. Each milestone is named for the main functionality it changes or adds.

## Website Architecture
(dlx = digitallinguistics)

Repo            | Domain                    | Description
--------------- | ------------------------: | -----------
`assets`        |        [`cdn.dlx.org`][1] | Assets shared across DLx projects.
`dlx-api`       |        [`api.dlx.org`][2] | The DLx database API.
`dlx-api-js`    |     [GitHub][3], [npm][4] | A JavaScript SDK for interacting with the DLx database.
`dlx-api-node`  |     [GitHub][5], [npm][6] | A Node.js SDK for interacting with the DLx database.
`dlx-api-py`    |     [GitHub][7], [npm][8] | A Python SDK for interacting with the DLx database.
`dlx-app`       |        [`app.dlx.org`][9] | The client-side app for managing linguistic data.
`dlx-blog`      |      [`blog.dlx.org`][10] | The DLx blog, hosted with Ghost.
`dlx-js`        |   [GitHub][11], [npm][12] | A JavaScript / Node.js library for working with linguistic data in DLx format.
`dlx-login`     |     [`login.dlx.org`][13] | Single sign-on for any DLx sites or apps. Also handles OAuth requests and issues API tokens (JWTs).
`dlx-org`       |       [`www.dlx.org`][14] | The main site, consisting of mostly informational content. Also serves as a router to the different subdomains (e.g. `dlx.org/blog` --> `blog.dlx.org`). Azure: `dlx`.
`dlx-org`       | [`developer.dlx.org`][15] | Information for developers. Much of the documentation for DLx projects will also be redirected to the relevant GitHub pages at [https://digitallinguistics.github.io/{project}]().
`dlx-py`        |   [GitHub][16], [npm][17] | A Python library for working with linguistic data in DLx format.
`dlx-spec`      |   [`schemas.dlx.org`][18] | The specifications for the DLx data format.
`dlx-writer`    |    [`writer.dlx.org`][19] | Platform for writing linguistic publications in HTML, using live DLx data.

[1]:  https://github.com/digitallinguistics/assets
[2]:  https://digitallinguistics.github.io/dlx-api
[3]:  https://digitallinguistics.github.io/dlx-api-js
[4]:  https://www.npmjs.com/package/dlx-js
[5]:  https://digitallinguistics.github.io/dlx-api-node
[6]:  https://www.npmjs.com/package/dlx-api-node
[7]:  https://digitallinguistics.github.io/dlx-api-py
[8]:  https://www.npmjs.com/package/dlx-api-py
[9]:  https://app.digitallinguistics.org
[10]: http://blog.digitallinguistics.org
[11]: https://digitallinguistics.github.io/dlx-js
[12]: https://www.npmjs.com/package/dlx-js
[13]: https://login.digitallinguistics.org
[14]: http://digitallinguistics.org
[15]: http://developer.digitallinguistics.org
[16]: https://digitallinguistics.github.io/dlx-py
[17]: https://www.npmjs.com/package/dlx-py
[18]: http://schemas.digitallinguistics.org
[19]: https://writer.digitallinguistics.org

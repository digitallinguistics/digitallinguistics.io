# Digital Linguistics (DLx)
Digital Linguistics (DLx) is the science of the digital storage, representation, manipulation, and dissemination of linguistic data.

## Project Architecture
(dlx = digitallinguistics)

Repo            | Domain                    | Description
--------------- | ------------------------: | -----------
`dlx-org`       |       [`www.dlx.org`][1]  | The main site, consisting of mostly informational content. Also serves as a router to the different subdomains (e.g. `dlx.org/spec` --> `spec.dlx.org`). Azure: `dlx`.
`(dlx-org)`     |      [`blog.dlx.org`][2] | The DLx blog.
`dlx-spec`      |      [`spec.dlx.org`][3]  | The specifications for the DLx data format.
`dlx-api`       |       [`api.dlx.org`][4]  | The API endpoints and authorization.
`dlx-app`       |       [`app.dlx.org`][5]  | The client-side app.
`(dlx-org)`     | [`developer.dlx.org`][6]  | Information for developers.
`dlx-writer`    |    [`writer.dlx.org`][7]  | Platform for writing linguistic publications in HTML, using live DLx data.
`dlx-tools`     |     [`tools.dlx.org`][8]  | A variety of standalone tools and apps.
`dlx-{project}` |  `{project}.dlx.org`      | Any other major tools/initiatives we undertake.
`dlx-js`        |       [(GitHub, npm)][9]  | JavaScript SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
`dlx-node`      |       [(GitHub, npm)][10] | Node SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
`dlx-py`        |       [(GitHub, npm)][11] | Python SDK for accessing the DLx API, downloadable/installable from GitHub/npm.
 (any)          |       [`dev.dlx.org`][12] | An Azure Web Apps account for server-side testing.
`sandbox`       |   [`sandbox.dlx.org`][13] | An area for us to play around in.
`assets`        |              [(none)][14] | Assets shared across projects.
`data`          |              [(data)][15] | Sample and temporary data. Should eventually become obsolete once the database is up and running.

[1]:  http://digitallinguistics.org/
[2]: http://blog.digitallinguistics.org/
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

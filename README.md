# Digital Linguistics (DLx)
Digital Linguistics (DLx) is the science of the digital storage, representation, manipulation, and dissemination of linguistic data.

## Project Architecture
(dlx = digitallinguistics)

Repo            | Domain                    | Description
--------------- | ------------------------: | -----------
`dlx-org`       |       [`www.dlx.org`][1]  | The main site, consisting of mostly informational content. Also serves as a router to the different subdomains (e.g. `dlx.org/spec` --> `spec.dlx.org`).
`dlx-spec`      |      [`spec.dlx.org`][2]  | The specifications for the DLX data format.
`dlx-api`       |       [`api.dlx.org`][3]  | The API endpoints and authorization.
`dlx-app`       |       [`app.dlx.org`][4]  | The client-side app.
`dlx-dev`       | [`developer.dlx.org`][5]  | Information for developers.
`dlx-writer`    |    [`writer.dlx.org`][6]  | Platform for writing linguistic publications in HTML, using live DLX data.
`dlx-tools`     |     [`tools.dlx.org`][7]  | A variety of standalone tools and apps.
`dlx-{project}` |  `{project}.dlx.org`      | Any other major tools/initiatives we undertake.
`dlx-js`        |       [(GitHub, npm)][8]  | JavaScript SDK for accessing the DLX API, downloadable/installable from GitHub/npm.
`dlx-py`        |       [(GitHub, npm)][9] | Python SDK for accessing the DLX API, downloadable/installable from GitHub/npm.
`sandbox`       |   [`sandbox.dlx.org`][10] | An area for us to play around in.
`assets`        |              [(none)][11] | Assets shared across projects.
`data`          |              [(data)][12] | Sample and temporary data. Should eventually become obsolete once the database is up and running.

[1]:  http://digitallinguistics.org/
[2]:  http://spec.digitallinguistics.org/
[3]:  https://api.digitallinguistics.org/
[4]:  http://app.digitallinguistics.org/
[5]:  http://developer.digitallinguistics.org/
[6]:  http://writer.digitallinguistics.org/
[7]:  http://tools.digitallinguistics.org/
[8]:  https://github.com/digitallinguistics/dlx-js/
[9]:  https://github.com/digitallinguistics/dlx-py/
[10]: http://sandbox.digitallinguistics.org/
[11]: https://github.com/digitallinguistics/assets
[12]: https://github.com/digitallinguistics/data

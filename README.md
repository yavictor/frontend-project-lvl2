# frontend-project-lvl2
[![hexlet-check](https://github.com/yavictor/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/yavictor/frontend-project-lvl2/actions/workflows/hexlet-check.yml)

[![Node.js CI](https://github.com/yavictor/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/yavictor/frontend-project-lvl2/actions)

[![Code Climate](https://codeclimate.com/github/yavictor/frontend-project-lvl2/badges/gpa.svg)](https://codeclimate.com/github/yavictor/frontend-project-lvl2/maintainability)

[![Issue Count](https://codeclimate.com/github/yavictor/frontend-project-lvl2/badges/issue_count.svg)](https://codeclimate.com/github/yavictor/frontend-project-lvl2)

[![Test Coverage](https://api.codeclimate.com/v1/badges/a42983ea9e9db2238a78/test_coverage)](https://codeclimate.com/github/yavictor/frontend-project-lvl2/test_coverage)

### gendiff:

Command line interface util that can show difference between two configuration files in json and yaml format. Also it can show only parameters that chaged in configuration and generate json result of both configs.

### Install

For global install:
> composer global require yavictor/php_project2

For local use:
> composer global require yavictor/php_project2

Then istall depandencies:

> make install

# Show difference between two 'json' files

As "stylish" is default output:

> gendiff first.json second.json

same as

> gendiff --format stylish first.json second.json

[![asciicast](https://asciinema.org/a/PXv7IKbiH2lLtxgApKYNu6uZ9.svg)](https://asciinema.org/a/PXv7IKbiH2lLtxgApKYNu6uZ9)

# Show difference between two 'yml' files

[![asciicast](https://asciinema.org/a/zmZPN5zknY4W8qgg7nc68cOGG.svg)](https://asciinema.org/a/zmZPN5zknY4W8qgg7nc68cOGG)

# Show difference between two 'ini' files

[![asciicast](https://asciinema.org/a/8tynktIS4MeP3ZXgO0t3F04va.svg)](https://asciinema.org/a/8tynktIS4MeP3ZXgO0t3F04va)

# Show difference between two 'json' nested files, with default stylish output

[![asciicast](https://asciinema.org/a/cLQJFsVVzYurnm98bsWPQgpyY.svg)](https://asciinema.org/a/cLQJFsVVzYurnm98bsWPQgpyY)

# Show difference between same 'json' nested files, with plain output

[![asciicast](https://asciinema.org/a/b1ro1wnXQhOQw8hCiqAo237UX.svg)](https://asciinema.org/a/b1ro1wnXQhOQw8hCiqAo237UX)

# Show difference between same 'json' nested files, with json output, showing internal data representation

[![asciicast](https://asciinema.org/a/FAEWs2srH7F3qPhc2tazTUrk2.svg)](https://asciinema.org/a/FAEWs2srH7F3qPhc2tazTUrk2)

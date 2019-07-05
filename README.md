# Country Database

_Sections covered previously to come._


## Node's `fs` Module

- Node comes with many modules built in that don't need to be installed such as [`fs`](https://nodejs.org/api/fs.html) and [`path`](https://nodejs.org/api/path.html).
- You can include these modules as if they were installed npm packages.

```js
let fs = require('fs');
let path = require('path');
```

- We can see them **both** imported in `server/db/index.js`.
	- `fs` Lets us work with the filesystem on your hardrive. A filesystem stores files in a directory structure you know as simple files and folders on your computer.
	- `path` Allows us to generate paths as strings. The reasons we use it is to automatically account for OS specific differences such as the following relative paths generated from the `path` module between macOS / Linux and Windows that reference the `countries.json`:
		- **Windows:** `'server\\db\\countries.json`
		- **macOS / Linux:** `'server/db/countries.json'`
- `util.promisify()` returns a new function that uses `Promise` instead of callbacks.

### Steps

1. We want to read `countries.json` via the `fs` module now with the variable [`readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback). Use the following code for the first parameter.

```js
path.resolve('server/db/countries.json');
```



### Emergency Instructions

1. Add create link to navbar
1. Write new countries to JSON file

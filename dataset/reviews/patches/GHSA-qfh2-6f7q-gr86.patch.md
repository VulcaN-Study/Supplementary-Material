# Path of Sexstatic Package of Cross-Site Scripting Vulnerability

Changes to [Sexstatic Package](https://registry.npmjs.org/sexstatic/-/sexstatic-0.6.2.tgz):
- Replace Line 111 of File `sexstatic/lib/sexstatic/showdir.js` for this: `'<title>Index of ' + he.encode(pathname) + '</title>',`
- Replace Line 114 of File `sexstatic/lib/sexstatic/showdir.js` for this: `'<h1>Index of ' + he.encode(pathname) + '</h1>'`

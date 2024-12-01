# Introduction

A full-stack TypeScript rating application using modern tools.

# Usage

[Install Devbox](https://www.jetify.com/docs/devbox/installing_devbox/). On
Windows, install WSL2 as a prerequisite as mentioned in the
[installation instructions](https://www.jetify.com/docs/devbox/installing_devbox/?install-method=wsl).

(Windows only) - Pull down the project's git repository into WSL file system
instead of windows mounted file system (so do **not** place in directory
prefixed with `/mnt`). This will ensure hot reload watch for file changes works
and Deno/Fresh commands have fast performance. Suggested to put in something
like `~/github/rating/`.

Start the Devbox environment (in WSL shell for Windows):

```
devbox shell
```

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

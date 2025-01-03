# Introduction

The frontend for a prototype full-stack C#, Preact web application deployed on
Azure AKS using modern tools. This project primarily focuses on architectural
design, implementation, and tools that can be leveraged for enterprise-grade
applications.

The backend and infrastructure repository lives here:
https://github.com/CodingFlow/rating-service-dotnet

Tools and frameworks used by frontend:

- [Deno](https://deno.com/) - Successor to Node.js with built-in support for
  TypeScript.
- [Fresh](https://fresh.deno.dev/) - Web framework built for Deno using Preact
  and built-in support for server-side rendering.
- [Preact](https://preactjs.com/) - lightweight, high-performance alternative to
  React.
- [Devbox](https://www.jetify.com/devbox) - Ergonomic tool over
  [Nix](https://nixos.org/) to enable easily creating portable, isolated
  development environments.
- [Docker](https://www.docker.com/) - Container tool chain.

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

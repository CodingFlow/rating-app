# Set up the base image
FROM denoland/deno:alpine-2.6.4 AS build

# COPY --from=deno_bin /deno /usr/local/bin/deno

# RUN mkdir /var/deno_dir
# ENV DENO_DIR=/var/deno_dir

ARG GIT_REVISION
# ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV DENO_DEPLOYMENT_ID=h

ARG APP_URL_BASE_PATH
ENV APP_URL_BASE_PATH=${APP_URL_BASE_PATH}

WORKDIR /app

COPY . .

RUN deno task build
# RUN deno cache _fresh/server.js

# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache main.ts

EXPOSE 8000

CMD ["serve", "-A", "_fresh/server.js"]

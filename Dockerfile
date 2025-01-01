# Set up the base image
FROM denoland/deno:bin-2.0.6 AS deno_bin

FROM debian:bookworm-20241111-slim AS deno_runtime

COPY --from=deno_bin /deno /usr/local/bin/deno

RUN mkdir /var/deno_dir
ENV DENO_DIR=/var/deno_dir

COPY . .

RUN deno task build

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

EXPOSE 3000

CMD ["deno", "run", "-A", "main.ts"]

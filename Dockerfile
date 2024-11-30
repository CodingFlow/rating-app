# Set up the base image
FROM public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 AS aws-lambda-adapter
FROM denoland/deno:bin-2.0.6 AS deno_bin
FROM debian:bookworm-20241111-slim AS deno_runtime

COPY --from=aws-lambda-adapter /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=deno_bin /deno /usr/local/bin/deno

# ENV PORT=8000
EXPOSE 8080

RUN mkdir /var/deno_dir
ENV DENO_DIR=/var/deno_dir

# Copy the function code
WORKDIR "/var/task"
COPY . /var/task

RUN deno task build

CMD ["deno", "run", "-A", "main.ts"]

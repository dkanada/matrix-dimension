FROM node:12.16.1-alpine AS builder

WORKDIR /home/node/matrix-dimension

RUN mkdir -p /home/node/matrix-dimension

COPY . /home/node/matrix-dimension

RUN npm clean-install && \
    node /home/node/matrix-dimension/scripts/convert-newlines.js /home/node/matrix-dimension/docker-entrypoint.sh  && \
    NODE_ENV=production npm run-script build

FROM node:12.16.1-alpine

WORKDIR /home/node/matrix-dimension

COPY --from=builder /home/node/matrix-dimension/docker-entrypoint.sh /

COPY --from=builder /home/node/matrix-dimension/build /home/node/matrix-dimension/build
COPY --from=builder /home/node/matrix-dimension/package* /home/node/matrix-dimension/
COPY --from=builder /home/node/matrix-dimension/config /home/node/matrix-dimension/config

RUN npm clean-install --production

VOLUME ["/data"]

# Ensure the database doesn't get lost to the container
ENV DIMENSION_DB_PATH=/data/dimension.db

EXPOSE 8184

ENTRYPOINT ["/docker-entrypoint.sh"]


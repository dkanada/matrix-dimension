FROM node:12.16.1-alpine AS build

WORKDIR /home/node/matrix-dimension

COPY . /home/node/matrix-dimension

RUN npm clean-install
RUN node /home/node/matrix-dimension/scripts/convert-newlines.js /home/node/matrix-dimension/docker-entrypoint.sh
RUN NODE_ENV=production npm run-script build

FROM node:12.16.1-alpine

WORKDIR /home/node/matrix-dimension

COPY --from=build /home/node/matrix-dimension/docker-entrypoint.sh /

COPY --from=build /home/node/matrix-dimension/build /home/node/matrix-dimension/build
COPY --from=build /home/node/matrix-dimension/package* /home/node/matrix-dimension/
COPY --from=build /home/node/matrix-dimension/config /home/node/matrix-dimension/config

RUN npm clean-install --production

VOLUME ["/data"]

ENV DIMENSION_DB_PATH=/data/dimension.db

EXPOSE 8184

ENTRYPOINT ["/docker-entrypoint.sh"]

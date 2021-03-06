FROM node:12.16.1-alpine AS build

WORKDIR /home/node/matrix-dimension

COPY . .

RUN npm clean-install
RUN NODE_ENV=production npm run-script build

FROM node:12.16.1-alpine

WORKDIR /home/node/matrix-dimension

COPY --from=build /home/node/matrix-dimension/build /home/node/matrix-dimension/build
COPY --from=build /home/node/matrix-dimension/package* /home/node/matrix-dimension/
COPY --from=build /home/node/matrix-dimension/config /home/node/matrix-dimension/config

RUN npm clean-install --production
RUN ln -sf /data/config.yaml config/production.yaml

VOLUME ["/data"]

ENV NODE_ENV=production
ENV DIMENSION_DB_PATH=/data/dimension.db

EXPOSE 8184

CMD ["node", "build/app/index.js"]

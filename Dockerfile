#STEP 1
FROM node:18-alpine as build-step

WORKDIR /app

COPY . /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

RUN yarn install --frozen-lockfile
# Generate commands to run prisma migrate
RUN yarn prisma generate
RUN yarn prisma migrate deploy --preview-feature

RUN yarn build


# Remove node_modules and install only production dependencies
RUN rm -rf node_modules

FROM node:18-alpine as production-step
COPY --from=build-step /app /app

EXPOSE 3000
CMD ["yarn", "start"]
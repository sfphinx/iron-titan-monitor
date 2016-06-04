FROM alpine

ENTRYPOINT ["node", "monitor.js"]
CMD ["/data/villages.dat"]

WORKDIR /opt

COPY . /opt/

RUN apk add --update nodejs && npm install --production

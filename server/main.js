import { Meteor } from "meteor/meteor";
import { DomainsCollection } from "../imports/api/domain/DomainCollections";
import { HTTP } from "meteor/http";

Meteor.methods({
  getData: function (params) {
    this.unblock();
    try {
      const result = HTTP.call("GET", process.env.WHOIS_API, {
        params: {
          apiKey: process.env.WHOIS_KEY,
          domainName: params.domainName,
        },
      });
      return result.data.DomainInfo.domainAvailability;
    } catch (e) {
      // Handle the error
      console.log("error: ", e);
      return false;
    }
  },
});

async function insertDomain({ url }) {
  await DomainsCollection.insertAsync({
    url,
    createdAt: new Date(),
  });
}

Meteor.startup(() => {
  process.env.WHOIS_KEY = "at_lrhV1Xux9W77E88StAJO30EpUU5n5";
  process.env.WHOIS_API = "https://domain-availability.whoisxmlapi.com/api/v1";
  // If the Links collection is empty, add some data.
  if (DomainsCollection.find().count() === 0) {
    insertDomain({
      url: "www.anddreluis.com.br",
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish("domains", function () {
    return DomainsCollection.find();
  });
});

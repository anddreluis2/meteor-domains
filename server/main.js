import { Meteor } from "meteor/meteor";
import { DomainsCollection } from "../imports/api/domain/DomainCollections";

async function insertDomain({ url }) {
  await DomainsCollection.insertAsync({
    url,
    createdAt: new Date(),
  });
}

Meteor.startup(() => {
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

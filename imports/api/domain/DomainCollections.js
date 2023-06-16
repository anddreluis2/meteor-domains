import { Mongo } from "meteor/mongo";

export const DomainsCollection = new Mongo.Collection("domains");

DomainsCollection.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc, fieldNames, modifier) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
});

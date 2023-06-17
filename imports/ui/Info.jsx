import React, { useEffect } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { DomainsCollection } from "../api/domain/DomainCollections";
import { DomainForm } from "../ui/DomainForm";
import { Domains } from "./Domains";
import { FaTrash } from "react-icons/fa";

export const Info = () => {
  const isLoading = useSubscribe("domains");

  const domains = useTracker(() =>
    DomainsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

  const deleteDomain = ({ _id }) => DomainsCollection.remove(_id);

  useEffect(() => {
    console.log(domains);
  }, [domains]);

  if (isLoading()) {
    return <div className="">Loading...</div>;
  }

  return (
    <div>
      <DomainForm />
      <ul>
        {domains.map((domain) => (
          <Domains
            key={domain._id}
            domain={domain}
            onDeleteClick={deleteDomain}
          />
        ))}
      </ul>
    </div>
  );
};

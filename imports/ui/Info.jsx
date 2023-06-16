import React, { useEffect } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { DomainsCollection } from "../api/domain/DomainCollections";
import { DomainForm } from "../ui/DomainForm";

export const Info = () => {
  const isLoading = useSubscribe("domains");

  const domains = useTracker(() =>
    DomainsCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );

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
          <li key={domain._id}>{domain.url}</li>
        ))}
      </ul>
    </div>
  );
};

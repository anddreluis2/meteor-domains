import React, { useEffect } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { DomainsCollection } from "../api/domain/DomainCollections";
import { DomainForm } from "../ui/DomainForm";
import { Domains } from "./Domains";
import { LoadingSpinner } from "./LoadingSpinner";

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
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!domains.length) {
    return (
      <>
        <DomainForm />
        <div className="flex justify-center p-10 text-gray-700">
          Insert the domains that you want to save
        </div>
      </>
    );
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

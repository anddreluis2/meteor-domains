import React, { useState } from "react";
import { DomainsCollection } from "../api/domain/DomainCollections";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./LoadingSpinner";

export const DomainForm = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!domain) return;

    Meteor.call("getData", { domainName: domain }, (err, res) => {
      if (err) {
        alert("Error", err);
      } else {
        if (res === "AVAILABLE") {
          DomainsCollection.insert({
            url: domain.trim(),
            createdAt: new Date(),
          });
          toast.success("Domain successfully added");
        } else {
          toast.error("This domain is unavailable");
        }
      }
      setDomain("");
      setLoading(false);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-10 flex gap-2 border-black w-full"
    >
      <input
        className="rounded-lg shadow-inactive p-2 w-full"
        onChange={(e) => setDomain(e.target.value)}
        type="text"
        placeholder="Type to add new domains"
      />

      <button
        className="w-1/5 flex justify-center text-gray-700 items-center shadow-inactive hover:border-black hover:border rounded-lg"
        type="submit"
      >
        {loading ? <LoadingSpinner /> : "Submit"}
      </button>
    </form>
  );
};

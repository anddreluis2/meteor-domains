import React, { useState } from "react";
import { DomainsCollection } from "../api/domain/DomainCollections";

export const DomainForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) return;

    DomainsCollection.insert({
      url: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        className="border-black rounded-lg"
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type to add new domains"
      />

      <button className="border-black rounded-lg p-3" type="submit">
        Add domain
      </button>
    </form>
  );
};

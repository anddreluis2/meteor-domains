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
    <form
      onSubmit={handleSubmit}
      className="h-10 flex gap-2 border-black w-full"
    >
      <input
        className="rounded-lg p-2 w-full"
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Type to add new domains"
      />

      <button className="w-1/5 border rounded-lg" type="submit">
        Add domain
      </button>
    </form>
  );
};

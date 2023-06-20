import React from "react";
import { FaTrash } from "react-icons/fa";

export const Domains = ({ domain, onDeleteClick }) => {
  return (
    <ul className="p-2 first:py-4">
      <li className="text-gray-700 flex justify-between hover:text-black text-lg">
        <a href={`//${domain}`}>{domain.url}</a>
        <button
          onClick={() => onDeleteClick(domain)}
          className="text-gray-500 hover:text-black hover:cursor-pointer"
        >
          <FaTrash />
        </button>
      </li>
    </ul>
  );
};

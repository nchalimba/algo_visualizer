import React from "react";
import CreateIndex from "./CreateIndex";
import DeleteIndex from "./DeleteIndex";

const IndexingTab: React.FC = () => {
  return (
    <div className="p-4 flex flex-col gap-6">
      <CreateIndex />
      <div className="bg-opacity-5 border-alert p-4 pt-0 border-2 rounded border-opacity-50">
        <p className="font-bold text-alert mb-2">Danger Zone</p>
        <DeleteIndex />
      </div>
    </div>
  );
};

export default IndexingTab;

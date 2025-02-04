"use client";
import React, { useState } from "react";
import RagStatus from "../components/chat/RagStatus";
import InfoTab from "../components/settings/InfoTab";
import IndexingTab from "../components/settings/IndexingTab";
import { AuthProvider } from "../context/AuthContext";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <AuthProvider>
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-2 border-b border-retroDark-200">
          <h1 className="text-xl text-retroText.primary font-retro">
            Settings
          </h1>
          <RagStatus />
        </div>
        {/* Tabs */}
        <div className="flex space-x-4 p-4">
          <button
            className={`py-2 px-4 rounded-lg ${
              activeTab === "info" ? "bg-retroDark-200" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${
              activeTab === "indexing" ? "bg-retroDark-200" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("indexing")}
          >
            Indexing
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "info" && <InfoTab />}
          {activeTab === "indexing" && <IndexingTab />}
        </div>
      </div>
    </AuthProvider>
  );
};

export default SettingsPage;

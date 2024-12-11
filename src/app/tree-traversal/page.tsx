"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/treeTraversal/Navbar";
import Node from "../components/treeTraversal/Node";
import VisitedArray from "../components/treeTraversal/VisitedArray";
import { TreeTraversalSettings } from "../types";

const TreeTraversalPage = () => {
  const [settings, setSettings] = useState<TreeTraversalSettings>({
    algo: "DFS", // Default algorithm
    delay: 500, // Default delay
    length: 3, // Default tree length
  });

  const [tree, setTree] = useState<number[]>([0]);
  const [visitedArray, setVisitedArray] = useState<number[]>([]);

  // Update tree when the length changes
  useEffect(() => {
    const newTree = Array.from(
      { length: settings.length },
      (_, index) => index
    );

    setTree(newTree);
  }, [settings.length]);

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Head>
        <title>Tree Traversal Visualizer</title>
        <meta
          name="description"
          content="Visualizes tree traversal algorithms"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        settings={settings}
        setSettings={setSettings}
        setTree={setTree}
        setVisitedArray={setVisitedArray}
      />
      <div className="flex justify-center items-center pt-10">
        <Node tree={tree} index={0} />
      </div>
      <VisitedArray array={visitedArray} />
    </div>
  );
};

export default TreeTraversalPage;

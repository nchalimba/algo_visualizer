"use client";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import Navbar from "../components/sorting/Navbar";
import SortingElements from "../components/sorting/SortingElements";
import { SortingElement, SortingSettings } from "../types";

const defaultSettings: SortingSettings = {
  algoType: null,
  length: 25,
  delay: 5,
};

const SortingPage = () => {
  const [settings, setSettings] = useState<SortingSettings>(defaultSettings);
  const [elements, setElements] = useState<SortingElement[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const numbers = Array.from({ length: settings.length }, () => ({
      value: Math.floor(Math.random() * 100),
      isActive: false,
    }));
    setElements(numbers);
  }, [settings.length, forceUpdate]);

  return (
    <div className="h-screen md:h-[calc(100vh-48px)] flex flex-col">
      <Head>
        <title>Sorting Visualizer</title>
        <meta name="description" content="Visualizes sorting algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        settings={settings}
        setSettings={setSettings}
        setForceUpdate={setForceUpdate}
        elements={elements}
        setElements={setElements}
      />
      <SortingElements elements={elements} />
    </div>
  );
};

export default SortingPage;

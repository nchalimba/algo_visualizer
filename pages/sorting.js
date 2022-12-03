import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/sorting/Navbar';
import SortingElements from '../components/sorting/SortingElements';

const defaultSettings = {
  algoType: 'merge_sort',
  length: 25,
  delay: 5,
};
const SortingContainer = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [elements, setElements] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const numbers = [];
    for (let i = 0; i < settings.length; i++) {
      numbers.push(Math.floor(Math.random() * 500));
    }
    setElements(numbers);
  }, [settings.length, forceUpdate]);

  return (
    <div>
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

export default SortingContainer;

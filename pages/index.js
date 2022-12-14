import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const features = [
    {
      title: 'Sorting',
      link: '/sorting',
      description: (
        <p>
          Sorts a set of bars, utilizing <b>Merge Sort</b>,{' '}
          <b>Insertion Sort</b>, <b>Quick Sort</b> and <b>Heap Sort</b>
        </p>
      ),
    },
    {
      title: 'Pathfinding',
      link: '/pathfinding',
      description: (
        <p>
          Calculates the shortest path between two nodes within a grid,
          utilizing <b>Breadth-First Search</b>,{' '}
          <b>Dijkstra&apos;s Algorithm</b> and <b>A* Search</b>
        </p>
      ),
    },
    {
      title: 'Tree Traversal',
      link: '/treeTraversal',
      description: (
        <p>
          Traverses the nodes of a complete binary tree, utilizing{' '}
          <b>Inorder Traversal</b>, <b>Postorder Traversal</b>,{' '}
          <b>Preorder Traversal</b> and <b>Level Order Traversal</b>
        </p>
      ),
    },
  ];
  return (
    <div>
      <Head>
        <title>Algo Visualizer</title>
        <meta name="description" content="Visualizes important algorithms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>Algorithm Visualizer</h1>

        <p className={styles.description}>
          This app enables you to visualize a set of important algorithms
        </p>
        <div className={styles.features}>
          {features.map((feature, key) => (
            <Link href={feature.link} key={key} className={styles.featureCard}>
              <h2 className={styles.featureTitle}>{feature.title}</h2>
              <div className={styles.featureDescription}>
                {feature.description}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const sections = [
  {
    title: "Sorting Algorithms",
    description:
      "Visualize and interact with various sorting algorithms like Insertion Sort, Merge Sort, and more!",
    link: "/sorting",
  },
  {
    title: "Pathfinding",
    description:
      "Dive into the world of pathfinding algorithms, including Dijkstra’s and A*.",
    link: "/pathfinding",
  },
  {
    title: "Tree Traversal",
    description:
      "Visualize tree traversal algorithms like Preorder, Inorder, and Postorder traversal.",
    link: "/tree-traversal",
  },
];

export default function Home() {
  return (
    <div className="bg-retroDark-900 text-retroText-primary font-retro min-h-screen flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12">
        <h1 className="lg:text-6xl text-3xl font-extrabold text-retroText-accent mb-4 animate__animated animate__fadeIn">
          Welcome to the DSA Visualizer
        </h1>
        <p className="lg:text-xl text-lg text-retroText-light mb-6">
          Choose your path and start exploring the world of data structures and
          algorithms!
        </p>
        <Link
          href="/sorting"
          className="bg-retroDark-accent text-retroDark-100 py-3 px-6 rounded-full lg:text-2xl text-xl hover:bg-retroDark-accent-hover transition duration-300 ease-in-out flex items-center gap-2"
        >
          <FaPlay className="lg:text-xl text-lg" />
          Start Visualizing
        </Link>
      </header>

      <section className="flex flex-col lg:flex-row gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className="w-full lg:w-1/3 text-center p-8 bg-retroDark-700 rounded-xl shadow-lg transform transition-all hover:scale-105"
          >
            <h2 className="lg:text-3xl text-2xl font-bold mb-4 text-retroText-accent">
              {section.title}
            </h2>
            <p className="lg:text-lg text-md text-retroText-light mb-6">
              {section.description}
            </p>
            <Link
              href={section.link}
              className="bg-retroDark-accent text-retroDark-100 py-2 px-4 rounded-full lg:text-xl text-lg flex items-center gap-2 justify-center"
            >
              Explore {section.title}
              <FaArrowRight className="lg:text-xl text-lg" />
            </Link>
          </div>
        ))}
      </section>

      <footer className="mt-12 text-center">
        <p className="lg:text-lg text-md text-retroText-light">
          Built with love and retro vibes! 🚀
        </p>
      </footer>
    </div>
  );
}

# AlgoViz

## Description

Welcome to **AlgoViz**! 🎉 This is an interactive web app where you can explore and visualize key algorithms in action! Whether you're diving into sorting, pathfinding, or tree traversal, this tool brings algorithms to life with dynamic visuals and animations. Plus, it’s now even smarter with the **AI Assistant 🤖** that can help you with all your algorithm-related questions! 🎉

🚀 **Live Demo**: [Visit AlgoViz](https://algoviz.abubeker.com/)

---

## Technologies

This app uses the latest web technologies to deliver a smooth and engaging experience:

- **React**: For building beautiful user interfaces.
- **Next.js 15**: The backbone for server-side rendering and routing.
- **Tanstack Query**: For efficient data fetching and state management.
- **TailwindCSS**: For sleek, modern UI design.

---

## Features

### Sorting Algorithms 🟦➡️

Visualize popular sorting algorithms with smooth, dynamic animations! Choose from:

- **Merge Sort**
- **Insertion Sort**
- **Quick Sort**
- **Heap Sort**

### Pathfinding Algorithms 🟦➡️🟥

Find the shortest path between nodes using different algorithms, and explore the new **random maze generation**:

- **Breadth-First Search (BFS)**
- **Dijkstra's Algorithm**
- **A\* Search**
- **Prim's Algorithm** for generating random mazes 🎮

### Tree Traversal 🌲➡️

Explore various tree traversal methods, including:

- **Inorder Traversal**
- **Preorder Traversal**
- **Postorder Traversal**
- **Level Order Traversal**

### New AI Assistant 🤖

The AI Assistant is here to help! You can now chat with the assistant for instant explanations of algorithms, code examples, and much more. It’s like having a personal tutor on standby. 🎓

### Settings Page ⚙️

Access the **Settings Page** to view technical details about the AI and, if you're an admin, manage the sources it uses to generate responses.

---

## Backend

The AI Assistant and Settings Page rely on a backend to provide functionality. You can find the backend source code here:  
**GitHub**: [dsa_rag Backend](https://github.com/nchalimba/dsa_rag)  
**Demo**: [Backend Demo](https://www.dsa-rag.api.abubeker.com/)

---

## Running Locally

Want to run the project on your machine? Here's how:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. For the AI Assistant 🤖 and Settings Page ⚙️, you'll need to set up the backend:

- In your `.env` file, add the API URL (take inspiration from `env.example`).
- If you don't have a local backend running, you can use the demo backend URL as the `NEXT_PUBLIC_API_URL` in your `.env` file: `https://www.dsa-rag.api.abubeker.com/`.

4. Run the app:

   ```bash
   npm run dev
   ```

5. Enjoy the app at `http://localhost:3000!` 🎉

## Contributing

I’d love your help! If you'd like to improve the visualizations or add new algorithms, feel free to fork the repo and open a pull request.

---

## License

This project is licensed under the [MIT License](./LICENSE).

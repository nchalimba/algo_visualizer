import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;

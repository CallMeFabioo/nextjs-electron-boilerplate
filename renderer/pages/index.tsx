import { useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => {
  useEffect(() => {
    // add a listener to 'message' channel
    global.api.receive('fromMain', (args) => {
      alert(args);
    });

    return () => {
      global.api.disconnect('fromMain');
    };
  }, []);

  const onSayHiClick = () => {
    global.api.send('toMain', 'hi from next');
  };

  return (
    <Layout title="Home | Next.js + TypeScript + Electron Example">
      <h1>Hello Next.js 👋</h1>
      <button onClick={onSayHiClick}>Say hi to electron</button>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import { NextPageWithLayout } from './_app';
import { getProfile } from '@/api-services/user.service';

const Home: NextPageWithLayout = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const responseData = await getProfile();
      if (responseData) {
        setUser(responseData);
        router.push('/');
      } else {
        router.push('/login');
      }
    };
    fetchUser();
  }, []);

  return (
    <Layout>
      <p>Welcome to dashboard</p>
    </Layout>
  );
};

export default Home;

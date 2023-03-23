import Layout from '@/components/layout';
import React, { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';

const AdminPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="">Admin Page</div>
    </>
  );
};

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default AdminPage;

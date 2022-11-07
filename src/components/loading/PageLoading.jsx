import React from 'react';
import ReactLoading from 'react-loading';

const PageLoading = ({ type, color }) => {
  return (
    <>
      <ReactLoading type={type} color={color} height={100} width={100} />
    </>
  );
};

export default PageLoading;

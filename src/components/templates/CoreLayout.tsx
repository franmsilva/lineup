import React, { FC } from 'react';
import { HEADER_PROPS } from './__mocks__';
import Header from '../Header';
import Footer from '../Footer';
import { Container, createStyles } from '@mantine/core';

const useStyles = createStyles({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
});

const CoreLayout: FC = ({ children }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.pageContainer}>
      <Header {...HEADER_PROPS} />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default CoreLayout;

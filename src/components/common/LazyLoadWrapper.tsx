import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Box, Skeleton } from '@mui/material';

interface LazyLoadWrapperProps {
  children: React.ReactElement; 
  placeholderHeight?: string | number; 
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({ 
  children, 
  placeholderHeight = 350
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    
    rootMargin: '200px 0px', 
  });

  return (
    <Box ref={ref} sx={{ minHeight: inView ? 'auto' : placeholderHeight, width: '100%' }}>
      {inView ? (
        children
      ) : (
        <Skeleton variant="rectangular" width="100%" height={placeholderHeight} />
      )}
    </Box>
  );
};
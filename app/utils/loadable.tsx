import React, { lazy, Suspense } from 'react';

const loadable = (importFunc: Parameters<typeof lazy>[0], { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;

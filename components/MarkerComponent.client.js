'use client';

import React, { useEffect } from 'react';
import markerSDK from '@marker.io/browser';

export default function MarkerComponent() {
  useEffect(() => {
    markerSDK.loadWidget({
      project: '65ef1bff6413c43b2fb5c388',
    });
  }, []);
  
  return null;
}
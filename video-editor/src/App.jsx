import React from 'react';
import { Timeline, Header, Preview } from './components';

function App() {
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <main className="flex flex-col gap-8 mx-8">
        <Preview />
        <Timeline />
      </main>
    </div>
  );
}

export default App;

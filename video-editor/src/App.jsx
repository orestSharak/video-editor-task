import { Header, Preview, Timeline, TooltipProvider } from './components';

function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen gap-6">
        <Header />
        <main className="flex-1 flex flex-col gap-8 min-h-0">
          <Preview />
          <Timeline />
        </main>
      </div>
    </TooltipProvider>
  );
}

export default App;

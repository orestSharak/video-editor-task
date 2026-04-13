import { Placeholder } from './Placeholder';
import { InfoBox } from './InfoBox';

export function Preview() {
  return (
    <section className="flex justify-center items-start w-full mb-10 px-6">
      <Placeholder />
      <InfoBox />
    </section>
  );
}

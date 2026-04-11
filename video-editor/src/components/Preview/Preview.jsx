import { Placeholder } from './Placeholder';
import { InfoBox } from './InfoBox';

export function Preview() {
  return (
    <section className="flex justify-center items-start gap-4">
      <Placeholder />
      <InfoBox />
    </section>
  );
}

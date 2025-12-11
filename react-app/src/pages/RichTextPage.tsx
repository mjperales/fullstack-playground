import RichText from '../components/RichText/RichText';
import { sampleContent } from '../components/RichText/sampleContent';

export default function RichTextPage() {
  return (
    <div>
      {sampleContent.map((node, index) => (
        <RichText node={node} key={index} />
      ))}
    </div>
  );
}

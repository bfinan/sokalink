// app/feed/page.tsx
import LinkTable from '../../components/LinkTable';

export default function FeedPage() {
  return (
    <div className="min-h-screen">
      <div style={{ padding: '2rem' }}>
        <LinkTable limit={100} /> {/* Use the updated LinkTable component */}
      </div>
    </div>
  );
}

// app/feed/page.tsx
import LinkTable from '../../components/LinkTable'; // Import the updated LinkTable
import Header from '../../components/Header'; // Import the new Header

export default function FeedPage() {
  return (
    <div className="min-h-screen">
      <Header /> {/* Use the new Header component */}
      <div style={{ padding: '2rem' }}>
        <LinkTable limit={100} /> {/* Use the updated LinkTable component */}
      </div>
    </div>
  );
}

// components/LinkTable.tsx
import { formatDistanceToNow } from 'date-fns';

interface Profile {
    display_name: string;
}

interface Link {
  id: string;
  url: string;
  title?: string;
  created_at: string;
  submitter?: string; // UUID referencing the profile
}

interface LinkTableProps {
  links: Link[];
  limit?: number;
}

export default function LinkTable({ links, limit }: LinkTableProps) {
  // If a limit is provided, slice the array to show only the first N links.
  const displayedLinks = limit ? links.slice(0, limit) : links;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {displayedLinks.map((link) => (
        <li key={link.id} style={{ marginBottom: '1rem' }}>
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#0070f3' }}
          >
            {link.title ? link.title : link.url}
          </a>
          <br />
          <small style={{ color: 'lightgray', marginLeft: '8px' }}>
            from {link.submitter ? link.submitter : "Brendan"} {formatDistanceToNow(new Date(link.created_at))} ago
          </small>
        </li>
      ))}
    </ul>
  );
}

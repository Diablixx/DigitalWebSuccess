interface SEOHeadProps {
  structuredData?: Record<string, unknown>[];
}

export default function SEOHead({ structuredData }: SEOHeadProps) {
  // In Next.js 15 App Router, we don't need this component
  // Metadata is handled by the metadata API in layout.tsx
  // But we can still return structured data if needed

  if (!structuredData) return null;

  return (
    <>
      {/* Structured Data */}
      {structuredData && structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
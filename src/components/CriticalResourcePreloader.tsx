export function CriticalResourcePreloader() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//avatars.githubusercontent.com" />
      
      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Resource hints */}
      <meta name="theme-color" content="#FF6600" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </>
  )
}

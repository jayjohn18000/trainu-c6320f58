const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Link classification patterns
const LINK_PATTERNS = {
  instagram: /instagram\.com|instagr\.am/i,
  tiktok: /tiktok\.com/i,
  youtube: /youtube\.com|youtu\.be/i,
  twitter: /twitter\.com|x\.com/i,
  facebook: /facebook\.com|fb\.com/i,
  booking: /calendly\.com|acuityscheduling\.com|booking|schedule|book|consult/i,
  stanStore: /stan\.store/i,
  gumroad: /gumroad\.com/i,
  stripe: /buy\.stripe\.com/i,
};

interface ClassifiedLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
  facebook?: string;
  booking?: string;
  products: string[];
  other: string[];
}

interface LinktreeData {
  displayName: string;
  bio: string;
  profileImageUrl: string;
  links: ClassifiedLinks;
  allLinks: Array<{ url: string; title: string }>;
}

function classifyLinks(links: Array<{ url: string; title: string }>): ClassifiedLinks {
  const classified: ClassifiedLinks = {
    products: [],
    other: [],
  };

  for (const link of links) {
    const url = link.url.toLowerCase();
    
    if (LINK_PATTERNS.instagram.test(url)) {
      classified.instagram = link.url;
    } else if (LINK_PATTERNS.tiktok.test(url)) {
      classified.tiktok = link.url;
    } else if (LINK_PATTERNS.youtube.test(url)) {
      classified.youtube = link.url;
    } else if (LINK_PATTERNS.twitter.test(url)) {
      classified.twitter = link.url;
    } else if (LINK_PATTERNS.facebook.test(url)) {
      classified.facebook = link.url;
    } else if (LINK_PATTERNS.booking.test(url) || LINK_PATTERNS.booking.test(link.title.toLowerCase())) {
      classified.booking = link.url;
    } else if (
      LINK_PATTERNS.stanStore.test(url) ||
      LINK_PATTERNS.gumroad.test(url) ||
      LINK_PATTERNS.stripe.test(url)
    ) {
      classified.products.push(link.url);
    } else {
      classified.other.push(link.url);
    }
  }

  return classified;
}

function parseLinktreeData(markdown: string, links: string[], metadata: any): LinktreeData {
  // Extract display name from metadata or markdown
  let displayName = metadata?.title || '';
  if (displayName.includes('|')) {
    displayName = displayName.split('|')[0].trim();
  }
  if (displayName.includes('-')) {
    displayName = displayName.split('-')[0].trim();
  }
  // Remove "Linktree" suffix if present
  displayName = displayName.replace(/\s*Linktree\s*/gi, '').trim();

  // Extract bio from metadata description or first paragraph of markdown
  let bio = metadata?.description || '';
  if (!bio && markdown) {
    // Try to find bio in markdown - usually the first substantial paragraph
    const lines = markdown.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('['));
    if (lines.length > 0) {
      bio = lines[0].trim();
    }
  }
  // Clean up bio
  bio = bio.replace(/\s+/g, ' ').trim();
  if (bio.length > 300) {
    bio = bio.substring(0, 297) + '...';
  }

  // Extract profile image from metadata
  const profileImageUrl = metadata?.ogImage || metadata?.image || '';

  // Parse links from markdown - find all markdown links
  const linkMatches: Array<{ url: string; title: string }> = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(markdown)) !== null) {
    const title = match[1];
    const url = match[2];
    // Filter out internal Linktree links and javascript links
    if (!url.includes('linktr.ee') && !url.startsWith('javascript:') && !url.startsWith('#')) {
      linkMatches.push({ url, title });
    }
  }

  // Also add any links from the links array that might not be in markdown
  for (const link of links) {
    if (!linkMatches.some(l => l.url === link) && !link.includes('linktr.ee')) {
      linkMatches.push({ url: link, title: '' });
    }
  }

  const classifiedLinks = classifyLinks(linkMatches);

  return {
    displayName,
    bio,
    profileImageUrl,
    links: classifiedLinks,
    allLinks: linkMatches,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'Linktree URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validate it's a Linktree URL
    if (!formattedUrl.includes('linktr.ee')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid Linktree URL (linktr.ee/username)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Linktree URL:', formattedUrl);

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown', 'links'],
        onlyMainContent: true,
        waitFor: 2000, // Wait for dynamic content
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Firecrawl API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data.error || 'Failed to scrape Linktree' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Access nested data structure
    const scrapeData = data.data || data;
    const markdown = scrapeData.markdown || '';
    const links = scrapeData.links || [];
    const metadata = scrapeData.metadata || {};

    console.log('Firecrawl response received, parsing data...');
    console.log('Metadata:', JSON.stringify(metadata));
    console.log('Links count:', links.length);

    const linktreeData = parseLinktreeData(markdown, links, metadata);

    console.log('Parsed Linktree data:', JSON.stringify({
      displayName: linktreeData.displayName,
      bio: linktreeData.bio?.substring(0, 50) + '...',
      linksFound: linktreeData.allLinks.length,
      classifiedLinks: {
        instagram: !!linktreeData.links.instagram,
        tiktok: !!linktreeData.links.tiktok,
        youtube: !!linktreeData.links.youtube,
        twitter: !!linktreeData.links.twitter,
        facebook: !!linktreeData.links.facebook,
        booking: !!linktreeData.links.booking,
        products: linktreeData.links.products.length,
        other: linktreeData.links.other.length,
      },
    }));

    return new Response(
      JSON.stringify({ success: true, data: linktreeData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error scraping Linktree:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape Linktree';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

'use client';

import { useState, useEffect } from 'react';
import type { Article } from '@/types';
import { summarizeArticle } from '@/ai/flows/summarize-article';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Loader2, Link as LinkIcon, Facebook, Twitter, Linkedin } from 'lucide-react';

type SocialLinkProps = {
  href: string;
  children: React.ReactNode;
  'aria-label': string;
}

function SocialShareLink({ href, children, 'aria-label': ariaLabel }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </a>
  );
}

export default function ArticleActions({ article }: { article: Article }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleSummarize = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const result = await summarizeArticle({ articleText: article.content.replace(/<[^>]*>?/gm, '') }); // Strip HTML for summary
      setSummary(result.summary);
    } catch (error) {
      console.error('Failed to summarize article:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not generate summary. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: 'Link Copied!',
        description: 'The article link has been copied to your clipboard.',
      });
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleSummarize} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90 flex-1">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          <span>{isLoading ? 'Generating...' : 'AI Summary'}</span>
        </Button>
        <div className="flex items-center justify-center gap-1 rounded-lg border p-1">
            <SocialShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} aria-label="Share on Facebook">
                <Facebook className="h-5 w-5" />
            </SocialShareLink>
            <SocialShareLink href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`} aria-label="Share on Twitter">
                <Twitter className="h-5 w-5" />
            </SocialShareLink>
            <SocialShareLink href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.excerpt)}`} aria-label="Share on LinkedIn">
                <Linkedin className="h-5 w-5" />
            </SocialShareLink>
             <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleCopyLink} aria-label="Copy link">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </div>
      </div>

      {summary && (
        <Card className="bg-background border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl">
              <Sparkles className="h-5 w-5 text-primary" />
              AI-Powered Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
      )}
      <Separator />
    </div>
  );
}

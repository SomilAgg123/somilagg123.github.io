// Snapshot of articles marked Read in Somil's Notion Reading Log, 23 November 2026.
// Public article metadata only. Favorites confirmed by Somil; no private notes.
const readingArticles = [
  {
    "name": "How To Give Your Agent Memory",
    "url": "https://www.langchain.com/blog/how-to-give-your-agent-memory",
    "detail": "LangChain",
    "source": "Read article"
  },
  {
    "name": "How to build a knowledge factory",
    "url": "https://x.com/hwchase17/status/2124181216719151585",
    "detail": "Harrison Chase / LangChain",
    "source": "Read post"
  },
  {
    "name": "The Bitter Lesson of Browser Agents",
    "url": "https://browser-use.com/posts/bitter-lesson-browser-agents",
    "detail": "Browser Use",
    "source": "Read article"
  },
  {
    "name": "New context engineering challenges in late 2026",
    "url": "https://www.langchain.com/blog/context-engineering-challenges-late-2026",
    "detail": "Harrison Chase / LangChain",
    "source": "Read article"
  },
  {
    "name": "Subagents are the biggest cause of AI failures",
    "url": "https://x.com/Alezander9/status/2118517491798606140",
    "detail": "Alexander Yue",
    "source": "Read post"
  },
  {
    "name": "How we built one harness for every Metaview agent",
    "url": "https://www.metaview.ai/resources/blog/how-we-built-one-harness-for-every-metaview-agent",
    "detail": "Metaview",
    "source": "Read article"
  },
  {
    "name": "The components of agent memory",
    "url": "https://www.anthropic.com/research/components-of-agent-memory",
    "detail": "Anthropic",
    "source": "Read article"
  },
  {
    "name": "I reverse-engineered Instinct's memory. Here's exactly how it works",
    "url": "https://x.com/DhravyaShah/status/2101745550752428340",
    "detail": "Dhravya Shah",
    "source": "Read post"
  },
  {
    "name": "Contextual embedding beyond the gold passage",
    "url": "https://www.perplexity.ai/hub/blog/contextual-embedding-beyond-the-gold-passage",
    "detail": "Perplexity",
    "source": "Read article"
  },
  {
    "name": "Multi-Agents: What's Actually Working",
    "url": "https://cognition.com/blog/multi-agents-working",
    "detail": "Cognition",
    "source": "Read article"
  },
  {
    "name": "Query-aware context compression for better snippets",
    "url": "https://www.perplexity.ai/hub/blog/query-aware-context-compression-for-better-snippets",
    "detail": "Perplexity",
    "source": "Read article"
  },
  {
    "name": "Don't Build Multi-Agents",
    "url": "https://cognition.com/blog/dont-build-multi-agents",
    "detail": "Cognition",
    "source": "Read article"
  },
  {
    "name": "How I work with Agents",
    "url": "https://x.com/thorstenball/status/2114386050638336082",
    "detail": "Thorsten Ball / Amp",
    "source": "Read post"
  },
  {
    "name": "The Algorithm is the Message",
    "url": "https://www.erasmatazz.com/library/game-design/the-algorithm-is-the-messag.html",
    "detail": "Chris Crawford",
    "source": "Read article"
  },
  {
    "name": "A Story About A Tree",
    "url": "https://www.raphkoster.com/games/essays/a-story-about-a-tree/",
    "detail": "Raph Koster",
    "source": "Read article"
  },
  {
    "name": "The Sane Asylum",
    "url": "https://colossus.com/article/sane-asylum-turbopuffer/",
    "detail": "Brie Wolfson / turbopuffer",
    "source": "Read article"
  },
  {
    "name": "Water Finds a Crack",
    "url": "https://www.designer-notes.com/game-developer-column-17-water-finds-a-crack/",
    "detail": "Soren Johnson",
    "source": "Read article"
  },
  {
    "name": "On choice architectures",
    "url": "https://www.raphkoster.com/2013/04/24/on-choice-architectures/",
    "detail": "Raph Koster",
    "source": "Read article"
  },
  {
    "name": "\"Hi @s\": How we built our company agent harness",
    "favorite": true,
    "url": "https://www.sanity.io/engineering/how-we-built-our-company-agent-harness",
    "detail": "Sanity",
    "source": "Read article"
  },
  {
    "name": "Building Laminar, Ramp's in-house agent harness",
    "favorite": true,
    "url": "https://engineering.ramp.com/post/building-laminar",
    "detail": "Ramp",
    "source": "Read article"
  },
  {
    "name": "Building effective agent automations",
    "url": "https://claude.dev/blog/building-effective-agent-automations/",
    "detail": "Anthropic",
    "source": "Read article"
  },
  {
    "name": "Free the models: harness design at the frontier",
    "favorite": true,
    "url": "https://replit.com/blog/free-the-models",
    "detail": "Replit",
    "source": "Read article"
  },
  {
    "name": "Improved token efficiency for longer agent runs",
    "url": "https://cursor.com/blog/improved-token-efficiency",
    "detail": "Cursor",
    "source": "Read article"
  },
  {
    "name": "Redesigning source control at Anthropic",
    "url": "https://www.anthropic.com/engineering/redesigning-source-control",
    "detail": "Anthropic",
    "source": "Read article"
  },
  {
    "name": "Five months treating bugs like patients and coding agents like a medical team",
    "url": "https://www.cockroachlabs.com/blog/experiment-running-hospital-code/",
    "detail": "Cockroach Labs",
    "source": "Read article"
  },
  {
    "name": "Why Software Factories Fail",
    "url": "https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md",
    "detail": "HumanLayer",
    "source": "Read article"
  },
  {
    "name": "How the Claude Code team does code review",
    "favorite": true,
    "url": "https://claude.dev/blog/solving-code-review-at-anthropic/",
    "detail": "Anthropic",
    "source": "Read article"
  },
  {
    "name": "Building shared workspaces for people and agents",
    "url": "https://www.perplexity.ai/hub/blog/building-shared-workspaces-for-people-and-agents",
    "detail": "Perplexity",
    "source": "Read article"
  },
  {
    "name": "Designing MCP Gateway: Uber's MCP management platform",
    "url": "https://www.uber.com/blog/designing-mcp-gateway/",
    "detail": "uber.com",
    "source": "Read article"
  },
  {
    "name": "Anatomy of a bug-fixing agent",
    "url": "https://huggingface.co/blog/huggingface/anatomy-of-a-bug-fixing-agent",
    "detail": "Hugging Face",
    "source": "Read article"
  }
];

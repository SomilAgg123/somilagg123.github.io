// Reading Log snapshot from 23 November 2026, with favorites added by Somil on 25 November.
// Public article metadata only. Favorites confirmed by Somil; no private notes.
const readingArticles = [
  {
    "name": "How To Give Your Agent Memory",
    "url": "https://www.langchain.com/blog/how-to-give-your-agent-memory",
    "detail": "LangChain",
    "source": "Read article",
    "category": "Knowledge factories"
  },
  {
    "name": "How to build a knowledge factory",
    "url": "https://x.com/hwchase17/status/2124181216719151585",
    "detail": "Harrison Chase / LangChain",
    "source": "Read post",
    "category": "Knowledge factories"
  },
  {
    "name": "The Bitter Lesson of Browser Agents",
    "url": "https://browser-use.com/posts/bitter-lesson-browser-agents",
    "detail": "Browser Use",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "New context engineering challenges in late 2026",
    "url": "https://www.langchain.com/blog/context-engineering-challenges-late-2026",
    "detail": "Harrison Chase / LangChain",
    "source": "Read article",
    "category": "Knowledge factories"
  },
  {
    "name": "Subagents are the biggest cause of AI failures",
    "url": "https://x.com/Alezander9/status/2118517491798606140",
    "detail": "Alexander Yue",
    "source": "Read post",
    "category": "Agents"
  },
  {
    "name": "How we built one harness for every Metaview agent",
    "url": "https://www.metaview.ai/resources/blog/how-we-built-one-harness-for-every-metaview-agent",
    "detail": "Metaview",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "The components of agent memory",
    "url": "https://www.anthropic.com/research/components-of-agent-memory",
    "detail": "Anthropic",
    "source": "Read article",
    "category": "Knowledge factories"
  },
  {
    "name": "I reverse-engineered Instinct's memory. Here's exactly how it works",
    "url": "https://x.com/DhravyaShah/status/2101745550752428340",
    "detail": "Dhravya Shah",
    "source": "Read post",
    "category": "Knowledge factories"
  },
  {
    "name": "Contextual embedding beyond the gold passage",
    "url": "https://www.perplexity.ai/hub/blog/contextual-embedding-beyond-the-gold-passage",
    "detail": "Perplexity",
    "source": "Read article",
    "category": "Knowledge factories"
  },
  {
    "name": "Multi-Agents: What's Actually Working",
    "url": "https://cognition.com/blog/multi-agents-working",
    "detail": "Cognition",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Query-aware context compression for better snippets",
    "url": "https://www.perplexity.ai/hub/blog/query-aware-context-compression-for-better-snippets",
    "detail": "Perplexity",
    "source": "Read article",
    "category": "Knowledge factories"
  },
  {
    "name": "Don't Build Multi-Agents",
    "url": "https://cognition.com/blog/dont-build-multi-agents",
    "detail": "Cognition",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "How I work with Agents",
    "url": "https://x.com/thorstenball/status/2114386050638336082",
    "detail": "Thorsten Ball / Amp",
    "source": "Read post",
    "category": "Agents"
  },
  {
    "name": "The Algorithm is the Message",
    "url": "https://www.erasmatazz.com/library/game-design/the-algorithm-is-the-messag.html",
    "detail": "Chris Crawford",
    "source": "Read article",
    "category": "Game design"
  },
  {
    "name": "A Story About A Tree",
    "favorite": true,
    "url": "https://www.raphkoster.com/games/essays/a-story-about-a-tree/",
    "detail": "Raph Koster",
    "source": "Read article",
    "category": "Game design"
  },
  {
    "name": "The Sane Asylum",
    "url": "https://colossus.com/article/sane-asylum-turbopuffer/",
    "detail": "Brie Wolfson / turbopuffer",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Water Finds a Crack",
    "url": "https://www.designer-notes.com/game-developer-column-17-water-finds-a-crack/",
    "detail": "Soren Johnson",
    "source": "Read article",
    "category": "Game design"
  },
  {
    "name": "On choice architectures",
    "favorite": true,
    "url": "https://www.raphkoster.com/2013/04/24/on-choice-architectures/",
    "detail": "Raph Koster",
    "source": "Read article",
    "category": "Game design"
  },
  {
    "name": "\"Hi @s\": How we built our company agent harness",
    "favorite": true,
    "url": "https://www.sanity.io/engineering/how-we-built-our-company-agent-harness",
    "detail": "Sanity",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Building Laminar, Ramp's in-house agent harness",
    "favorite": true,
    "url": "https://engineering.ramp.com/post/building-laminar",
    "detail": "Ramp",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Building effective agent automations",
    "url": "https://claude.dev/blog/building-effective-agent-automations/",
    "detail": "Anthropic",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Free the models: harness design at the frontier",
    "favorite": true,
    "url": "https://replit.com/blog/free-the-models",
    "detail": "Replit",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Improved token efficiency for longer agent runs",
    "url": "https://cursor.com/blog/improved-token-efficiency",
    "detail": "Cursor",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Redesigning source control at Anthropic",
    "url": "https://www.anthropic.com/engineering/redesigning-source-control",
    "detail": "Anthropic",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Five months treating bugs like patients and coding agents like a medical team",
    "url": "https://www.cockroachlabs.com/blog/experiment-running-hospital-code/",
    "detail": "Cockroach Labs",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "Why Software Factories Fail",
    "url": "https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md",
    "detail": "HumanLayer",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "How the Claude Code team does code review",
    "favorite": true,
    "url": "https://claude.dev/blog/solving-code-review-at-anthropic/",
    "detail": "Anthropic",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Building shared workspaces for people and agents",
    "url": "https://www.perplexity.ai/hub/blog/building-shared-workspaces-for-people-and-agents",
    "detail": "Perplexity",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Designing MCP Gateway: Uber's MCP management platform",
    "url": "https://www.uber.com/blog/designing-mcp-gateway/",
    "detail": "uber.com",
    "source": "Read article",
    "category": "Engineering"
  },
  {
    "name": "Instinct: The Personal Agent",
    "favorite": true,
    "url": "https://colossus.com/episode/instinct-the-personal-agent/",
    "detail": "Patrick O’Shaughnessy / Colossus",
    "source": "Listen / read",
    "format": "Podcast & transcript",
    "category": "Agents"
  },
  {
    "name": "The Making of a Market Maker",
    "favorite": true,
    "url": "https://colossus.com/article/thomas-peterffy-market-maker/",
    "detail": "Dom Cooke / Colossus",
    "source": "Read article",
    "category": "Business"
  },
  {
    "name": "Anatomy of a bug-fixing agent",
    "url": "https://huggingface.co/blog/huggingface/anatomy-of-a-bug-fixing-agent",
    "detail": "Hugging Face",
    "source": "Read article",
    "category": "Agents"
  },
  {
    "name": "The Company We Keep",
    "favorite": true,
    "url": "https://www.thriveholdings.com/the-company-we-keep",
    "detail": "Thrive Holdings",
    "source": "Read article",
    "category": "Business"
  }
];

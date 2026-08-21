const ARTICLES_KEY = "hh_admin_articles"

function seedArticles() {
  const now = new Date().toISOString()
  return [
    {
      id: crypto.randomUUID(),
      title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      category: "Cat",
      introduction:
        "Cats have captivated human hearts for thousands of years. Their mysterious nature and unique personalities make them one of the most beloved pets worldwide.",
      content:
        "##1. Independent Yet Affectionate\nCats are known for independence, yet they form deep bonds with their humans.\n\n##2. Playful Personalities\nFrom chasing laser pointers to batting at toys, cats bring joy through play.",
      image: "",
      status: "draft",
      author: "Thompson P.",
      authorId: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Understanding Cat Behavior: Decoding Their Mysterious Ways",
      category: "Cat",
      introduction: "Learn how to read your cat's body language and daily habits.",
      content: "Cats communicate through subtle cues. Tail position, ear direction, and purring all tell a story.",
      image: "",
      status: "draft",
      author: "Thompson P.",
      authorId: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "Finding Balance: The Art of Harmonious Living",
      category: "General",
      introduction: "Practical tips for a calmer everyday rhythm.",
      content: "Balance starts with small habits: sleep, movement, and mindful breaks.",
      image: "",
      status: "draft",
      author: "Thompson P.",
      authorId: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      title: "The Secret of Persistence: Unlocking Your True Potential",
      category: "Inspiration",
      introduction: "How consistent effort compounds into meaningful progress.",
      content: "Persistence is less about motivation and more about systems you can repeat.",
      image: "",
      status: "published",
      author: "Thompson P.",
      authorId: null,
      createdAt: now,
      updatedAt: now,
    },
  ]
}

function readArticles() {
  try {
    const raw = localStorage.getItem(ARTICLES_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const seeded = seedArticles()
  writeArticles(seeded)
  return seeded
}

function writeArticles(articles) {
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
}

export function getArticles({ keyword = "", status = "all", category = "all" } = {}) {
  const query = keyword.trim().toLowerCase()
  let articles = readArticles().sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )

  if (status !== "all") {
    articles = articles.filter((article) => article.status === status)
  }

  if (category !== "all") {
    articles = articles.filter((article) => article.category === category)
  }

  if (query) {
    articles = articles.filter((article) =>
      article.title.toLowerCase().includes(query)
    )
  }

  return articles
}

export function getArticleById(id) {
  return readArticles().find((article) => article.id === id) ?? null
}

export function createArticle(payload) {
  const articles = readArticles()
  const now = new Date().toISOString()
  const article = {
    id: payload.id != null ? String(payload.id) : crypto.randomUUID(),
    title: payload.title.trim(),
    category: payload.category,
    introduction: (payload.introduction ?? "").trim().slice(0, 120),
    content: payload.content.trim(),
    image: payload.image || "",
    status: payload.status,
    author: payload.author,
    authorId: payload.authorId ?? null,
    createdAt: now,
    updatedAt: now,
  }
  writeArticles([article, ...articles])
  return article
}

export function updateArticle(id, payload) {
  const articles = readArticles()
  const index = articles.findIndex((article) => article.id === id)
  if (index === -1) {
    const error = new Error("Article not found")
    error.response = { data: { error: "Article not found" } }
    throw error
  }

  articles[index] = {
    ...articles[index],
    title: payload.title.trim(),
    category: payload.category,
    introduction: (payload.introduction ?? "").trim().slice(0, 120),
    content: payload.content.trim(),
    image: payload.image ?? articles[index].image,
    status: payload.status ?? articles[index].status,
    updatedAt: new Date().toISOString(),
  }
  writeArticles(articles)
  return articles[index]
}

export function deleteArticle(id) {
  const articles = readArticles()
  const next = articles.filter((article) => article.id !== id)
  if (next.length === articles.length) {
    const error = new Error("Article not found")
    error.response = { data: { error: "Article not found" } }
    throw error
  }
  writeArticles(next)
}

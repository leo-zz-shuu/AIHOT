// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "ai-models", label: "芯片与加速器", feedLabel: "芯片与加速器", section: "基础设施发布/更新", guide: "GPU、NPU、TPU、互连、存储、服务器和数据中心基础设施的发布、版本、供货、性能、价格或可用性变化。只报告一次跑分归论文与基准，纯软件支持归编译器与运行时。" },
  { key: "ai-products", label: "编译器与运行时", feedLabel: "编译器与运行时", section: "软件栈发布/更新", guide: "编译器、IR、运行时、内核、算子库、分布式系统、推理服务、开发工具和硬件适配层的发布与重大更新。一个项目只接入新后端时，只有带来可验证能力或性能变化才进入精选。" },
  { key: "industry", label: "行业动态", feedLabel: "行业动态", section: "行业动态", guide: "已发生的公司经营、融资并购、人事、合作、开源治理、供应链、政策、生态和真实安全事故及调查进展。新闻由当事人发布也仍按发生的事实归类。" },
  { key: "paper", label: "论文与基准", feedLabel: "论文与基准", section: "研究与基准", guide: "以编译优化、系统设计、硬件架构、分布式训练或推理实验为核心的论文、技术报告、新基准、数据集和可复现实验。单一项目宣传页列出的历史成绩不算新基准。" },
  { key: "tip", label: "教程与实践", section: "教程与观点", guide: "读者可以照着使用的编译器配置、内核优化、部署方法、性能分析、工程实践复盘和技术讲解。重点是可复用做法；只公布工具归编译器与运行时，只有判断和预测归观点。", commentary: true },
  { key: "opinion", label: "技术观点", section: "教程与观点", guide: "重点是作者对 AI 基础设施、编译器路线、系统设计、硬件生态或工程取舍的解释、判断、预测、评论或访谈观点。没有新事实或可复用框架的宏大叙事应压低。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/**
 * 这个行业最受关注的一类发布（AI 行业是新模型）：日报报头的“N 个新模型”、改分类后修订已出的报告都按它数。
 * category 是类别，tag 是标签，两者都对上才算；unit 接在数字后面。
 * 没有这样一类的行业设成 null，报头就不显示这个数。
 */
export const RELEASE: { category: string; tag: string; unit: string } | null = { category: "ai-models", tag: "硬件发布", unit: "项硬件发布" };

/** 周报月报的总述可以直接写、不必在报道里找到出处的行业通用词（小写）。站名会自动算进去。 */
export const PLAIN_TERMS: readonly string[] = ["ai", "infra", "compiler", "gpu", "cpu", "npu", "api", "sdk", "ceo", "ipo"];

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "硬件发布", "编译器/运行时", "产品更新", "模型发布", "论文/研究", "开源/仓库", "教程/实践", "现象/趋势", "大佬观点", "评测/基准", "性能/基准", "安全/可靠性", "行业动态", "政策/监管",
  "非AI/通用工具", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "GPU/加速器", "硬件架构", "编译器", "IR/优化", "运行时", "内核/算子", "推理部署", "分布式训练", "性能工程", "系统软件", "数据中心", "开源生态", "编程语言", "模型优化",
  "Agent", "编码", "推理", "多模态", "语音", "视频", "图像生成", "RAG", "端侧", "数据/训练", "搜索", "部署/工程", "具身智能", "MCP/工具调用",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = ["NVIDIA", "AMD", "Intel", "Arm", "LLVM", "MLIR", "OpenXLA", "PyTorch", "Apache TVM", "GitHub", "Linux Foundation", "OpenAI", "Anthropic", "DeepSeek", "DeepMind", "Google", "Meta", "Microsoft", "xAI", "Hugging Face", "arXiv"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  "硬件": "硬件发布", "芯片": "硬件发布", "加速器": "硬件发布", "GPU": "硬件发布", "编译器": "编译器/运行时", "runtime": "编译器/运行时", "运行时": "编译器/运行时",
  "性能": "性能/基准", "benchmark": "性能/基准", "基准": "性能/基准", "可靠性": "安全/可靠性", "系统": "系统软件", "内核": "内核/算子", "算子": "内核/算子",
  "教程/玩法": "教程/实践", "技巧/最佳实践": "教程/实践", "合作/生态": "行业动态", "融资/收购": "行业动态", "公司动态": "行业动态",
  合作: "行业动态", 生态: "行业动态", 融资: "行业动态", 收购: "行业动态", 投资: "行业动态", 并购: "行业动态",
  政策: "政策/监管", 监管: "政策/监管", 法规: "政策/监管", 安全: "安全/可靠性", 对齐: "安全/可靠性",
  论文: "论文/研究", 研究: "论文/研究", paper: "论文/研究", papers: "论文/研究",
  "open-source": "开源/仓库", 开源: "开源/仓库", 仓库: "开源/仓库", repo: "开源/仓库",
  教程: "教程/实践", 玩法: "教程/实践", 指南: "教程/实践", 技巧: "教程/实践", 最佳实践: "教程/实践", 实践: "教程/实践",
  产品: "产品更新", 更新: "产品更新", 发布: "模型发布", 模型: "模型发布", 趋势: "现象/趋势", 现象: "现象/趋势", 观点: "大佬观点",
  视频生成: "视频", 非ai: "非AI/通用工具", "non-ai": "非AI/通用工具", 通用工具: "非AI/通用工具", 工程工具: "非AI/通用工具",
  安全扫描: "非AI/通用工具", devops: "非AI/通用工具", 行业: "行业动态", 动态: "行业动态",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/**
 * 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。
 * aliases 给结构抽取模型看；otherNames 是公司自己的其他称呼（官方账号名、子品牌），
 * 把事实的主体对到发布方时也认它们。
 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  "world-labs": { name: "World Labs", displayTag: null, aliases: ["World Labs"] },
  "thinking-machines": { name: "Thinking Machines Lab", displayTag: null, aliases: ["Thinking Machines"] },
  amd: { name: "AMD", displayTag: null, aliases: ["AMD", "Advanced Micro Devices"] },
  openai: { name: "OpenAI", displayTag: "OpenAI", aliases: ["OpenAI", "ChatGPT", "Sora", "Codex", "GPT"], otherNames: ["OpenAI Developers"] },
  anthropic: { name: "Anthropic", displayTag: "Anthropic", aliases: ["Anthropic", "Claude"], otherNames: ["Claude Code"] },
  google: { name: "Google", displayTag: "Google", aliases: ["Google", "DeepMind", "Gemini", "谷歌"], otherNames: ["Google DeepMind", "Google Research", "Google AI", "Google Labs", "Google Cloud"] },
  deepseek: { name: "DeepSeek", displayTag: "DeepSeek", aliases: ["DeepSeek", "深度求索"] },
  qwen: { name: "千问 Qwen", displayTag: null, aliases: ["Qwen", "通义", "阿里"], otherNames: ["通义千问", "千问", "千问APP", "Qwen Team", "通义实验室", "阿里巴巴", "Alibaba", "阿里云", "Alibaba Cloud"] },
  kimi: { name: "Kimi / 月之暗面", displayTag: null, aliases: ["Kimi", "月之暗面", "Moonshot"], otherNames: ["Moonshot AI"] },
  minimax: { name: "MiniMax", displayTag: null, aliases: ["MiniMax", "海螺"], otherNames: ["稀宇科技"] },
  zhipu: { name: "智谱 GLM", displayTag: null, aliases: ["智谱", "GLM", "Z.ai"], otherNames: ["智谱AI", "Zhipu", "Zhipu AI"] },
  xai: { name: "xAI", displayTag: "xAI", aliases: ["xAI", "Grok"], otherNames: ["SpaceXAI"] },
  meta: { name: "Meta", displayTag: "Meta", aliases: ["Meta", "Llama"], otherNames: ["Meta AI", "AI at Meta"] },
  microsoft: { name: "Microsoft", displayTag: "Microsoft", aliases: ["Microsoft", "微软", "Copilot"], otherNames: ["Microsoft Research", "Microsoft AI"] },
  nvidia: { name: "NVIDIA", displayTag: null, aliases: ["NVIDIA", "英伟达"] },
  intel: { name: "Intel", displayTag: "Intel", aliases: ["Intel", "英特尔"], otherNames: ["oneAPI"] },
  arm: { name: "Arm", displayTag: "Arm", aliases: ["Arm", "ARM"], otherNames: ["Arm Neoverse"] },
  llvm: { name: "LLVM", displayTag: "LLVM", aliases: ["LLVM", "llvm-project", "Clang"], otherNames: ["LLVM Project"] },
  mlir: { name: "MLIR", displayTag: "MLIR", aliases: ["MLIR"], otherNames: ["Multi-Level Intermediate Representation"] },
  openxla: { name: "OpenXLA", displayTag: "OpenXLA", aliases: ["OpenXLA", "XLA"], otherNames: ["PJRT"] },
  pytorch: { name: "PyTorch", displayTag: "PyTorch", aliases: ["PyTorch", "Torch"], otherNames: ["torch.compile"] },
  "apache-tvm": { name: "Apache TVM", displayTag: "Apache TVM", aliases: ["Apache TVM", "TVM"], otherNames: ["Relax", "TensorIR"] },
  "linux-foundation": { name: "Linux Foundation", displayTag: "Linux Foundation", aliases: ["Linux Foundation"] },
  "hugging-face": { name: "Hugging Face", displayTag: "Hugging Face", aliases: ["Hugging Face"], otherNames: ["HuggingFace"] },
  cursor: { name: "Cursor", displayTag: null, aliases: ["Cursor", "Anysphere"] },
  openrouter: { name: "OpenRouter", displayTag: null, aliases: ["OpenRouter"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 行业没有这个问题时可以留空数组。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "openai", name: "OpenAI", patterns: [/openai|chatgpt|\bgpt-?[o\d]|\bsora\b|\bcodex\b/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|\bclaude\b/i, /\b(?:opus|sonnet|haiku)\s*\d+(?:[.\-]\d+)*\b/i, /\bfable\s*\d+(?:[.\-]\d+)*\b|\bmythos\b/i] },
  { id: "google", name: "Google / Gemini", patterns: [/google|deepmind|\bgemini\b|notebooklm|\bveo\s?\d|\bAlphaFold\b|\bAMIE\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|深度求索/i] },
  { id: "xai", name: "xAI / Grok", patterns: [/\bxai\b|\bgrok\b/i] },
  { id: "meta", name: "Meta / Llama", patterns: [/\bMeta\b/, /\bmeta\s?ai\b|\bllama\b/i] },
  { id: "microsoft", name: "Microsoft / Copilot", patterns: [/microsoft|copilot|微软/i] },
  { id: "nvidia", name: "NVIDIA", patterns: [/nvidia|英伟达|\bnemotron\b|\bnemo\b|\bblackwell\b|\brubin(?:\s+ultra)?\b|\bcuda\b/i] },
  { id: "amd", name: "AMD / ROCm", patterns: [/\bamd\b|advanced micro devices|\brocm\b/i] },
  { id: "intel", name: "Intel / oneAPI", patterns: [/\bintel\b|英特尔|oneapi/i] },
  { id: "arm", name: "Arm", patterns: [/\barm\b|neoverse/i] },
  { id: "llvm", name: "LLVM", patterns: [/\bllvm\b|llvm-project|\bclang\b/i] },
  { id: "mlir", name: "MLIR", patterns: [/\bmlir\b|multi-level intermediate representation/i] },
  { id: "openxla", name: "OpenXLA / XLA", patterns: [/openxla|\bxla\b|pjrt/i] },
  { id: "pytorch", name: "PyTorch", patterns: [/pytorch|\btorch\.compile\b/i] },
  { id: "apache-tvm", name: "Apache TVM", patterns: [/apache tvm|\btvm\b|tensorir|\brelax\b/i] },
  { id: "linux-foundation", name: "Linux Foundation", patterns: [/linux foundation/i] },
  { id: "qwen", name: "千问 Qwen", patterns: [/\bqwen|通义|千问/i] },
  { id: "hugging-face", name: "Hugging Face", patterns: [/hugging\s?face/i] },
  { id: "cursor", name: "Cursor", patterns: [/\bCursor\b/] },
  { id: "kimi", name: "Kimi / 月之暗面", patterns: [/\bkimi\b|月之暗面|\bmoonshot\s?ai\b/i] },
  { id: "openrouter", name: "OpenRouter", patterns: [/openrouter/i] },
  { id: "minimax", name: "MiniMax", patterns: [/minimax/i] },
  { id: "zhipu", name: "智谱 GLM", patterns: [/智谱|\bglm-?[4-9]/i] },
  { id: "hunyuan", name: "腾讯混元", patterns: [/混元|hunyuan/i] },
  { id: "doubao", name: "字节豆包", patterns: [/豆包|doubao|字节跳动|bytedance/i] },
  { id: "mistral", name: "Mistral", patterns: [/mistral/i] },
  { id: "perplexity", name: "Perplexity", patterns: [/\bPerplexity\b/] },
  { id: "runway", name: "Runway", patterns: [/\brunway\b/i] },
  { id: "suno", name: "Suno", patterns: [/\bsuno\b/i] },
  { id: "midjourney", name: "Midjourney", patterns: [/midjourney/i] },
  { id: "stability-ai", name: "Stability AI", patterns: [/stability\s?ai/i] },
  { id: "elevenlabs", name: "ElevenLabs", patterns: [/eleven\s?labs/i] },
  { id: "vllm", name: "vLLM", patterns: [/\bvllm\b/i] },
  { id: "ollama", name: "Ollama", patterns: [/\bollama\b/i] },
  { id: "windsurf", name: "Windsurf", patterns: [/windsurf/i] },
  { id: "devin", name: "Devin", patterns: [/\bdevin\b/i] },
  { id: "manus", name: "Manus", patterns: [/\bmanus\b/i] },
  { id: "apple", name: "Apple AI", patterns: [/\bapple\s?(intelligence|silicon|ai)\b|苹果(智能|\s?AI)/i] },
  { id: "amazon", name: "Amazon / AWS", patterns: [/amazon|\baws\b|亚马逊/i] },
  { id: "baidu", name: "百度文心", patterns: [/百度|baidu|文心|\bernie\s?bot\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "google", domains: ["deepmind.google", "ai.google", "blog.google"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "xai", domains: ["x.ai"] },
  { entityId: "meta", domains: ["ai.meta.com"] },
  { entityId: "microsoft", domains: ["microsoft.com"] },
  { entityId: "nvidia", domains: ["nvidia.com"] },
  { entityId: "llvm", domains: ["llvm.org"] },
  { entityId: "mlir", domains: ["mlir.llvm.org"] },
  { entityId: "openxla", domains: ["openxla.org"] },
  { entityId: "pytorch", domains: ["pytorch.org"] },
  { entityId: "apache-tvm", domains: ["tvm.apache.org"] },
  { entityId: "linux-foundation", domains: ["lfprojects.org", "linuxfoundation.org"] },
  { entityId: "qwen", domains: ["qwen.ai"] },
  { entityId: "cursor", domains: ["cursor.com"] },
  { entityId: "openrouter", domains: ["openrouter.ai"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "meta", pattern: /@AIatMeta\b/i },
  { entityId: "zhipu", pattern: /\bZhipu(?:\s+AI\b|['’]s\b)/i },
];

import type { Slide } from "./types";

export const deck: Slide[] = [
  // ── Slide 1 — Title ──────────────────────────────────────────
  {
    kind: "hero",
    tone: "dark",
    icon: "code",
    iconWeight: "fill",
    title: "Reverse Engineering 180M Lines of Code",
    subtitle: "Ofri Wolfus · Applied Materials · GeekTime Code 2026",
    content: {
      mark: "ChunkHound",
      caption: "Your entire codebase, deeply understood",
    },
    notes:
      "צהריים טובים. אני עופרי וולפוס. אני כותב קוד כבר יותר מ־20 שנה — לשעבר בגוגל, הקמתי כמה סטארטאפים, והיום אני Senior Architect ב־Applied Materials.\n\n" +
      "אני הולך לספר לכם את הסיפור של הקודבייס הכי גדול שנתקלתי בו אי פעם, למה לא הצלחנו להבין אותו, ומה קרה כשנתנו ל־AI את המשימה לעשות לו reverse engineering.\n\n" +
      'אבל קודם — בהרמת יד. מי כאן עובד על קודבייס בן יותר מ־10 שנים? *(הפסקה)* יותר מ־20? *(הפסקה)* אוקיי, עכשיו תדמיינו שהקודבייס הזה הוא 180 מיליון שורות קוד, ואם יש בו באג — מישהו עלול למות. זה היום־יום שלי.'
  },

  // ── Slide 2 — The Beast ──────────────────────────────────────
  {
    kind: "linearScale",
    title: "The Beast",
    icon: "smileyDead",
    content: {
      max: 200,
      unit: "M LoC",
      references: [
        { label: "Linux", value: 15 },
        { label: "Facebook", value: 20 },
        { label: "Windows", value: 50 },
      ],
      subject: {
        label: "Applied Materials monorepo",
        value: 180,
        caption: "180M+ LoC",
      },
      callouts: [
        "TOP 0.001%|of repositories worldwide",
        "9×|the 20M large-enterprise tier",
        "24 YEARS|mission-critical history",
      ],
      facts: [],
      hyperscaleNote: "",
      caveat: "",
    },
    notes:
      "Applied Materials בונה את המכונות שבונות שבבים. הלקוחות שלנו? Samsung, TSMC, וכל השמות שאתם מכירים. אלה מערכות תעשייתיות כבדות — מתח גבוה, תותחי אלקטרונים, תאי ואקום, רובוטים שמזיזים פרוסות סיליקון בדיוק ננומטרי. הן עובדות 24/7 ברצפות ייצור. הן בודקות פיצ׳רים ברמה של אטומים בודדים.\n\n" +
      "והתוכנה שמריצה את המכונות האלה? 180 מיליון שורות קוד. זה שם אותנו ב־0.001% העליון של הריפוזיטוריז בעולם. זה מונוריפו. ריפוזיטורי אחד. שמריץ את כל קו המוצרים.\n\n" +
      "וכאן זה נהיה מעניין. הקודבייס שלנו בן 24 שנה. הוא התחיל כשתי חברות ישראליות נפרדות שנרכשו ואוחדו. ואם מסתכלים מקרוב, עדיין אפשר למצוא קוד — קוד אמיתי, שלא שונה — מהחברות המקוריות האלה. לא הרבה. אבל הוא שם. קונבנציות שמות שונות, דפוסים ארכיטקטוניים שונים, קטעי קוד שלמים שלא נגעו בהם שני עשורים, חיים זה לצד זה באותו ריפו.\n\n" +
      "הוא מערב כמעט כל שפה מודרנית שאתם יכולים לחשוב עליה עם Java ו־C++ שעברו אבסטרקציה כבדה וקונפיגורביליות עמוקה. מדובר במכונות תעשייתיות שמנוהלות על ידי תוכנה שצריכה לתאם מכניקה, אלקטרוניקה, פיזיקה ועיבוד תמונה כבד — הכל בזמן אמת, והכל בלי להיכשל."
  },

  // ── Slide 3 — The Problem ────────────────────────────────────
  {
    kind: "fragmentedQuote",
    title: "The Problem",
    icon: "knowledge",
    content: {
      quote: '"Nobody knows what this code actually does."',
      fragments: [
        { label: "What was there before their time (vaguely)", icon: "legacy" },
        { label: "What they personally changed", icon: "local" },
        { label: "No full current-state snapshot exists", icon: "missingView" },
      ],
      footer: "Previous refactoring attempts: FAILED",
      footerDetail: "Many talented people tried. The code won.",
    },
    notes:
      "זו הבעיה האמיתית. אף אחד — ואני מתכוון אף אחד — לא מבין את כל המערכת. לא אני, לא ה־CTO, לא המהנדס שנמצא כאן 20 שנה.\n\n" +
      "למה? כי ידע בקודבייס כל כך ישן וכל כך גדול לא מצטבר — הוא מתפורר לרסיסים. כל מפתח באמת מבין רק את הדלתא: מה היה שם לפניו, ומה הוא עצמו שינה. תכפילו את זה ב־24 שנים של תחלופה ושינויים, והקוד הופך למקור האמת היחיד. המערכת עצמה היא התיעוד.\n\n" +
      "הרבה מהנדסים מוכשרים לפנינו ניסו לעשות refactor למפלצת הזאת. כולם נכשלו. לא כי הם לא היו חכמים מספיק — הם היו מבריקים. הם נכשלו כי אי אפשר לעשות refactor למשהו שלא מבינים, ואי אפשר להבין 180 מיליון שורות קוד פשוט מלקרוא אותן.\n\n" +
      "ואז הגיע ה־AI."
  },

  // ── Slide 4 — The AI Bet ────────────────────────────────────
  {
    kind: "decisionFunnel",
    title: "The AI Bet",
    icon: "robot",
    content: {
      inputs: [
        "Enterprise code search",
        "Cloud RAG platforms",
        "AI coding assistants",
      ],
      filters: [
        "Scale: 180M+ LoC",
        "Privacy: on-prem / air-gapped",
        "Price: cannot send millions of tokens / query",
      ],
      result: "So we built our own.",
    },
    notes:
      "לפני בערך שנה שאלנו את עצמנו: האם LLMs יכולים לעזור לנו להבין את הקודבייס של עצמנו? האם אפשר להשתמש ב־AI כדי לשחזר את הידע הארגוני שאבד עם הזמן?\n\n" +
      "בדקנו כל כלי שמצאנו. Enterprise code search, פלטפורמות RAG בענן, AI coding assistants. שום דבר לא עבד בשבילנו.\n\n" +
      "סקייל היה הבעיה הברורה — אף אחד לא בונה עבור 180 מיליון שורות. אבל המגבלות הקשות יותר היו פרטיות ועלות. המכונות שלנו רצות ברצפות ייצור, הרבה פעמים בסביבות air-gapped. אנחנו לא יכולים לשלוח קוד לשירות ענן. ובסקייל שלנו, לשלוח מיליוני טוקנים בכל שאילתה היה מרושש אותנו.\n\n" +
      "אז עשינו מה שמהנדסים עושים. בנינו פתרון משלנו.\n\n" +
      'הפתרון הזה הפך ל־ChunkHound. קוד פתוח. רישיון MIT. והטוויסט שעדיין מפתיע אותי — החלטנו לבנות אותו כולו עם AI. לא שורה אחת נכתבה ידנית. אפילו השם "ChunkHound" נוצר על ידי GPT.\n\n' +
      "*(הפסקה לתגובה מהקהל)*\n\n" +
      "עכשיו, לפני שאתם שופטים — תנו לי להראות לכם מה למדנו בדרך."
  },

  // ── Slide 5 — v1: The Obvious Approach (and Why It Fails) ──
  {
    kind: "pipelineFailure",
    title: "The Obvious Approach",
    subtitle: "(and Why It Fails)",
    icon: "failure",
    content: {
      steps: [
        "Code",
        "Chunks",
        "Embeddings",
        "Vector DB",
        "Top‑K",
        "LLM",
      ],
      failureAt: 4,
      scaleMismatch: "One real feature can span hundreds of files and thousands of chunks.",
      reason: "DOESN'T WORK AT THIS SCALE",
    },
    notes:
      "אני רוצה לעבור איתכם על הניסיון הראשון שלנו, כי אני חושד שרבים מכם ניסו משהו דומה.\n\n" +
      "הגישה המתבקשת: לוקחים את הקודבייס, מחלקים אותו לצ׳אנקים קטנים, מריצים כל צ׳אנק דרך מודל embeddings, שומרים הכל ב־vector database, וחושפים כלי semantic search לסוכן ה־AI שלכם. הסוכן שואל \"איך authentication עובד?\", אנחנו שולפים את 50 הצ׳אנקים הכי רלוונטיים, דוחפים אותם לקונטקסט, וה־LLM עונה.\n\n" +
      "זה textbook RAG. זה עובד נהדר על קודבייסים בינוניים. בסקייל שלנו זה מתפרק לגמרי.\n\n" +
      "הנה למה: פיצ׳ר אחד במערכת שלנו יכול בקלות להתפרס על מאות קבצים ואלפי צ׳אנקים. Authentication הוא לא פונקציה אחת — זה concern רוחבי שנוגע בקונפיגורציה, networking, session management, מודלי הרשאות, audit logging. 50 הצ׳אנקים הראשונים מ־vector search לא יכולים לתפוס את זה. וגם אם הם כן היו יכולים — גם אם איכשהו הייתם מצליחים להכניס את כל אלף הצ׳אנקים הרלוונטיים לקונטקסט — עקומת הקשב של ה־LLM הייתה הורסת את הדיוק.\n\n" +
      "לדחוף דברים לקונטקסט זה לא חיפוש. זו היוריסטיקה שנשברת בסקייל."
  },

  // ── Slide 6 — Deep Research for Code ─────────────────────────
  {
    kind: "iterativeLoop",
    title: "Deep Research for Code",
    icon: "research",
    subtitle: "Not search-and-stuff. Investigation.",
    content: {
      question: "How does electron-beam calibration work?",
      trail: [
        {
          label: "Question",
          detail: "beam calibration",
          note: "LLM-guided exploration",
          icon: "question",
        },
        {
          label: "Entry point",
          detail: "CALIBRATE_BEAM",
          note: "first useful hit",
          icon: "entryPoint",
        },
        {
          label: "Extract leads",
          detail: "constants + calls",
          note: "Constant extraction + facts ledger",
          icon: "leads",
        },
        {
          label: "Follow-up hops",
          detail: "callers · hardware · safety",
          note: "Multi-hop semantic search",
          icon: "research",
        },
        {
          label: "Map-reduce",
          detail: "summarize big branches",
          note: "Map-reduce summarization · adaptive token budgets (30K → 150K)",
          icon: "summarize",
        },
      ],
      ledger: [
        "architecture",
        "constants",
        "patterns",
        "constraints",
      ],
      answer: "Deep architectural answer",
    },
    notes:
      "אז היינו צריכים להיות חכמים יותר. במקום search-and-stuff יחיד, אימצנו את אותן טכניקות שסוכני deep research מודרניים משתמשים בהן כדי לחקור את הווב — אבל הפעלנו אותן על קוד.\n\n" +
      'תדמיינו ששואלים: "איך כיול קרן האלקטרונים עובד?" ChunkHound לא מחפש פעם אחת וזורק תוצאות. הוא נכנס ללולאת מחקר:\n\n' +
      "החיפוש הראשון מוצא את נקודת הכניסה לכיול. הסוכן קורא אותה, מחלץ קבועים חשובים וקריאות לפונקציות — אלה הופכים ל־\"leads\". הוא מנסח שאלות המשך: \"מאיפה קוראים ל־`CALIBRATE_BEAM`?\" \"לאיזה ממשק חומרה זה מדבר?\" כל שאלת המשך מפעילה חיפושים חדשים.\n\n" +
      "אנחנו מחזיקים facts ledger — מחברת רצה של ארכיטקטורה, קבועים ודפוסים שהתגלו. הסוכן משתמש ב־map-reduce: כשענף חקירה מחזיר יותר מדי מידע, הוא מסכם לפני שהוא ממשיך. תקציבי הטוקנים מתרחבים ומתכווצים אדפטיבית לפי מה שנחקר.\n\n" +
      "ת�שבו על זה כמו בלש שעובד על תיק. לא קוראים את כל מחסן הראיות. הולכים בעקבות קצוות חוט, רושמים הערות, בונים היפותזות, וחוקרים הלאה. זה מה ששכבת האורקסטרציה עושה.\n\n" +
      "התוצאה? ChunkHound יכול לענות על שאלות ארכיטקטוניות עמוקות על קודבייס של 180 מיליון שורות. שאלות שאף אחד בחברה — אף אדם אחד — לא היה יכול לענות עליהן בלי שבועות של חקירה ידנית."
  },

  // ── Slide 7 — How We Actually Use It ────────────────────────
  {
    kind: "parallelResearch",
    title: "How We Actually Use It",
    icon: "hammer",
    content: {
      hub: "Claude Code orchestrates parallel ChunkHound research",
      spokes: [
        { title: "Algorithm details", caption: "control flow · calibration logic", icon: "code" },
        { title: "Test coverage", caption: "assertions · edge cases · safety checks", icon: "evidence" },
        { title: "Architecture", caption: "modules · dependencies · state machines", icon: "architecture" },
      ],
      target: "via MCP · tens of calls · facts return",
      powerUpSequence:
        "Vacuum → Voltage → E-beam → Cooling → Interlocks → Ready",
    },
    notes:
      "זה החלק שקל לפספס. ChunkHound לא יושב בצד ככלי עצמאי. סוכן המחקר שלו נחשף ככלי MCP — מה שאומר ש־Claude Code יכול לקרוא לו. לא פעם אחת. עשרות פעמים. במקביל.\n\n" +
      "ת�שבו מה זה פותח. Claude Code מתזמר צוות של חוקרים, שכל אחד מהם עושה zoom in לפינה אחרת של המערכת וברמת זום אחרת. קריאה אחת נכנסת עמוק לפרטי המימוש של אלגוריתם. אחרת ממפה את כיסוי הבדיקות של מודול. שלישית עושה zoom out ושואלת: \"מה הארכיטקטורה כאן? מי מדבר עם מי?\"\n\n" +
      "המודול הכי קשה שאי פעם היינו צריכים לעשות לו reverse engineering היה מערכת ה־power-up. תחשבו מה קורה כשמדליקים אחת מהמכונות התעשייתיות האלה. זה לא פשוט ללחוץ על מתג. אתם מתזמרים סימפוניה שלמה — ספקי מתח גבוה שעולים ברצף, משאבות ואקום שמגיעות ללחץ יעד, תותחי אלקטרונים שמתחממים, מערכות קירור שמתייצבות, interlocks בטיחותיים שעושים בדיקות. מאות תהליכי חומרה ופיזיקה, כולם מתואמים על ידי תוכנה, וכולם חייבים לקרות בדיוק בסדר הנכון ברצפת ייצור שבה downtime עולה מיליונים.\n\n" +
      "אף אחד לא הבין את רצף ה־power-up המלא. הקוד היה מפוזר על פני עשרות מודולים שנכתבו לאורך שני עשורים על ידי מהנדסים שכבר מזמן עזבו. ChunkHound עשה לו reverse engineering. הוא עקב אחרי control flow דרך רוטינות כיול, שכבות אבסטרקציה לחומרה, safety watchdogs, ו־state machines מונעות קונפיגורציה. הוא תיעד מה קורה מ־cold start ועד עבודה מלאה — משהו שאף אדם יחיד לא עשה מעולם.\n\n" +
      "זה הדפוס האמיתי. לא חיפוש אחד. מחקר מתוזמר."
  },

  // ── Slide 8 — The Local Vector DB Problem ──────────────────
  {
    kind: "localVectorBreakthrough",
    title: "Fitting Cloud-Scale Search Into a Laptop",
    icon: "database",
    content: {
      cloud: "Cloud vector DB assumptions",
      boundary: "Local-first boundary: code never leaves",
      pressure: ["IDE", "Docker", "Chrome ×47"],
      source: {
        title: "DuckDB",
        caption: "source of truth · metadata · chunks",
        icon: "database",
      },
      index: {
        title: "USearch shards",
        icon: "hardDrives",
        shards: ["shard 01", "shard 02", "shard 03", "shard N"],
      },
      bypass: "semantic search bypasses DuckDB",
      result: "50M+ LOC · local · private · offline",
    },
    notes:
      "אני רוצה לעשות zoom in לאתגר טכני ספציפי שכמעט הרג את הפרויקט. ChunkHound הוא local first בתכנון שלו. הקוד שלכם נשאר אצלכם במכונה. בלי העלאות לענן, בלי קריאות API עם ה־IP שלכם. מבחינתנו זה לא נתון למשא ומתן.\n\n" +
      "אבל הנה הקטע: local vector databases לא בנויות למיליוני וקטורים. זו בדרך כלל בעיית ענן. כשאתם Pinecone או ChromaDB שרצים על Kubernetes cluster, יש לכם משאבים. כשאתם על ה־MacBook של מפתח, אתם מתחרים עם ה־IDE שלו, ה־Docker containers שלו, ו־47 טאבים של Chrome.\n\n" +
      "לא מצאנו כמעט שום רפרנסים לאנשים שניסו לדחוף local vector search לסקייל הזה. היינו צריכים להבין את זה בעצמנו.\n\n" +
      "האינדקס הווקטורי מחולק ל־shards — ככה הוא מצליח לגדול מקומית — והוא בנוי מעל USearch. DuckDB משמש כמקור האמת לכל המטאדאטה ונתוני הצ׳אנקים, אבל ה־semantic search עצמו בכלל לא נוגע בו. הפרדנו ביניהם כדי שכל אחד יוכל להיות מכוון לעומס העבודה שלו.\n\n" +
      "התוצאה? אפשר לאנדקס עשרות מיליוני שורות קוד מקומית, על הלפטופ שלכם. בפרטיות. בלי חיבור לאינטרנט."
  },

  // ── Slide 9 — One Year In ──────────────────────────────────
  {
    kind: "impactDashboard",
    title: "One Year In",
    icon: "impact",
    content: {
      metrics: [
        { value: "32+", label: "languages supported", icon: "code" },
        {
          value: "3 months → 3 days",
          label: "specification time",
          emphasis: "accent",
          icon: "impact",
        },
        {
          value: "20+",
          label: "contributors from industry",
          icon: "community",
        },
      ],
      proof: [
        "Local-first, private, MCP",
        "Kimara AI · Riot Games · US Gov contractors · and growing...",
      ],
    },
    notes:
      "שנה לתוך הפרויקט, זה המקום שבו אנחנו נמצאים. ChunkHound מאנדקס 32 שפות ומתמודד עם פרויקטים של עשרות מיליוני שורות קוד — מקומית, על הלפטופ שלכם. יש לנו מעל 20 תורמים מחברות כמו Kimara AI, Riot Games, קבלנים של ממשלת ארה״ב, ועוד הרבה מפתחים עצמאיים.\n\n" +
      'אבל תנו לי את המדד שבאמת חשוב. עוד לא עשינו refactor לקודבייס שלנו — זה ייקח שנים, וכל מי שאומר לכם ש־AI יעשה refactor לקודבייס של 180 מיליון שורות בסוף שבוע מוכר לכם משהו. מה שכן עשינו: הזמן לכתוב specification למודול קיים ירד מ־3 חודשים ל־3 ימים. חודשים הפכו לימים. לא כי AI כותב specs — אלא כי בפעם הראשונה, מהנדס באמת יכול *להבין* את המודול שהוא מתעד בלי לבזבז שבועות על מעקב ידני אחרי קוד.\n\n' +
      'לא בנינו את זה לבד. קהילת הקוד הפתוח הופיעה בצורה שלא יכולתי לחזות. כל תרומה — ממישהו שתיקן bug בפרסר של שפה שמעולם לא השתמשתי בה, ועד Riot Games שעשו stress test ל־indexing pipeline שלנו על המונוריפו שלהם — עיצבה את ChunkHound למה שהוא היום.\n\n' +
      "בלי הקהילה, הפרויקט הזה לא היה קיים. נקודה."
  },

  // ── Slide 10 — The Meta-Lesson ──────────────────────────────
  {
    kind: "principleContrast",
    title: "The Meta-Lesson",
    icon: "spark",
    content: {
      bad: {
        title: "Garbage in → Garbage out",
        icon: "warning",
        items: [
          "Your mistakes propagate 10x faster",
          "Weak fundamentals crash harder",
          "Noise scales with speed",
        ],
      },
      good: {
        title: "Agents amplify engineers",
        icon: "spark",
        items: [
          "Strong fundamentals → 10x leverage",
          "Small steps + explicit constraints",
          "Verification at every stage",
        ],
      },
      insight:
        "Building ChunkHound with AI taught us how to build software with AI.",
      footerLink: "agenticoding.ai",
    },
    notes:
      "אבל זה ה־meta-lesson — הדבר שאני באמת רוצה שתיקחו מההרצאה הזאת. זוכרים שאמרתי שבנינו את ChunkHound כולו עם AI? התהליך הזה לימד אותנו על בניית תוכנה production-grade עם agents יותר מכל פוסט בלוג או מאמר אקדמי.\n\n" +
      "זיקקנו את כל מה שלמדנו ל־agentic engineering playbook בקוד פתוח ב־agenticoding.ai. 13 שיעורים שמכסים דפוסי מחקר, תכנון, ביצוע וולידציה. מבנה פרומפטים, grounding, ניהול קונטקסט, מחזורי איטרציה. הדברים האמיתיים — מה שבאמת עובד כשאתם מוציאים מוצר, לא רק עושים פרוטוטייפ.\n\n" +
      'זו התובנה המרכזית היא זו: agents לא מחליפים מהנדסים. הם מגבירים אותם. ו־"garbage in, garbage out" מעולם לא היה נכון יותר. כשאתם מייצרים קוד במהירות פי 10, גם טעויות התכנון שלכם מתפשטות במהירות פי 10. היסודות שלכם — system design, architecture, testing strategy — הם עכשיו מה שקובע אם תקבלו את פרודוקטיביות ה־10x שכולם מדברים עליה, או פי 10 בלגן.\n\n' +
      'תעשו את היסודות נכון, ו־agents פותחים משהו מדהים. תטעו בהם אפילו קצת, ו־agents יגבירו את הטעויות שלכם מהר יותר ממה שתספיקו להגיד "git revert".'
  },

  // ── Slide 11 — The Future Is Private ────────────────────────
  {
    kind: "knowledgeMoat",
    title: "The Future Is Private",
    icon: "future",
    content: {
      layers: [
        "Training hundreds of devs internally",
        "Claude cowork for management",
        "AI-native DNA transformation",
      ],
      moat: "In the agentic era, your ability to harness the knowledge you ALREADY HAVE is what sets you apart.",
    },
    notes:
      "זו האמונה שלי: בעידן agentic החדש הזה, היתרון התחרותי שלכם הוא לא המודל, לא ה־API key, ולא ספריית הפרומפטים שלכם. זו היכולת שלכם לרתום את הידע שכבר יש לכם. עשרים וארבע שנים של קוד, של זיכרון ארגוני שמוטמע בכל function signature ובכל commit message. זה ה־moat שלכם.\n\n" +
      "ChunkHound הוא ההימור שלנו שעתיד ה־code intelligence הוא מקומי, פרטי ופתוח. אנחנו פורסים אותו ברחבי Applied Materials — מכשירים מאות מפתחים, נותנים לכל מהנדס גישה מלאה ל־Claude Code, שמים את Claude cowork מול צוותי הניהול שלנו. אנחנו לא רק מאמצים כלי AI; אנחנו משנים את ה־DNA הארגוני שלנו להיות AI-native.\n\n" +
      "זה גדול יותר מחברה אחת או מקודבייס אחד. כל ארגון עם קודבייס legacy מתמודד עם אותה בעיה. ועכשיו יש כלי קוד פתוח שיכול לעזור."
  },

  // ── Slide 12 — Call to Action ───────────────────────────────
  {
    kind: "closingCta",
    tone: "dark",
    icon: "community",
    iconWeight: "fill",
    title: "Join Us",
    content: {
      links: [
        {
          label: "github.com/chunkhound/chunkhound",
          href: "https://github.com/chunkhound/chunkhound",
        },
        { label: "agenticoding.ai", href: "https://agenticoding.ai" },
      ],
      prompt: "We'd love your involvement.",
      rule: "One rule: all code must be AI-generated 😉",
    },
    notes:
      "אז זו הבקשה שלי. אם אתם עובדים על קודבייס גדול, ישן או מורכב — או אם אתם פשוט סקרנים לראות מה קורה כשבונים תוכנת production כולה עם AI — בואו לתרום. ChunkHound הוא קוד פתוח, ברישיון MIT. Agenticoding.ai הוא קוד פתוח. אנחנו רוצים את המעורבות שלכם.\n\n" +
      'יש רק כלל אחד. זוכרים: כל הקוד חייב להיות מיוצר על ידי AI. *(חיוך)* כן, גם ה־pull requests שלכם. אנחנו לוקחים את זה ברצינות.\n\n' +
      'תודה שהייתם כאן. אשמח לענות על השאלות שלכם.\n\n' +
      "*(פתיחת שאלות ותשובות — בערך 8–10 דקות)*",
  },
];

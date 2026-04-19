import React, { useMemo, useState } from "react";

const questionBank = [
  {
    id: "q1",
    title: {
      zh: "1. 可见区域内的特殊特征种类数",
      en: "1. Number of special feature types in the visible area",
    },
    desc: {
      zh: "例如：角、特殊耳朵、尾巴、翅膀、异形器官、特殊皮肤或外壳结构等。同类特征只算 1 种，不会因为数量变多而重复计分。装饰、花纹、鳞片、纹身、疤痕、发色与发部异形不算在本题内。",
      en: "Examples: horns, unusual ears, tails, wings, non-human organs, special skin or shell-like structures, etc. Repeated features of the same type only count as one type. Decorations, patterns, scales, tattoos, scars, hair color, and unusual hair structure are not counted in this question.",
    },
    options: [
      {
        label: {
          zh: "没有，或仅有 1 种简单特殊特征",
          en: "None, or only 1 simple special feature",
        },
        value: 0,
      },
      {
        label: {
          zh: "有 2 种特殊特征",
          en: "2 special feature types",
        },
        value: 1,
      },
      {
        label: {
          zh: "有 3–4 种特殊特征",
          en: "3–4 special feature types",
        },
        value: 2,
      },
      {
        label: {
          zh: "有 5 种及以上特殊特征",
          en: "5 or more special feature types",
        },
        value: 3,
      },
    ],
  },
  {
    id: "q2",
    title: {
      zh: "2. 头部 / 可见区域的小型装饰数量",
      en: "2. Number of small decorations on the head / visible area",
    },
    desc: {
      zh: "例如：挂饰、珠串、链条、花朵、蝴蝶结、小配件等。重复性很高的整串珍珠或链条可按 1 件计算。",
      en: "Examples: charms, bead strands, chains, flowers, bows, and other small accessories. A repeated full pearl strand or long chain can be counted as one item.",
    },
    options: [
      {
        label: { zh: "0–2 件", en: "0–2 items" },
        value: 0,
      },
      {
        label: { zh: "3–5 件", en: "3–5 items" },
        value: 1,
      },
      {
        label: { zh: "6–8 件", en: "6–8 items" },
        value: 2,
      },
      {
        label: { zh: "8 件以上", en: "More than 8 items" },
        value: 3,
      },
    ],
  },
  {
    id: "q3",
    title: {
      zh: "3. 发色复杂度",
      en: "3. Hair color complexity",
    },
    desc: {
      zh: "只计算明显需要还原的主要颜色变化，小面积挑染通常可忽略。",
      en: "Only count major color changes that clearly need to be preserved. Small highlight streaks can usually be ignored.",
    },
    options: [
      {
        label: {
          zh: "单色 / 简单双色",
          en: "Single color / simple two-color hair",
        },
        value: 0,
      },
      {
        label: {
          zh: "三色左右，整体仍较容易处理",
          en: "Around three colors, still fairly easy to handle",
        },
        value: 1,
      },
      {
        label: {
          zh: "四色以上，或分区较复杂",
          en: "Four or more colors, or more complex color blocking",
        },
        value: 2,
      },
      {
        label: {
          zh: "彩虹色 / 多段精确渐变 / 明显高难度综合色",
          en: "Rainbow hair / precise multi-step gradient / very complex mixed coloring",
        },
        value: 3,
      },
    ],
  },
  {
    id: "q4",
    title: {
      zh: "4. 发部结构复杂度",
      en: "4. Hair structure complexity",
    },
    desc: {
      zh: "根据这次需要画出来的发部状态进行选择。",
      en: "Choose based on how the hair area needs to be drawn in this YCH.",
    },
    options: [
      {
        label: {
          zh: "普通发丝结构",
          en: "Normal hair strand structure",
        },
        value: 0,
      },
      {
        label: {
          zh: "少量异形元素混入，但头发仍是主体",
          en: "A few unusual elements are mixed in, but hair is still the main structure",
        },
        value: 1,
      },
      {
        label: {
          zh: "非发丝元素混入较明显，已影响整体观感",
          en: "Non-hair elements are clearly mixed in and affect the overall look",
        },
        value: 2,
      },
      {
        label: {
          zh: "非发丝元素很多，接近与头发同等存在感",
          en: "Many non-hair elements are present, almost as prominent as the hair itself",
        },
        value: 3,
      },
    ],
  },
  {
    id: "q5",
    title: {
      zh: "5. 可见区域内的花纹 / 鳞片 / 纹身 / 疤痕覆盖程度",
      en: "5. Coverage of patterns / scales / tattoos / scars in the visible area",
    },
    desc: {
      zh: "只计算当前这张 YCH 实际会画到的部分。",
      en: "Only count the part that will actually appear in this specific YCH.",
    },
    options: [
      {
        label: {
          zh: "没有，或只有少量小面积细节",
          en: "None, or only a few tiny details",
        },
        value: 0,
      },
      {
        label: {
          zh: "有一定面积，但分布不算多",
          en: "Moderate presence, but not spread very widely",
        },
        value: 1,
      },
      {
        label: {
          zh: "面积较大，且需要明显适配到画面里",
          en: "Large enough that it needs clear adaptation in the artwork",
        },
        value: 2,
      },
      {
        label: {
          zh: "大面积覆盖多个可见区域",
          en: "Large coverage across multiple visible areas",
        },
        value: 3,
      },
    ],
  },
  {
    id: "q6",
    title: {
      zh: "6. 特殊结构本身的复杂度",
      en: "6. Complexity of the special structure itself",
    },
    desc: {
      zh: "例如：翅膀、骨质结构、异形器官、原创特殊轮廓等。",
      en: "Examples: wings, bony structures, non-human organs, or unique original silhouettes.",
    },
    options: [
      {
        label: {
          zh: "没有，或只有简单基础结构",
          en: "None, or only a simple basic structure",
        },
        value: 0,
      },
      {
        label: {
          zh: "有，结构有自然参考、容易理解",
          en: "Present, but has a natural reference and is easy to understand",
        },
        value: 1,
      },
      {
        label: {
          zh: "结构原创，但结构简单",
          en: "Original structure, but still simple",
        },
        value: 1,
      },
      {
        label: {
          zh: "结构较复杂，绘制时需要较多判断",
          en: "Fairly complex and requires extra judgment while drawing",
        },
        value: 2,
      },
      {
        label: {
          zh: "结构原创，且绘制时需要较多判断",
          en: "Original and complex, requiring a lot of judgment while drawing",
        },
        value: 3,
      },
    ],
  },
  {
    id: "m1",
    title: {
      zh: "7. 细节还原要求",
      en: "7. Detail fidelity requirement",
    },
    desc: {
      zh: "本题不直接加分，而是作为最终系数计算。例如：花纹位置、翅膀纹路、装饰角度、配件顺序、发色分层等。如仅希望更贴合画风、允许适当概括，可选较低；如希望细节位置与层次尽量固定还原，请选较高。",
      en: "This question does not directly add points. Instead, it acts as a final multiplier. Examples include pattern placement, wing markings, decoration angles, accessory order, and hair color layering. Choose a lower option if natural simplification is fine. Choose a higher option if detail placement and layering should be preserved as closely as possible.",
    },
    options: [
      {
        label: {
          zh: "可自然概括，不要求严格一致",
          en: "Can be simplified naturally, no strict accuracy needed",
        },
        value: 1.0,
      },
      {
        label: {
          zh: "有较明显的固定位置 / 固定层次要求",
          en: "There are fairly clear fixed placements / layering requirements",
        },
        value: 1.2,
      },
      {
        label: {
          zh: "需要高度还原，细节不能随意简化",
          en: "Needs high fidelity, details should not be simplified freely",
        },
        value: 1.3,
      },
    ],
  },
];

const copy = {
  zh: {
    quickTest: "Quick Test ✦",
    pageTitle: "YCH 复杂度快速自测",
    pageSubtitle: "@莲下梦工作室",
    switchLang: "EN",
    switchThemeLight: "切换浅色模式",
    switchThemeDark: "切换深色模式",
    introTitle: "七步确定！便捷的角色设计复杂度自测 ✨",
    introDesc:
      "本测试会根据您角色的设计复杂程度进行快速判断，方便您在委托前更轻松地确认额外的工时档位，提供更清晰的收费明细 ( •̀ ω •́ )✧",
    noteTitle: "说明",
    noteItems: [
      "为了尽量减少您在委托过程中的额外麻烦，也避免因设定遗漏或复杂度判断偏差而影响您的安排，设计了本测试，方便您在委托前更轻松地确认可能产生的额外支出范围与预算。",
      "复杂度将简单分为 A / B / C / D 四个等级，您可以先根据设定情况自助选择；如果您暂时不方便判断，也可以直接选择 D（请帮我评估），这边会根据您提供的参考图协助确认更合适的档位与报价，尽量减少您自行判断的负担。",
      "如设定细节较多、装饰较复杂，或有较高还原需求，部分 B / C 档位可能需要您附上较清晰、完整的参考图，以便这边更准确地理解并绘制您的需求，也尽量减少后续反复补充说明或修改给您带来的不便。",
    ],
    tierDescriptions: {
      A: {
        title: "A档｜普通 / 轻度复杂设定",
        summary: "有一定特殊特征或细节，但整体仍较容易处理。",
        detail:
          "适用于少量较复杂装饰、局部花纹 / 鳞片 / 疤痕、一定还原需求、少量异形元素混入。",
      },
      B: {
        title: "B档｜中度复杂设定",
        summary: "信息量较多，特征较集中，或有较高还原要求。",
        detail:
          "适用于装饰较多、大面积细节适配、较复杂发色、较明显异形元素、头部装饰较密集。",
      },
      C: {
        title: "C档｜高复杂设定",
        summary: "整体信息量高，复杂元素覆盖较多，明显超出普通人形适配范围。",
        detail:
          "适用于大面积复杂特征、高密度装饰、高还原纹样、四色以上复杂发色、复杂特殊结构。",
      },
      D: {
        title: "D档｜请帮我评估",
        summary: "如果您暂时不方便判断，或您的设定存在较多边缘情况，可以直接交由我人工评估。",
        detail:
          "我会结合您提供的参考图进一步确认更合适的复杂度档位与报价，尽量减少您自行判断的负担。",
      },
    },
    start: "开始测试 ✦",
    manualDirect: "我不太确定，直接人工评估",
    qCounter: "第",
    qSuffix: "题",
    answered: "已完成",
    restart: "重新开始",
    backHome: "返回首页",
    prev: "上一题",
    next: "下一题",
    viewResult: "查看测试结果 ✨",
    resultTag: "测试结果 ✨",
    retake: "重新测试",
    resultMeterTitle: "推荐复杂度",
    resultMeterHint: "该进度仅展示推荐复杂度等级，不显示计算细节",
    manualHint: "已切换为人工评估流程",
    extraTitle: "补充说明",
    extraBody:
      "本结果仅用于委托前的快速参考，不作为最终报价的唯一依据。若您的角色存在边缘情况、原创复杂结构或参考不完整，我仍可能根据实际情况进行微调。",
    switchToManual: "我还是不确定，改为人工评估",
  },
  en: {
    quickTest: "Quick Test ✦",
    pageTitle: "YCH Complexity Quick Check",
    pageSubtitle: "@Lotus Dream Studio",
    switchLang: "中文",
    switchThemeLight: "Switch to light mode",
    switchThemeDark: "Switch to dark mode",
    introTitle: "7 Steps to Check! A Handy Character Design Complexity Test ✨",
    introDesc:
      "This quick test gives your character design a fast complexity check, making it easier to estimate any extra workload tier before commissioning and giving you a clearer pricing breakdown ( •̀ ω •́ )✧",
    noteTitle: "Notes",
    noteItems: [
      "To reduce extra hassle during the commission process—and to avoid scheduling issues caused by missing design details or complexity misjudgment—this test was made to help you estimate the possible extra cost range and budget more easily before submitting a request.",
      "Complexity is roughly divided into four levels: A / B / C / D. You can choose a tier yourself based on your design first; if you're not sure, you can also pick D (Please evaluate for me), and I’ll help confirm a more suitable tier and quote based on the reference images you provide, so you don’t have to stress too much over judging it alone.",
      "If your design has many details, dense decorations, or requires a high level of accuracy, some B / C tiers may require clearer and more complete reference images, so I can understand and draw your character more accurately—while also reducing the need for repeated clarification or later edits.",
    ],
    tierDescriptions: {
      A: {
        title: "Tier A | Standard / Light Complexity Design",
        summary:
          "The design has some special traits or details, but is still fairly easy to handle overall.",
        detail:
          "Suitable for a small number of slightly complex accessories, localized patterns / scales / scars, some fidelity requirements, or a small amount of non-human elements.",
      },
      B: {
        title: "Tier B | Moderately Complex Design",
        summary:
          "The design contains more visual information, more concentrated features, or stronger fidelity requirements.",
        detail:
          "Suitable for heavier accessory use, larger-area detail adaptation, more complex hair colors, more obvious non-human elements, or denser head decorations.",
      },
      C: {
        title: "Tier C | Highly Complex Design",
        summary:
          "The overall information density is high, with more complex elements covering the design, clearly beyond the standard humanoid adaptation range.",
        detail:
          "Suitable for large-scale complex traits, high-density accessories, high-fidelity patterns, complex hair colors with four or more colors, or intricate special structures.",
      },
      D: {
        title: "Tier D | Please Evaluate for Me",
        summary:
          "If you are not comfortable judging the design yourself, or if it contains many edge-case elements, you can send it for manual review.",
        detail:
          "I will check your reference images and help confirm a more suitable complexity tier and quote for you.",
      },
    },
    start: "Start Test ✦",
    manualDirect: "I'm not sure, let me get manual review",
    qCounter: "Question",
    qSuffix: "",
    answered: "Answered",
    restart: "Restart",
    backHome: "Back to Home",
    prev: "Previous",
    next: "Next",
    viewResult: "View Result ✨",
    resultTag: "Result ✨",
    retake: "Retake Test",
    resultMeterTitle: "Recommended Complexity",
    resultMeterHint:
      "This meter only shows the recommended complexity tier, not the calculation details",
    manualHint: "Manual review mode is enabled",
    extraTitle: "Additional Note",
    extraBody:
      "This result is only a quick reference before commissioning and is not the sole basis for final pricing. If your character includes edge cases, original complex structures, or incomplete references, I may still adjust the final classification.",
    switchToManual: "I'm still unsure, switch to manual review",
  },
};

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function getResult(baseScore, multiplier, manualReview, lang) {
  if (manualReview) {
    if (lang === "zh") {
      return {
        tier: "D",
        title: "建议直接交由我人工评估",
        text: "如果您对自己的设定仍不确定，或觉得它存在较多难以归类的元素，可以直接选择人工评估，我会根据参考图为您进一步确认。",
        level: 1,
        badge: "D 档｜请帮我评估",
      };
    }

    return {
      tier: "D",
      title: "Recommended: Manual Review",
      text: "If you are still unsure about your design, or it contains many hard-to-classify elements, you can choose manual review and I will evaluate it based on the reference.",
      level: 1,
      badge: "Tier D | Manual Review",
    };
  }

  const finalScore = Math.round(baseScore * multiplier * 10) / 10;

  if (finalScore <= 5) {
    if (lang === "zh") {
      return {
        tier: "A",
        title: "推荐：A 档｜基础设定",
        text: "整体仍在常规适配范围内，通常按基础设定处理。",
        level: 1,
        badge: "A 档｜基础设定",
      };
    }

    return {
      tier: "A",
      title: "Recommended: Tier A | Basic Design",
      text: "The design is still within the normal adaptation range and is usually handled as a basic design.",
      level: 1,
      badge: "Tier A | Basic Design",
    };
  }

  if (finalScore <= 11) {
    if (lang === "zh") {
      return {
        tier: "B",
        title: "推荐：B 档｜中度复杂设定",
        text: "设定信息量较多，或有一定还原要求，已明显超出基础适配范围。",
        level: 2,
        badge: "B 档｜中度复杂设定",
      };
    }

    return {
      tier: "B",
      title: "Recommended: Tier B | Moderately Complex Design",
      text: "The design contains more information or has stronger fidelity requirements, and is clearly beyond the basic range.",
      level: 2,
      badge: "Tier B | Moderately Complex Design",
    };
  }

  if (lang === "zh") {
    return {
      tier: "C",
      title: "推荐：C 档｜高复杂设定",
      text: "整体信息量高，复杂元素密集，明显超出普通人形适配范围。",
      level: 3,
      badge: "C 档｜高复杂设定",
    };
  }

  return {
    tier: "C",
    title: "Recommended: Tier C | Highly Complex Design",
    text: "The design is information-dense and filled with complex elements, clearly beyond the standard humanoid adaptation range.",
    level: 3,
    badge: "Tier C | Highly Complex Design",
  };
}

function ThemeButton({ darkMode, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-bold transition",
        darkMode
          ? "border-violet-400/30 bg-violet-400/10 text-violet-100 hover:bg-violet-400/15"
          : "border-rose-200 bg-white/80 text-rose-700 hover:bg-rose-50"
      )}
    >
      {label}
    </button>
  );
}

function LangButton({ darkMode, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-bold transition",
        darkMode
          ? "border-violet-400/30 bg-white/5 text-violet-100 hover:bg-white/10"
          : "border-rose-200 bg-white/80 text-rose-700 hover:bg-rose-50"
      )}
    >
      {label}
    </button>
  );
}

function Surface({ darkMode, className = "", children }) {
  return (
    <div
      className={cls(
        "rounded-[28px] border p-5 shadow-sm backdrop-blur-sm md:p-7",
        darkMode
          ? "border-violet-400/20 bg-[#1f1630]/85 shadow-black/20"
          : "border-rose-200/80 bg-white/85 shadow-rose-100/70",
        className
      )}
    >
      {children}
    </div>
  );
}

function OptionButton({ active, onClick, children, darkMode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "w-full rounded-3xl border px-4 py-4 text-left transition",
        darkMode
          ? active
            ? "border-violet-300 bg-violet-400/20 text-white shadow-sm"
            : "border-violet-400/20 bg-white/5 text-violet-50 hover:border-violet-300/40 hover:bg-white/10"
          : active
            ? "border-rose-300 bg-rose-100 text-rose-950 shadow-sm"
            : "border-rose-200 bg-white text-zinc-800 hover:border-rose-300 hover:bg-rose-50"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cls(
            "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
            darkMode
              ? active
                ? "border-violet-200 bg-violet-200 text-violet-900"
                : "border-violet-300/40 text-violet-200"
              : active
                ? "border-rose-400 bg-rose-400 text-white"
                : "border-rose-300 text-rose-400"
          )}
        >
          {active ? "✓" : ""}
        </span>
        <span className="text-sm leading-6 md:text-[15px]">{children}</span>
      </div>
    </button>
  );
}

function ProgressBar({ value, darkMode }) {
  return (
    <div
      className={cls(
        "h-3 w-full overflow-hidden rounded-full",
        darkMode ? "bg-white/10" : "bg-rose-100"
      )}
    >
      <div
        className={cls(
          "h-full rounded-full transition-all duration-300",
          darkMode
            ? "bg-gradient-to-r from-fuchsia-300 via-violet-300 to-indigo-300"
            : "bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function LevelMeter({ level, darkMode, manualReview }) {
  const labels = manualReview ? ["D"] : ["A", "B", "C"];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {labels.map((label, idx) => {
          const active = idx < level;
          return (
            <div
              key={label}
              className={cls(
                "h-3 flex-1 rounded-full transition",
                active
                  ? darkMode
                    ? "bg-gradient-to-r from-fuchsia-300 to-violet-300"
                    : "bg-gradient-to-r from-pink-300 to-rose-400"
                  : darkMode
                    ? "bg-white/10"
                    : "bg-rose-100"
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("zh");
  const [page, setPage] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualReview, setManualReview] = useState(false);
  const [answers, setAnswers] = useState({});

  const ui = copy[lang];
  const total = questionBank.length;
  const currentQuestion = questionBank[currentIndex];

  const currentSelectedIndex =
    currentQuestion && answers[currentQuestion.id] !== undefined
      ? answers[currentQuestion.id]
      : undefined;

  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / total) * 100);

  function getAnswerValue(id, fallback = 0) {
    const question = questionBank.find((item) => item.id === id);
    const selectedIndex = answers[id];

    if (!question || selectedIndex === undefined) {
      return fallback;
    }

    return question.options[selectedIndex]?.value ?? fallback;
  }

  const result = useMemo(() => {
    const baseScore =
      Number(getAnswerValue("q1", 0)) +
      Number(getAnswerValue("q2", 0)) +
      Number(getAnswerValue("q3", 0)) +
      Number(getAnswerValue("q4", 0)) +
      Number(getAnswerValue("q5", 0)) +
      Number(getAnswerValue("q6", 0));

    const multiplier = Number(getAnswerValue("m1", 1.0));

    return getResult(baseScore, multiplier, manualReview, lang);
  }, [answers, manualReview, lang]);

  const tierDetail = ui.tierDescriptions[result.tier];

  function startTest() {
    setPage("quiz");
    setCurrentIndex(0);
  }

  function resetAll() {
    setAnswers({});
    setCurrentIndex(0);
    setManualReview(false);
    setPage("intro");
  }

  function handleChoose(index) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  }

  function handleNext() {
    if (currentSelectedIndex === undefined) {
      return;
    }

    if (currentIndex === total - 1) {
      setPage("result");
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (currentIndex === 0) {
      setPage("intro");
      return;
    }

    setCurrentIndex((prev) => prev - 1);
  }

  const wrapperClass = darkMode
    ? "min-h-screen bg-[radial-gradient(circle_at_top,#3a2559_0%,#170f24_48%,#100b19_100%)] text-white"
    : "min-h-screen bg-[radial-gradient(circle_at_top,#ffeaf3_0%,#fff7fb_42%,#fffdfd_100%)] text-zinc-900";

  return (
    <div className={wrapperClass}>
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p
              className={cls(
                "text-sm font-bold",
                darkMode ? "text-violet-200/80" : "text-rose-500"
              )}
            >
              {ui.quickTest}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-4xl">
              {ui.pageTitle}
            </h1>
            <p
              className={cls(
                "mt-1 text-xs md:text-sm",
                darkMode ? "text-violet-200/70" : "text-rose-400"
              )}
            >
              {ui.pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <LangButton
              darkMode={darkMode}
              onClick={() => setLang((prev) => (prev === "zh" ? "en" : "zh"))}
              label={ui.switchLang}
            />
            <ThemeButton
              darkMode={darkMode}
              onClick={() => setDarkMode((prev) => !prev)}
              label={darkMode ? ui.switchThemeLight : ui.switchThemeDark}
            />
          </div>
        </div>

        {page === "intro" && (
          <div className="space-y-5">
            <Surface darkMode={darkMode}>
              <h2 className="text-xl font-bold md:text-3xl">
                {ui.introTitle}
              </h2>

              <p
                className={cls(
                  "mt-4 max-w-3xl text-sm leading-7 md:text-[15px]",
                  darkMode ? "text-violet-100/80" : "text-zinc-600"
                )}
              >
                {ui.introDesc}
              </p>

              <div
                className={cls(
                  "mt-5 rounded-3xl border p-4 text-sm leading-7 md:p-5 md:text-[15px]",
                  darkMode
                    ? "border-violet-400/20 bg-white/5 text-violet-100/85"
                    : "border-rose-200 bg-rose-50/70 text-zinc-700"
                )}
              >
                <div className="font-bold">{ui.noteTitle}</div>
                <ul className="mt-2 space-y-1.5">
                  {ui.noteItems.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={startTest}
                  className={cls(
                    "inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-bold transition",
                    darkMode
                      ? "bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-950 hover:opacity-95"
                      : "bg-gradient-to-r from-pink-300 to-rose-400 text-white hover:opacity-95"
                  )}
                >
                  {ui.start}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setManualReview(true);
                    setPage("result");
                  }}
                  className={cls(
                    "inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition",
                    darkMode
                      ? "border-violet-400/25 bg-white/5 text-violet-100 hover:bg-white/10"
                      : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                  )}
                >
                  {ui.manualDirect}
                </button>
              </div>
            </Surface>
          </div>
        )}

        {page === "quiz" && currentQuestion && (
          <div className="space-y-5">
            <Surface darkMode={darkMode}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-2">
                  <div
                    className={cls(
                      "text-sm font-bold",
                      darkMode ? "text-violet-200/80" : "text-rose-500"
                    )}
                  >
                    {lang === "zh"
                      ? `${ui.qCounter} ${currentIndex + 1} / ${total} ${ui.qSuffix}`
                      : `${ui.qCounter} ${currentIndex + 1} / ${total}`}
                  </div>

                  <div
                    className={cls(
                      "text-sm",
                      darkMode ? "text-violet-200/80" : "text-rose-500"
                    )}
                  >
                    {ui.answered} {answeredCount} / {total}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetAll}
                  className={cls(
                    "inline-flex h-10 items-center justify-center rounded-2xl border px-4 text-sm font-bold transition",
                    darkMode
                      ? "border-violet-400/25 bg-white/5 text-violet-100 hover:bg-white/10"
                      : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                  )}
                >
                  {ui.restart}
                </button>
              </div>

              <div className="mt-4">
                <ProgressBar value={progress} darkMode={darkMode} />
              </div>
            </Surface>

            <Surface darkMode={darkMode}>
              <h2 className="text-xl font-bold md:text-2xl">
                {currentQuestion.title[lang]}
              </h2>

              <p
                className={cls(
                  "mt-3 text-sm leading-7 md:text-[15px]",
                  darkMode ? "text-violet-100/80" : "text-zinc-600"
                )}
              >
                {currentQuestion.desc[lang]}
              </p>

              <div className="mt-6 space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <OptionButton
                    key={`${currentQuestion.id}-${index}`}
                    active={currentSelectedIndex === index}
                    onClick={() => handleChoose(index)}
                    darkMode={darkMode}
                  >
                    {option.label[lang]}
                  </OptionButton>
                ))}
              </div>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className={cls(
                    "inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition",
                    darkMode
                      ? "border-violet-400/25 bg-white/5 text-violet-100 hover:bg-white/10"
                      : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                  )}
                >
                  {currentIndex === 0 ? ui.backHome : ui.prev}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentSelectedIndex === undefined}
                  className={cls(
                    "inline-flex h-12 items-center justify-center rounded-2xl px-5 text-sm font-bold transition",
                    currentSelectedIndex === undefined
                      ? darkMode
                        ? "cursor-not-allowed bg-white/10 text-white/40"
                        : "cursor-not-allowed bg-rose-100 text-rose-300"
                      : darkMode
                        ? "bg-gradient-to-r from-fuchsia-300 to-violet-300 text-violet-950 hover:opacity-95"
                        : "bg-gradient-to-r from-pink-300 to-rose-400 text-white hover:opacity-95"
                  )}
                >
                  {currentIndex === total - 1 ? ui.viewResult : ui.next}
                </button>
              </div>
            </Surface>
          </div>
        )}

        {page === "result" && (
          <div className="space-y-5">
            <Surface darkMode={darkMode}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className={cls(
                    "text-sm font-bold",
                    darkMode ? "text-violet-200/80" : "text-rose-500"
                  )}
                >
                  {ui.resultTag}
                </div>

                <button
                  type="button"
                  onClick={resetAll}
                  className={cls(
                    "inline-flex h-10 items-center justify-center rounded-2xl border px-4 text-sm font-bold transition",
                    darkMode
                      ? "border-violet-400/25 bg-white/5 text-violet-100 hover:bg-white/10"
                      : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                  )}
                >
                  {ui.retake}
                </button>
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-4xl">
                {result.title}
              </h2>

              <p
                className={cls(
                  "mt-4 max-w-2xl text-sm leading-7 md:text-[15px]",
                  darkMode ? "text-violet-100/80" : "text-zinc-600"
                )}
              >
                {result.text}
              </p>

              <div
                className={cls(
                  "mt-6 inline-flex rounded-full px-4 py-2 text-sm font-bold",
                  darkMode
                    ? "bg-violet-400/15 text-violet-100"
                    : "bg-rose-100 text-rose-700"
                )}
              >
                {result.badge}
              </div>

              {tierDetail && (
                <div
                  className={cls(
                    "mt-6 rounded-3xl border p-5 md:p-6",
                    darkMode
                      ? "border-violet-400/20 bg-white/5"
                      : "border-rose-200 bg-white"
                  )}
                >
                  <div
                    className={cls(
                      "text-base font-bold md:text-lg",
                      darkMode ? "text-violet-100" : "text-rose-700"
                    )}
                  >
                    {tierDetail.title}
                  </div>

                  <p
                    className={cls(
                      "mt-3 text-sm leading-7 md:text-[15px]",
                      darkMode ? "text-violet-100/85" : "text-zinc-700"
                    )}
                  >
                    {tierDetail.summary}
                  </p>

                  <p
                    className={cls(
                      "mt-3 text-sm leading-7 md:text-[15px]",
                      darkMode ? "text-violet-100/75" : "text-zinc-600"
                    )}
                  >
                    {tierDetail.detail}
                  </p>
                </div>
              )}

              <div
                className={cls(
                  "mt-6 rounded-3xl border p-5",
                  darkMode
                    ? "border-violet-400/20 bg-white/5"
                    : "border-rose-200 bg-rose-50/70"
                )}
              >
                <div
                  className={cls(
                    "text-sm font-bold",
                    darkMode ? "text-violet-100" : "text-rose-700"
                  )}
                >
                  {ui.resultMeterTitle}
                </div>

                <div className="mt-4">
                  <LevelMeter
                    level={result.level}
                    darkMode={darkMode}
                    manualReview={result.tier === "D"}
                  />
                </div>

                <div
                  className={cls(
                    "mt-3 text-xs md:text-sm",
                    darkMode ? "text-violet-200/80" : "text-rose-600"
                  )}
                >
                  {result.tier === "D" ? ui.manualHint : ui.resultMeterHint}
                </div>
              </div>

              <div
                className={cls(
                  "mt-6 rounded-3xl border p-4 text-sm leading-7 md:p-5 md:text-[15px]",
                  darkMode
                    ? "border-violet-400/20 bg-white/5 text-violet-100/85"
                    : "border-rose-200 bg-white text-zinc-700"
                )}
              >
                <div className="font-bold">{ui.extraTitle}</div>
                <div className="mt-2">{ui.extraBody}</div>
              </div>

              {result.tier !== "D" && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setManualReview(true);
                      setPage("result");
                    }}
                    className={cls(
                      "inline-flex h-12 items-center justify-center rounded-2xl border px-5 text-sm font-bold transition",
                      darkMode
                        ? "border-violet-400/25 bg-white/5 text-violet-100 hover:bg-white/10"
                        : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                    )}
                  >
                    {ui.switchToManual}
                  </button>
                </div>
              )}
            </Surface>
          </div>
        )}
      </div>
    </div>
  );
}
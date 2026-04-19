import React, { useMemo, useState } from "react";

const questions = [
  {
    id: "q1",
    title: "1. 可见区域内的特殊特征种类数",
    desc: "例如：角、特殊耳朵、尾巴、翅膀、异形器官、特殊皮肤 / 外壳结构等。同类特征只算 1 种，不会因为数量变多重复计分。装饰不算在本题内（请看第2题）；花纹 / 鳞片 / 纹身 / 疤痕不算在本题内（请看第5题）；发色 / 发部异形不算在本题内（请看第3、4题）。",
    options: [
      { label: "没有，或仅有 1种 简单特殊特征", value: 0 },
      { label: "有 2种 特殊特征", value: 1 },
      { label: "有 3–4种 特殊特征", value: 2 },
      { label: "有 5种及以上 特殊特征", value: 3 },
    ],
  },
  {
    id: "q2",
    title: "2. 头部 / 可见区域的小型装饰数量",
    desc: "例如：挂饰、珠串、链条、花朵、蝴蝶结、小配件等。重复性高的整串珍珠 / 链条按 1件 计算。",
    options: [
      { label: "0–2件", value: 0 },
      { label: "3–5件", value: 1 },
      { label: "6–8件", value: 2 },
      { label: "8件以上", value: 3 },
    ],
  },
  {
    id: "q3",
    title: "3. 发色复杂度",
    desc: "只计算明显需要还原的主要颜色变化，小撮挑染通常可忽略。",
    options: [
      { label: "单色 / 简单双色", value: 0 },
      { label: "三色左右，整体仍较容易处理", value: 1 },
      { label: "四色以上，或分区较复杂", value: 2 },
      { label: "彩虹色 / 多段精确渐变 / 明显高难度综合色", value: 3 },
    ],
  },
  {
    id: "q4",
    title: "4. 发部结构复杂度",
    desc: "根据这次需要画出来的发部状态进行选择。",
    options: [
      { label: "普通发丝结构", value: 0 },
      { label: "少量异形元素混入，但头发仍是主体", value: 1 },
      { label: "非发丝元素混入较明显，已影响整体观感", value: 2 },
      { label: "非发丝元素很多，接近与头发同等存在感", value: 3 },
    ],
  },
  {
    id: "q5",
    title: "5. 可见区域内的花纹 / 鳞片 / 纹身 / 疤痕覆盖程度",
    desc: "只计算当前这张 YCH 实际会画到的部分。",
    options: [
      { label: "没有，或只有少量小面积细节", value: 0 },
      { label: "有一定面积，但分布不算多", value: 1 },
      { label: "面积较大，且需要明显适配到画面里", value: 2 },
      { label: "大面积覆盖多个可见区域", value: 3 },
    ],
  },
  {
    id: "q6",
    title: "6. 特殊结构本身的复杂度",
    desc: "例如：翅膀、骨质结构、异形器官、原创特殊轮廓等。",
    options: [
      { label: "没有，或只有简单基础结构", value: 0 },
      { label: "有，结构有自然参考、容易理解", value: 1 },
      { label: "结构原创，但结构简单", value: 1 },
      { label: "结构较复杂，绘制时需要较多判断", value: 2 },
      { label: "结构原创，且绘制时需要较多判断", value: 3 },
    ],
  },
];

const multiplierQuestion = {
  id: "m1",
  title: "6. 细节还原要求",
  desc: "本题不直接加分，而是作为最终系数计算。例如：花纹位置、翅膀纹路、装饰角度、配件顺序、发色分层等。如仅希望更贴合我的画风、允许适当概括，可选择较低系数；如希望细节位置与层次尽量固定还原，请选择较高系数。",
  options: [
    { label: "可自然概括，不要求严格一致", value: 1.0 },
    { label: "有较明显的固定位置 / 固定层次要求", value: 1.2 },
    { label: "需要高度还原，细节不能随意简化", value: 1.3 },
  ],
};

function cls(...parts) {
  return parts.filter(Boolean).join(" ");
}

function RadioCard({ active, label, meta, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        "w-full rounded-2xl border px-4 py-3 text-left transition",
        active
          ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 text-zinc-800"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm md:text-[15px] leading-6">{label}</span>
        <span
          className={cls(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            active ? "bg-white/15 text-white" : "bg-zinc-100 text-zinc-600"
          )}
        >
          {meta}
        </span>
      </div>
    </button>
  );
}

function Section({ title, desc, children }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 md:p-6 shadow-sm">
      <h2 className="text-base md:text-lg font-semibold tracking-tight text-zinc-950">{title}</h2>
      {desc ? <p className="mt-2 text-sm md:text-[15px] leading-6 text-zinc-600">{desc}</p> : null}
      <div className="mt-4 space-y-2.5">{children}</div>
    </section>
  );
}

function TierBadge({ tone, children }) {
  const toneClass = {
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    blue: "border-sky-200 bg-sky-50 text-sky-700",
  }[tone];

  return <span className={cls("inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium", toneClass)}>{children}</span>;
}

export default function YCHQuickTest() {
  const [answers, setAnswers] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0 });
  const [multiplier, setMultiplier] = useState(1.0);
  const [manualE, setManualE] = useState(false);

  const baseScore = useMemo(() => Object.values(answers).reduce((sum, n) => sum + Number(n || 0), 0), [answers]);
  const finalScore = useMemo(() => Math.round(baseScore * multiplier * 10) / 10, [baseScore, multiplier]);

  const result = useMemo(() => {
    if (manualE) {
      return {
        tier: "E",
        badge: <TierBadge tone="blue">E档｜请帮我评估</TierBadge>,
        title: "建议直接交由我评估",
        text: "如果您不确定该如何选择，或希望我直接帮您判断，可以直接选择 E 档，我会根据参考图为您确认更合适的档位与报价。",
      };
    }

    if (finalScore <= 5) {
      return {
        tier: "AB",
        badge: <TierBadge tone="green">AB档｜基础设定</TierBadge>,
        title: "通常不额外收费",
        text: "整体仍在常规适配范围内，通常按基础设定处理。",
      };
    }

    if (finalScore <= 11) {
      return {
        tier: "C",
        badge: <TierBadge tone="amber">C档｜中度复杂设定</TierBadge>,
        title: "通常为中档复杂度附加",
        text: "设定信息量较多，或有一定还原要求，已明显超出基础适配范围。",
      };
    }

    return {
      tier: "D",
      badge: <TierBadge tone="rose">D档｜高复杂设定</TierBadge>,
      title: "通常为高档复杂度附加",
      text: "整体信息量高，复杂元素密集，明显超出普通人形适配范围。",
    };
  }, [finalScore, manualE]);

  const resetAll = () => {
    setAnswers({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0 });
    setMultiplier(1.0);
    setManualE(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 md:p-7 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Quick Test</p>
                  <h1 className="mt-2 text-2xl md:text-4xl font-semibold tracking-tight text-zinc-950">YCH 复杂度快速自测</h1>
                  <p className="mt-4 max-w-3xl text-sm md:text-[15px] leading-7 text-zinc-600">
                    只需根据当前这张 YCH 实际会画到的部分进行选择，即可快速得到推荐档位。若您拿不准，也可以直接选择 E 档让我来帮您判断。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
                >
                  清空重填
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <TierBadge tone="green">AB档</TierBadge>
                <TierBadge tone="amber">C档</TierBadge>
                <TierBadge tone="rose">D档</TierBadge>
                <TierBadge tone="blue">E档</TierBadge>
              </div>
            </section>

            {questions.map((q) => (
              <Section key={q.id} title={q.title} desc={q.desc}>
                {q.options.map((opt, idx) => (
                  <RadioCard
                    key={`${q.id}-${idx}`}
                    active={answers[q.id] === opt.value}
                    label={opt.label}
                    meta={`${opt.value}分`}
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.value }))}
                  />
                ))}
              </Section>
            ))}

            <Section title={multiplierQuestion.title} desc={multiplierQuestion.desc}>
              {multiplierQuestion.options.map((opt, idx) => (
                <RadioCard
                  key={`${multiplierQuestion.id}-${idx}`}
                  active={multiplier === opt.value}
                  label={opt.label}
                  meta={`×${opt.value}`}
                  onClick={() => setMultiplier(opt.value)}
                />
              ))}
            </Section>
          </div>

          <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-zinc-500">测试结果</p>
              <div className="mt-4">{result.badge}</div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-zinc-950">{result.title}</h2>
              <p className="mt-3 text-sm md:text-[15px] leading-7 text-zinc-600">{result.text}</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="text-xs text-zinc-500">基础总分</div>
                  <div className="mt-2 text-2xl font-semibold text-zinc-950">{baseScore}</div>
                </div>
                <div className="rounded-2xl bg-zinc-50 p-4">
                  <div className="text-xs text-zinc-500">还原系数</div>
                  <div className="mt-2 text-2xl font-semibold text-zinc-950">×{multiplier}</div>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-zinc-950 p-4 text-white">
                <div className="text-xs text-zinc-400">最终判定</div>
                <div className="mt-2 text-3xl font-semibold">{manualE ? "E" : finalScore}</div>
                <div className="mt-2 text-sm leading-6 text-zinc-300">{manualE ? "已手动切换为 E 档评估" : `${baseScore} × ${multiplier} = ${finalScore}`}</div>
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600">
                <div className="font-medium text-zinc-800">结果判定</div>
                <div className="mt-2 space-y-1">
                  <div>0–5分 → AB档</div>
                  <div>6–11分 → C档</div>
                  <div>12分及以上 → D档</div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setManualE((v) => !v)}
                  className={cls(
                    "inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-medium transition",
                    manualE
                      ? "border-sky-300 bg-sky-50 text-sky-700"
                      : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
                  )}
                >
                  {manualE ? "已选择 E 档评估" : "拿不准？直接选择 E 档评估"}
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-950">补充说明</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm md:text-[15px] leading-6 text-zinc-600">
                <li>本测试仅供委托前快速自查参考。</li>
                <li>最终档位将根据参考图与 YCH 实际可见范围进行确认。</li>
                <li>如设定复杂但参考不足，或包含不包设计 / 不擅长内容，可能需要改为 E 档评估或不接。</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

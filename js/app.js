const form = document.querySelector("#rewrite-form");
const messageInput = document.querySelector("#message");
const situationInput = document.querySelector("#situation");
const characterCount = document.querySelector("#character-count");
const formStatus = document.querySelector("#form-status");
const sampleButton = document.querySelector("#sample-button");
const submitButton = document.querySelector("#submit-button");
const submitLabel = document.querySelector("#submit-label");
const emptyResult = document.querySelector("#empty-result");
const resultText = document.querySelector("#result-text");
const copyButton = document.querySelector("#copy-button");
const navLinks = document.querySelectorAll(".main-nav a");

const sampleMessage =
  "팀장님, 내일 개인 일정이 있어서 오후 반차를 사용하고 싶습니다. 괜찮을까요?";
const requestTimeout = 30000;

function setStatus(message = "", type = "") {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", type === "error");
  formStatus.classList.toggle("is-success", type === "success");
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.classList.toggle("is-loading", isLoading);
  submitButton.setAttribute("aria-busy", String(isLoading));
  submitLabel.textContent = isLoading ? "문장을 다듬고 있어요..." : "AI로 문장 다듬기";
}

function showResult(text) {
  resultText.textContent = text;
  resultText.hidden = false;
  emptyResult.hidden = true;
  copyButton.disabled = false;
}

function updateCharacterCount() {
  const length = messageInput.value.length;
  characterCount.textContent = `${length} / 1000`;
  characterCount.style.color = length >= 900 ? "#b42318" : "";

  if (length > 0) {
    messageInput.classList.remove("is-invalid");
    setStatus();
  }
}

messageInput.addEventListener("input", updateCharacterCount);

sampleButton.addEventListener("click", () => {
  messageInput.value = sampleMessage;
  updateCharacterCount();
  messageInput.focus();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text) {
    messageInput.classList.add("is-invalid");
    setStatus("다듬을 문장을 입력해 주세요.", "error");
    messageInput.focus();
    return;
  }

  const selectedTone = form.querySelector('input[name="tone"]:checked');
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeout);

  setLoading(true);
  setStatus("AI가 문장을 확인하고 있습니다.", "success");

  try {
    const response = await fetch("/api/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        situation: situationInput.value,
        tone: selectedTone.value,
      }),
      signal: controller.signal,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("서버 응답을 읽을 수 없습니다. 잠시 후 다시 시도해 주세요.");
    }

    if (!response.ok) {
      throw new Error(data.error || "AI 요청 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }

    if (!data.result) {
      throw new Error("AI 결과를 받지 못했습니다. 다시 시도해 주세요.");
    }

    showResult(data.result);
    setStatus("문장을 자연스럽게 다듬었습니다.", "success");
  } catch (error) {
    const message =
      error.name === "AbortError"
        ? "응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요."
        : error.message;
    setStatus(message, "error");
  } finally {
    window.clearTimeout(timeoutId);
    setLoading(false);
  }
});

copyButton.addEventListener("click", async () => {
  if (!resultText.textContent) return;

  try {
    await navigator.clipboard.writeText(resultText.textContent);
    const previousLabel = copyButton.innerHTML;
    copyButton.textContent = "복사 완료";
    window.setTimeout(() => {
      copyButton.innerHTML = previousLabel;
    }, 1400);
  } catch {
    setStatus("복사하지 못했습니다. 결과 문장을 직접 선택해 주세요.", "error");
  }
});

const observedSections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${visibleSection.target.id}`;
      if (isCurrent) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },
  { rootMargin: "-25% 0px -65%", threshold: [0, 0.2, 0.5] },
);

observedSections.forEach((section) => sectionObserver.observe(section));

import { animate, stagger } from "./anime.esm.min.js";
export function runAnimeRecipe(recipe, root = document, reducedMotion = false) {
    const targets = root.querySelectorAll(recipe.target_selector);
    if (targets.length === 0)
        return "TARGET_NOT_FOUND";
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        targets.forEach((target) => { target.style.opacity = "1"; target.style.transform = "none"; });
        return "REDUCED_MOTION";
    }
    const animation = animate;
    animation(targets, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: recipe.duration_ms,
        delay: recipe.stagger_ms ? stagger(recipe.stagger_ms) : 0,
        ease: recipe.easing
    });
    return "ANIMATED";
}
const activeReferenceHandles = new Set();
export function activeReferenceMotionCount() { return activeReferenceHandles.size; }
export function runReferenceMotion(recipe, root, intensity, options = {}) {
    const targets = options.targets ?? Array.from(root.querySelectorAll(recipe.target_selector));
    const reduced = intensity === "off" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!targets.length)
        return { result: "TARGET_NOT_FOUND", active: false, stop: () => undefined };
    const duration = Math.max(100, Math.round(recipe.duration_ms * (intensity === "subtle" ? 0.55 : 1)));
    const amount = intensity === "subtle" ? 0.55 : 1;
    const animations = [];
    let stopped = false;
    let completed = false;
    const finalize = (settle = false) => {
        for (const target of targets) {
            const element = target;
            if (recipe.type === "metric-count")
                element.textContent = `${element.getAttribute("data-value") ?? "0"}건`;
            else if (recipe.type === "progress-fill")
                element.style.width = `${element.getAttribute("data-percent") ?? "0"}%`;
            else if (recipe.type === "route-draw")
                element.style.strokeDashoffset = "0";
            else if (recipe.type === "inline-expand") {
                element.style.height = "";
                element.style.opacity = "";
            }
            else if (recipe.type === "light-sweep")
                element.style.removeProperty("--sweep-x");
            else if (recipe.type === "card-tilt")
                element.style.transform = settle ? `rotateX(${5 * amount}deg) rotateY(${-8 * amount}deg)` : "";
            else if (recipe.type === "orbit-turn") {
                element.style.transform = "";
                element.style.opacity = "";
            }
            else {
                element.style.opacity = "";
                element.style.transform = "";
            }
        }
    };
    const handle = {
        result: reduced ? "REDUCED_MOTION" : "ANIMATED",
        active: !reduced,
        stop: () => {
            if (stopped)
                return;
            stopped = true;
            handle.active = false;
            for (const animation of animations)
                animation.cancel();
            finalize();
            activeReferenceHandles.delete(handle);
        }
    };
    if (reduced) {
        finalize();
        options.onComplete?.();
        return handle;
    }
    activeReferenceHandles.add(handle);
    const complete = () => {
        if (stopped || completed || animations.some((animation) => !animation.completed))
            return;
        completed = true;
        handle.active = false;
        finalize(true);
        activeReferenceHandles.delete(handle);
        options.onComplete?.();
    };
    const params = { duration, ease: recipe.easing, onComplete: complete };
    switch (recipe.type) {
        case "card-tilt":
            animations.push(animate(targets, { rotateX: [0, 5 * amount], rotateY: [0, -8 * amount], ...params }));
            break;
        case "field-stagger":
            animations.push(animate(targets, { opacity: [0, 1], translateY: [10 * amount, 0], delay: stagger(recipe.stagger_ms), ...params }));
            break;
        case "panel-swap":
            animations.push(animate(targets, { opacity: [0.45, 1], translateX: [12 * amount, 0], ...params }));
            break;
        case "light-sweep":
            animations.push(animate(targets, { "--sweep-x": ["-160%", "400%"], ...params }));
            break;
        case "route-draw":
            for (const target of targets) {
                const path = target;
                const length = path.getTotalLength();
                path.style.strokeDasharray = String(length);
                path.style.strokeDashoffset = String(length);
                animations.push(animate(path, { strokeDashoffset: [length, 0], ...params }));
            }
            break;
        case "metric-count":
            for (const target of targets) {
                const value = Number(target.getAttribute("data-value") ?? "0");
                const counter = { value: 0 };
                animations.push(animate(counter, { value: [0, value], onUpdate: () => { target.textContent = `${Math.round(counter.value)}건`; }, ...params }));
            }
            break;
        case "scene-crossfade": {
            const previous = targets.filter((target) => target.getAttribute("data-part") === "previous");
            const current = targets.filter((target) => target.getAttribute("data-part") !== "previous");
            if (previous.length)
                animations.push(animate(previous, { opacity: [1, 0], ...params }));
            if (current.length)
                animations.push(animate(current, { opacity: [0, 1], ...params }));
            break;
        }
        case "orbit-turn":
            animations.push(animate(targets, { rotateZ: [-7 * amount, 8 * amount], ...params }));
            break;
        case "progress-fill":
            for (const target of targets) {
                const percent = Number(target.getAttribute("data-percent") ?? "0");
                animations.push(animate(target, { width: ["0%", `${percent}%`], ...params }));
            }
            break;
        case "inline-expand":
            for (const target of targets) {
                const element = target;
                const height = element.scrollHeight;
                animations.push(animate(element, { height: options.direction === "close" ? [height, 0] : [0, height], opacity: options.direction === "close" ? [1, 0] : [0, 1], ...params }));
            }
            break;
        default:
            animations.push(animate(targets, { opacity: [0, 1], translateY: [12 * amount, 0], delay: recipe.stagger_ms ? stagger(recipe.stagger_ms) : 0, ...params }));
    }
    return handle;
}

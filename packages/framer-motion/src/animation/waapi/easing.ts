import { BezierDefinition, Easing, EasingDefinition } from "../../easing/types"

export function isWaapiSupportedEasing(easing?: Easing | Easing[]) {
    return (
        !easing || // Default easing
        Array.isArray(easing) || // Bezier curve
        (typeof easing === "string" && supportedWaapiEasing[easing])
    )
}

export const cubicBezierAsString = ([a, b, c, d]: BezierDefinition) =>
    `cubic-bezier(${a}, ${b}, ${c}, ${d})`

export const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: cubicBezierAsString([0.33, 1.53, 0.69, 0.99]),
}

export function mapEasingToNativeEasing(
    easing?: EasingDefinition
): string | undefined {
    if (!easing) return undefined
    return Array.isArray(easing)
        ? cubicBezierAsString(easing)
        : supportedWaapiEasing[easing]
}

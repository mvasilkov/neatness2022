export interface ColorRgb {
  r: number
  g: number
  b: number
}

export interface ColorOklab {
  L: number
  a: number
  b: number
}

export function oklabToLinearSrgb({ L, a, b }: ColorOklab): ColorRgb {
  const l = (L + a * +0.3963377774 + b * +0.2158037573) ** 3
  const m = (L + a * -0.1055613458 + b * -0.0638541728) ** 3
  const s = (L + a * -0.0894841775 + b * -1.2914855480) ** 3

  return {
    r: l * +4.0767245293 + m * -3.3072168827 + s * +0.2307590544,
    g: l * -1.2681437731 + m * +2.6093323231 + s * -0.3411344290,
    b: l * -0.0041119885 + m * -0.7034763098 + s * +1.7068625689
  }
}

export function linearSrgbToOklab({ r, g, b }: ColorRgb): ColorOklab {
  const l = Math.cbrt(r * +0.4121656120 + g * +0.5362752080 + b * +0.0514575653)
  const m = Math.cbrt(r * +0.2118591070 + g * +0.6807189584 + b * +0.1074065790)
  const s = Math.cbrt(r * +0.0883097947 + g * +0.2818474174 + b * +0.6302613616)

  return {
    L: l * +0.2104542553 + m * +0.7936177850 + s * -0.0040720468,
    a: l * +1.9779984951 + m * -2.4285922050 + s * +0.4505937099,
    b: l * +0.0259040371 + m * +0.7827717662 + s * -0.8086757660
  }
}
